/**
 * Vercel Serverless Function — /api/enquiry
 *
 * Handles client enquiry submissions on Vercel deployments.
 * Fully self-contained to avoid any cross-directory Node ESM resolution or bundling issues.
 *
 * Guarantees:
 * - Structured diagnostic logs (ENQUIRY_FUNCTION_INVOKED, REQUEST_BODY_PARSED, etc.)
 * - Zero logging of secrets (RESEND_API_KEY) or visitor personal information.
 * - Top-level try/catch returning safe JSON HTTP 500 on unhandled errors.
 * - Strict server-side schema validation & anti-spam mitigation.
 * - Confirmed transactional delivery via Resend API to mail.virajbankar@gmail.com.
 * - Generates Reference ID ONLY after confirmed delivery.
 */

export interface EnquiryInput {
  name?: unknown
  email?: unknown
  company?: unknown
  service?: unknown
  serviceName?: unknown
  budget?: unknown
  description?: unknown
  consent?: unknown
  website?: unknown // Honeypot field (must be empty)
  _time?: unknown   // Bot timing check (ms timestamp)
  source?: unknown
  timestamp?: unknown
}

export interface EnquiryServerEnv {
  RESEND_API_KEY?: string
  RESEND_FROM_EMAIL?: string
  ENQUIRY_NOTIFICATION_EMAIL?: string
  ENQUIRY_DELIVERY_WEBHOOK_URL?: string
  ENQUIRY_WEBHOOK_URL?: string
  NODE_ENV?: string
  ALLOW_DEV_MOCK?: string
}

