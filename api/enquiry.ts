/**
 * Vercel Serverless Function — /api/enquiry
 *
 * Handles client enquiry submissions on Vercel deployments.
 * Fully compatible with Vercel Node.js and Edge runtimes.
 */

import { processEnquiry, type EnquiryInput } from '../src/server/enquiryHandler.ts'

export const config = {
  maxDuration: 15,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res?: any) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    if (res && typeof res.setHeader === 'function') {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      res.statusCode = 204
      res.end()
      return
    }
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    const errorBody = { success: false, error: 'Method not allowed' }
    if (res && typeof res.status === 'function') {
      return res.status(405).json(errorBody)
    }
    return new Response(JSON.stringify(errorBody), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let payload: EnquiryInput = {}
  try {
    if (typeof req.json === 'function') {
      payload = await req.json()
    } else if (req.body && typeof req.body === 'object') {
      payload = req.body
    } else if (typeof req.body === 'string') {
      payload = JSON.parse(req.body)
    } else {
      // Stream parsing for Node IncomingMessage
      payload = await new Promise((resolve, reject) => {
        let data = ''
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        req.on('data', (chunk: any) => {
          data += chunk
        })
        req.on('end', () => {
          try {
            resolve(JSON.parse(data || '{}'))
          } catch (e) {
            reject(e)
          }
        })
        req.on('error', reject)
      })
    }
  } catch {
    const malformed = { success: false, error: 'Malformed JSON payload.' }
    if (res && typeof res.status === 'function') {
      return res.status(400).json(malformed)
    }
    return new Response(JSON.stringify(malformed), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const result = await processEnquiry(payload, process.env)

  if (res && typeof res.status === 'function') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 'no-store, max-age=0')
    return res.status(result.statusCode).json(result.body)
  }

  return new Response(JSON.stringify(result.body), {
    status: result.statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
