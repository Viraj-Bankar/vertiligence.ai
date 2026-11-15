/**
 * Cloudflare Pages Function — /api/enquiry
 *
 * Handles client enquiry submissions on Cloudflare Pages deployments.
 */

import { processEnquiry, type EnquiryInput, type EnquiryServerEnv } from '../../src/server/enquiryHandler.ts'

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function onRequestPost(context: {
  request: Request
  env: Record<string, unknown>
}): Promise<Response> {
  let payload: EnquiryInput = {}
  try {
    payload = (await context.request.json()) as EnquiryInput
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Malformed JSON payload.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  const result = await processEnquiry(payload, context.env as unknown as EnquiryServerEnv)

  return new Response(JSON.stringify(result.body), {
    status: result.statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
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
    return onRequestOptions()
  }
  return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