export interface ProcessEnquiryResult {
  statusCode: number
  body: {
    success: boolean
    enquiryId?: string
    message?: string
    error?: string
    errors?: Record<string, string>
    code?: string
    timestamp?: string
    service?: string
    diagnostic?: string
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeString(val: unknown, maxLen = 500): string {
  if (typeof val !== 'string') return ''
  // Strip control characters while preserving standard whitespace
  // eslint-disable-next-line no-control-regex
  return val.trim().replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '').substring(0, maxLen)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const DEFAULT_SENDER = 'onboarding@resend.dev'
const DEFAULT_RECIPIENT = 'mail.virajbankar@gmail.com'

/**
 * Allowed origin domains for CORS protection.
 * Restricts external cross-origin execution while permitting the official website
 * and local developer environments.
 */
const ALLOWED_ORIGINS_EXACT = new Set([
  'https://vertiligence.ai',
  'https://www.vertiligence.ai',
  'https://vertiligenceai.vercel.app',
])

export function isAllowedOrigin(origin?: string | null): boolean {
  if (!origin || typeof origin !== 'string') return false
  const trimmed = origin.trim().toLowerCase()
  if (ALLOWED_ORIGINS_EXACT.has(trimmed)) return true
  // Allow project preview deployments on Vercel
  if (/^https:\/\/vertiligenceai-[a-z0-9-]+-[a-z0-9-]+\.vercel\.app$/.test(trimmed)) return true
  if (/^https:\/\/vertiligenceai-[a-z0-9-]+\.vercel\.app$/.test(trimmed)) return true
  // Allow local development (any port on localhost or 127.0.0.1)
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(trimmed)) return true
  return false
}

export function resolveCorsOrigin(requestOrigin?: string | null): string {
  if (requestOrigin && isAllowedOrigin(requestOrigin)) {
    return requestOrigin.trim()
  }
  return 'https://vertiligence.ai'
}

/**
 * Extracts only the domain from an email address or formatted sender string for safe diagnostic logging.
 * Never logs credentials, names, or visitor personal information.
 */
export function extractDomain(emailStr: string): string {
  if (!emailStr || typeof emailStr !== 'string') return 'unknown'
  const match = emailStr.match(/@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)
  return match ? match[1].toLowerCase() : 'unknown'
}

/**
 * Sanitizes and validates the sender email address for Resend API.
 * Ensures the value is passed as:
 * - A clean plain email address (e.g. "onboarding@resend.dev" or "noreply@vertiligence.ai")
 * - OR a correctly formatted RFC string: "Name <email@example.com>"
 * Strips wrapping quotes, duplicated angle brackets, whitespace, and invalid env placeholders.
 * Defaults safely to "onboarding@resend.dev" if absent, invalid, or using sandbox resend.dev.
 */
export function resolveSenderEmail(rawFrom?: string | null): string {
  if (!rawFrom || typeof rawFrom !== 'string') {
    return DEFAULT_SENDER
  }

  // Strip whitespace and leading/trailing quotes (single, double, backticks)
  let cleaned = rawFrom.trim().replace(/^["'`]+|["'`]+$/g, '').trim()
  const lower = cleaned.toLowerCase()

  if (
    !cleaned ||
    lower === 'undefined' ||
    lower === 'null' ||
    lower === 'resend_from_email' ||
    lower === 'false' ||
    lower === 'true'
  ) {
    return DEFAULT_SENDER
  }

  // Check for "Name <email@example.com>"
  const nameEmailMatch = cleaned.match(/^([^<>]*?)\s*<+([^<>]+)>+$/)
  if (nameEmailMatch) {
    const rawName = nameEmailMatch[1].trim().replace(/^["'`]+|["'`]+$/g, '').trim()
    const rawEmail = nameEmailMatch[2].trim().toLowerCase()

    if (EMAIL_REGEX.test(rawEmail)) {
      // Resend sandbox domain resend.dev requires plain "onboarding@resend.dev" without custom display name
      if (rawEmail === 'onboarding@resend.dev') {
        return DEFAULT_SENDER
      }
      if (rawName.length > 0) {
        const safeName = rawName.replace(/["'<>]/g, '').trim()
        return safeName.length > 0 ? `${safeName} <${rawEmail}>` : rawEmail
      }
      return rawEmail
    }
  }

  // Check for bare email address (strip any accidental brackets)
  const bareEmail = cleaned.replace(/^[<]+|[>]+$/g, '').trim().toLowerCase()
  if (EMAIL_REGEX.test(bareEmail)) {
    return bareEmail
  }

  return DEFAULT_SENDER
}

/**
 * Sanitizes the recipient email, maintaining single source of truth: mail.virajbankar@gmail.com
 */
export function resolveRecipientEmail(rawRecipient?: string | null): string {
  if (!rawRecipient || typeof rawRecipient !== 'string') {
    return DEFAULT_RECIPIENT
  }
  const cleaned = rawRecipient.trim().replace(/^["'`]+|["'`]+$/g, '').trim().toLowerCase()
  if (EMAIL_REGEX.test(cleaned)) {
    return cleaned
  }
  return DEFAULT_RECIPIENT
}

function generateEnquiryId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let random = ''
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  const timePart = Date.now().toString(36).toUpperCase()
  return `ENQ-${random}-${timePart}`
}

/**
 * Core business processor for incoming enquiries.
 */
export async function processEnquiry(
  rawInput: EnquiryInput,
  env: EnquiryServerEnv
): Promise<ProcessEnquiryResult> {
  const now = Date.now()

  // 1. Anti-spam Check: Honeypot trap
  const honeypot = sanitizeString(rawInput.website, 100)
  if (honeypot.length > 0) {
    return {
      statusCode: 400,
      body: {
        success: false,
        error: 'Spam detected.',
        code: 'SPAM_HONEYPOT_TRIGGERED',
      },
    }
  }

  // 2. Anti-spam Check: Sub-second bot timing check (<600ms)
  const clientTime = Number(rawInput._time)
  if (!Number.isNaN(clientTime) && clientTime > 0) {
    const elapsed = now - clientTime
    if (elapsed < 600) {
      return {
        statusCode: 400,
        body: {
          success: false,
          error: 'Automated submission rejected.',
          code: 'BOT_SPEED_REJECTED',
        },
      }
    }
  }

  // 3. Server-side Validation
  const name = sanitizeString(rawInput.name, 100)
  const email = sanitizeString(rawInput.email, 120).toLowerCase()
  const company = sanitizeString(rawInput.company, 120)
  const service = sanitizeString(rawInput.service, 80) || 'custom-software'
  const serviceName = sanitizeString(rawInput.serviceName, 120) || 'Custom Business Software Development'
  const budget = sanitizeString(rawInput.budget, 80)
  const description = sanitizeString(rawInput.description, 5000)
  const consent = Boolean(rawInput.consent)

  const validationErrors: Record<string, string> = {}

  if (!name || name.length < 2) {
    validationErrors.name = 'Please provide your full name (at least 2 characters).'
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    validationErrors.email = 'Please provide a valid business email address.'
  }

  if (!description || description.length < 15) {
    validationErrors.description = 'Please provide project details (at least 15 characters).'
  }

  if (!consent) {
    validationErrors.consent = 'Consent is required to submit an inquiry.'
  }

  console.log('[VALIDATION_COMPLETED]', {
    passed: Object.keys(validationErrors).length === 0,
    errorCount: Object.keys(validationErrors).length,
    fieldsWithErrors: Object.keys(validationErrors),
  })

  if (Object.keys(validationErrors).length > 0) {
    return {
      statusCode: 422,
      body: {
        success: false,
        error: 'Validation failed',
        errors: validationErrors,
        code: 'VALIDATION_FAILED',
      },
    }
  }

  // 4. Delivery Channels Verification
  const resendApiKey = env.RESEND_API_KEY?.trim()
  const webhookUrl = (env.ENQUIRY_DELIVERY_WEBHOOK_URL || env.ENQUIRY_WEBHOOK_URL)?.trim()
  const recipientEmail = resolveRecipientEmail(env.ENQUIRY_NOTIFICATION_EMAIL)
  const fromEmail = resolveSenderEmail(env.RESEND_FROM_EMAIL)
  const timestampIso = new Date().toISOString()
  const isDevMode =
    env.NODE_ENV === 'development' ||
    env.ALLOW_DEV_MOCK === 'true'

  console.log('[RESEND_CONFIGURATION_CHECKED]', {
    hasResendApiKey: Boolean(resendApiKey && resendApiKey.length > 5),
    hasNotificationEmail: Boolean(recipientEmail),
    hasFromEmail: Boolean(fromEmail),
    hasWebhookUrl: Boolean(webhookUrl),
    isDevMode: Boolean(isDevMode),
  })

  // If in production and NO delivery channels are configured, honestly reject
  if (!resendApiKey && !webhookUrl && !isDevMode) {
    return {
      statusCode: 503,
      body: {
        success: false,
        error: `Enquiry delivery channel is not configured on the production server (missing RESEND_API_KEY). Please contact ${recipientEmail} directly.`,
        code: 'DELIVERY_CHANNEL_NOT_CONFIGURED',
      },
    }
  }

  // Candidate Reference ID for inclusion in email headers/subject
  const candidateEnquiryId = generateEnquiryId()
  let deliverySucceeded = false
  let deliveryError: string | null = null

  // Channel A: Resend API Email Delivery
  if (resendApiKey) {
    console.log('[RESEND_REQUEST_STARTED]', {
      senderDomain: extractDomain(fromEmail),
      recipientDomain: extractDomain(recipientEmail),
      hasReplyTo: Boolean(email),
    })

    try {
      const subject = `[Project Enquiry] ${serviceName} - ${company || name} (${candidateEnquiryId})`
      const textContent = [
        `=================================================================`,
        `VERTILIGENCE AI — NEW PROJECT ENQUIRY`,
        `=================================================================`,
        `Reference ID : ${candidateEnquiryId}`,
        `Submitted At : ${timestampIso}`,
        ``,
        `CLIENT DETAILS:`,
        `- Name        : ${name}`,
        `- Email       : ${email}`,
        `- Company     : ${company || 'Not specified'}`,
        ``,
        `PROJECT SCOPE:`,
        `- Service     : ${serviceName} (${service})`,
        `- Budget/Tier : ${budget || 'To be determined after discovery'}`,
        ``,
        `DESCRIPTION & OPERATIONAL REQUIREMENTS:`,
        description,
        `=================================================================`,
      ].join('\n')

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0B1120; color: #F1F5F9; border-radius: 12px; overflow: hidden; border: 1px solid #1E293B;">
          <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 24px; border-bottom: 1px solid rgba(0, 210, 255, 0.2);">
            <div style="color: #00D2FF; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 700;">Vertiligence AI — Engineering Desk</div>
            <h1 style="color: #FFFFFF; font-size: 20px; margin: 8px 0 0 0; font-weight: 600;">New Project Enquiry Received</h1>
            <div style="margin-top: 8px; font-family: monospace; font-size: 13px; color: #94A3B8;">Reference: <span style="color: #38BDF8; font-weight: bold;">${candidateEnquiryId}</span></div>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #94A3B8; font-size: 13px; width: 130px;">Client Name</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-size: 14px; font-weight: 600;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8; font-size: 13px;">Business Email</td>
                <td style="padding: 8px 0; color: #38BDF8; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #38BDF8; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8; font-size: 13px;">Company</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-size: 14px;">${escapeHtml(company || 'Not specified')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8; font-size: 13px;">Service Required</td>
                <td style="padding: 8px 0; color: #00D2FF; font-size: 14px; font-weight: 500;">${escapeHtml(serviceName)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8; font-size: 13px;">Engagement Tier</td>
                <td style="padding: 8px 0; color: #CBD5E1; font-size: 14px;">${escapeHtml(budget || 'To be determined')}</td>
              </tr>
            </table>

            <div style="background-color: #07090E; border: 1px solid #1E293B; border-radius: 8px; padding: 16px; margin-top: 16px;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748B; margin-bottom: 8px; font-weight: 600;">Project & Operational Description</div>
              <div style="font-size: 14px; line-height: 1.6; color: #E2E8F0; white-space: pre-wrap;">${escapeHtml(description)}</div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1E293B; font-size: 12px; color: #64748B;">
              Received via vertiligence.ai contact form at ${timestampIso}. Response SLA: Within 1 Business Day.
            </div>
          </div>
        </div>
      `

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          reply_to: email,
          subject,
          text: textContent,
          html: htmlContent,
        }),
      })

      console.log('[RESEND_RESPONSE_RECEIVED]', {
        status: resendRes.status,
        ok: resendRes.ok,
      })

      if (resendRes.ok) {
        deliverySucceeded = true
      } else {
        const errText = await resendRes.text().catch(() => '')
        let safeError = `HTTP ${resendRes.status}`
        try {
          const errJson = JSON.parse(errText)
          if (errJson?.message) safeError += `: ${errJson.message}`
        } catch {
          if (errText && errText.length < 120) safeError += `: ${errText}`
        }
        deliveryError = safeError
        console.error('[Enquiry Dispatch] Resend delivery error:', safeError)
      }
    } catch (err: unknown) {
      deliveryError = err instanceof Error ? err.message : 'Network error during Resend dispatch'
      console.error('[Enquiry Dispatch] Failed to send via Resend:', deliveryError)
    }
  }

  // Channel B: Webhook Dispatch (e.g. n8n / Slack / Discord / Custom CRM API)
  if (webhookUrl && !deliverySucceeded) {
    try {
      const webhookPayload = {
        event: 'enquiry.received',
        enquiryId: candidateEnquiryId,
        timestamp: timestampIso,
        data: {
          name,
          email,
          company: company || null,
          service,
          serviceName,
          budget: budget || null,
          description,
        },
      }

      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Vertiligence-Enquiry-Id': candidateEnquiryId,
        },
        body: JSON.stringify(webhookPayload),
      })

      if (webhookRes.ok) {
        deliverySucceeded = true
      } else {
        deliveryError = `Webhook returned status ${webhookRes.status}`
        console.error('[Enquiry Dispatch] Webhook error:', deliveryError)
      }
    } catch (err: unknown) {
      deliveryError = err instanceof Error ? err.message : String(err)
      console.error('[Enquiry Dispatch] Webhook exception:', deliveryError)
    }
  }

  // Channel C: Local Development Mock (only when allowed in dev mode)
  if (!deliverySucceeded && isDevMode) {
    console.warn(
      `[DEV MOCK] Enquiry ${candidateEnquiryId} accepted in local development mode without external delivery credentials.`
    )
    deliverySucceeded = true
  }

  // 5. Final Delivery Outcome
  if (!deliverySucceeded) {
    return {
      statusCode: 502,
      body: {
        success: false,
        error: `Enquiry delivery failed: ${deliveryError || 'Unable to confirm transmission'}. Please contact ${recipientEmail} directly.`,
        code: 'DELIVERY_DISPATCH_FAILED',
      },
    }
  }

  // 6. Confirmed Success Response — Reference ID is generated/confirmed ONLY upon verified delivery
  const confirmedEnquiryId = candidateEnquiryId
  return {
    statusCode: 200,
    body: {
      success: true,
      enquiryId: confirmedEnquiryId,
      message: 'Enquiry sent successfully.',
      service,
      timestamp: timestampIso,
    },
  }
}

/**
 * RATE LIMITING ASSESSMENT & ARCHITECTURE NOTE:
 * In a serverless architecture (Vercel Serverless Functions, AWS Lambda, Cloudflare Pages),
 * in-memory rate limiters (e.g. Map/Set keyed by IP) are ephemeral to the warm instance
 * and do not protect across concurrent execution containers or auto-scaling isolates.
 * 
 * True production rate limiting requires an external distributed shared store
 * (e.g. Upstash Redis with @upstash/ratelimit, Cloudflare KV, or Vercel Edge Firewall).
 * 
 * If a shared Redis or KV store is configured via UPSTASH_REDIS_REST_URL and
 * UPSTASH_REDIS_REST_TOKEN, external rate limiting can be engaged. When unconfigured,
 * Vertiligence AI relies on multi-layer abuse mitigation:
 * 1. Strict CORS origin allowlist (rejects cross-origin automated scrapers)
 * 2. Invisible honeypot trap ('website' field traps automated bots)
 * 3. Sub-second speed analysis (rejection if submission elapsed < 600ms)
 * 4. Strict server-side schema, character length clamping, and email RFC validation
 */

/**
 * Universal response helper supporting Vercel Node.js runtime and Edge runtimes.
 */
function sendResponse(
  res: unknown,
  statusCode: number,
  data: unknown,
  requestOrigin?: string | null
): Response | void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeRes = res as any
  const allowed = isAllowedOrigin(requestOrigin)
  const corsOrigin = allowed && requestOrigin ? requestOrigin.trim() : 'https://vertiligence.ai'

  if (nodeRes && typeof nodeRes.setHeader === 'function') {
    nodeRes.setHeader('Content-Type', 'application/json')
    if (allowed || !requestOrigin) {
      nodeRes.setHeader('Access-Control-Allow-Origin', corsOrigin)
    }
    nodeRes.setHeader('Vary', 'Origin')
    nodeRes.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    nodeRes.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    nodeRes.setHeader('Cache-Control', 'no-store, max-age=0')

    if (statusCode === 204) {
      nodeRes.statusCode = 204
      nodeRes.end()
      return
    }

    if (typeof nodeRes.status === 'function' && typeof nodeRes.json === 'function') {
      nodeRes.status(statusCode).json(data)
      return
    }

    nodeRes.statusCode = statusCode
    nodeRes.end(JSON.stringify(data))
    return
  }

  // Fallback for Web API Fetch Response
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store, max-age=0',
  }
  if (allowed || !requestOrigin) {
    headers['Access-Control-Allow-Origin'] = corsOrigin
  }

  if (statusCode === 204) {
    return new Response(null, {
      status: 204,
      headers,
    })
  }

  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers,
  })
}

/**
 * Main Vercel serverless function entrypoint.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res?: any) {
  const requestOrigin =
    req?.headers?.origin ||
    req?.headers?.get?.('origin') ||
    null

  try {
    // 1. CORS Preflight
    if (req?.method === 'OPTIONS') {
      if (requestOrigin && !isAllowedOrigin(requestOrigin)) {
        return sendResponse(res, 403, {
          success: false,
          error: 'Cross-origin request denied.',
          code: 'CORS_ORIGIN_DENIED',
        }, requestOrigin)
      }
      return sendResponse(res, 204, null, requestOrigin)
    }

    // 2. Structured diagnostic log: invocation
    console.log('[ENQUIRY_FUNCTION_INVOKED]', {
      method: req?.method,
      url: req?.url,
      hasBody: Boolean(req?.body),
      contentType: req?.headers?.['content-type'],
      originAllowed: requestOrigin ? isAllowedOrigin(requestOrigin) : true,
      timestamp: new Date().toISOString(),
    })

    // 3. Origin check on POST: block untrusted external cross-origin requests
    if (requestOrigin && !isAllowedOrigin(requestOrigin)) {
      return sendResponse(res, 403, {
        success: false,
        error: 'Cross-origin request denied.',
        code: 'CORS_ORIGIN_DENIED',
      }, requestOrigin)
    }

    // 4. Method validation
    if (req?.method !== 'POST') {
      return sendResponse(res, 405, {
        success: false,
        error: 'Method not allowed',
        code: 'METHOD_NOT_ALLOWED',
      }, requestOrigin)
    }

    // 4. Safe Body Parsing
    let payload: EnquiryInput = {}
    try {
      if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
        payload = req.body
      } else if (typeof req.body === 'string' && req.body.trim().length > 0) {
        payload = JSON.parse(req.body)
      } else if (Buffer.isBuffer(req.body)) {
        payload = JSON.parse(req.body.toString('utf-8'))
      } else if (typeof req.json === 'function') {
        payload = await req.json()
      } else if (typeof req[Symbol.asyncIterator] === 'function') {
        // Stream parsing for Node IncomingMessage
        let raw = ''
        for await (const chunk of req) {
          raw += chunk
        }
        if (raw.trim().length > 0) {
          payload = JSON.parse(raw)
        }
      }
    } catch {
      return sendResponse(res, 400, {
        success: false,
        error: 'Malformed JSON payload.',
        code: 'INVALID_JSON',
      }, requestOrigin)
    }

    if (!payload || typeof payload !== 'object') {
      payload = {}
    }

    // 5. Structured diagnostic log: parsed body summary (strictly non-PII booleans)
    console.log('[REQUEST_BODY_PARSED]', {
      hasName: Boolean(payload.name),
      hasEmail: Boolean(payload.email),
      hasCompany: Boolean(payload.company),
      hasDescription: Boolean(payload.description),
      hasConsent: Boolean(payload.consent),
      hasHoneypot: Boolean(payload.website),
      hasTiming: Boolean(payload._time),
      service: typeof payload.service === 'string' ? payload.service : undefined,
    })

    // 6. Process Enquiry
    const result = await processEnquiry(payload, process.env as EnquiryServerEnv)

    return sendResponse(res, result.statusCode, result.body, requestOrigin)
  } catch (err: unknown) {
    const errorName = err instanceof Error ? err.name : 'UnknownError'
    const errorMessage = err instanceof Error ? err.message : String(err)
    const errorStack = err instanceof Error ? err.stack?.split('\n').slice(0, 5).join('\n') : undefined

    console.error('[ENQUIRY_FUNCTION_FAILED]', {
      errorName,
      message: errorMessage,
      stack: errorStack,
    })

    return sendResponse(res, 500, {
      success: false,
      error: 'An internal server error occurred while processing the enquiry.',
      code: 'INTERNAL_SERVER_ERROR',
      diagnostic: errorName,
    }, requestOrigin)
  }
}
