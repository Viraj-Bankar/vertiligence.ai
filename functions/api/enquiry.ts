/**
 * Cloudflare Pages Function — /api/enquiry
 *
 * Handles client enquiry submissions on Cloudflare Pages deployments.
 */

import {
  processEnquiry,
  isAllowedOrigin,
  resolveCorsOrigin,
  type EnquiryInput,
  type EnquiryServerEnv,
} from '../../src/server/enquiryHandler.ts'

export async function onRequestOptions(context: {
  request: Request
}): Promise<Response> {
  const origin = context.request.headers.get('origin')
  const allowed = isAllowedOrigin(origin)
  const corsOrigin = allowed && origin ? origin.trim() : resolveCorsOrigin(origin)

  if (origin && !allowed) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Cross-origin request denied.',
        code: 'CORS_ORIGIN_DENIED',
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          Vary: 'Origin',
        },
      }
    )
  }

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': corsOrigin,
      Vary: 'Origin',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function onRequestPost(context: {
  request: Request
  env: Record<string, unknown>
}): Promise<Response> {
  const origin = context.request.headers.get('origin')
  const allowed = isAllowedOrigin(origin)
  const corsOrigin = allowed && origin ? origin.trim() : resolveCorsOrigin(origin)

  // Block unauthorized cross-origin POST requests
  if (origin && !allowed) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Cross-origin request denied.',
        code: 'CORS_ORIGIN_DENIED',
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          Vary: 'Origin',
        },
      }
    )
  }

  let payload: EnquiryInput = {}
  try {
    payload = (await context.request.json()) as EnquiryInput
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Malformed JSON payload.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': corsOrigin,
        Vary: 'Origin',
      },
    })
  }

  const result = await processEnquiry(payload, context.env as unknown as EnquiryServerEnv)

  return new Response(JSON.stringify(result.body), {
    status: result.statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': corsOrigin,
      Vary: 'Origin',
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}

export async function onRequest(context: {
  request: Request
  env: Record<string, unknown>
}): Promise<Response> {
  if (context.request.method === 'POST') {
    return onRequestPost(context)
  }
  if (context.request.method === 'OPTIONS') {
    return onRequestOptions(context)
  }
  return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': resolveCorsOrigin(context.request.headers.get('origin')),
      Vary: 'Origin',
    },
  })
}
