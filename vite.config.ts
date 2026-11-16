import { defineConfig, type Plugin, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'http'
import { processEnquiry, isAllowedOrigin, resolveCorsOrigin, type EnquiryInput } from './src/server/enquiryHandler.ts'

function enquiryApiPlugin(env: Record<string, string>): Plugin {
  const handler = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (req.url === '/api/enquiry' || req.url?.startsWith('/api/enquiry?')) {
      const origin = req.headers.origin as string | undefined
      const allowed = isAllowedOrigin(origin)
      const corsOrigin = allowed && origin ? origin : resolveCorsOrigin(origin)

      if (req.method === 'OPTIONS') {
        if (origin && !allowed) {
          res.statusCode = 403
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Vary', 'Origin')
          res.end(JSON.stringify({ success: false, error: 'Origin not allowed', code: 'CORS_ORIGIN_DENIED' }))
          return
        }
        res.statusCode = 204
        res.setHeader('Access-Control-Allow-Origin', corsOrigin)
        res.setHeader('Vary', 'Origin')
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.end()
        return
      }

      if (origin && !allowed) {
        res.statusCode = 403
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Vary', 'Origin')
        res.end(JSON.stringify({ success: false, error: 'Origin not allowed', code: 'CORS_ORIGIN_DENIED' }))
        return
      }

      if (req.method !== 'POST') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', corsOrigin)
        res.setHeader('Vary', 'Origin')
        res.end(JSON.stringify({ success: false, error: 'Method not allowed' }))
        return
      }

      let body = ''
      req.on('data', (chunk: Buffer) => {
        body += chunk.toString()
      })

      req.on('end', async () => {
        try {
          const payload: EnquiryInput = JSON.parse(body || '{}')
          const result = await processEnquiry(payload, {
            ...process.env,
            ...env,
            NODE_ENV: env.NODE_ENV || 'development',
          })

          res.statusCode = result.statusCode
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', corsOrigin)
          res.setHeader('Vary', 'Origin')
          res.setHeader('Cache-Control', 'no-store, max-age=0')
          res.end(JSON.stringify(result.body))
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', corsOrigin)
          res.setHeader('Vary', 'Origin')
          res.end(JSON.stringify({ success: false, error: 'Malformed JSON payload.' }))
        }
      })
      return
    }
    next()
  }

  return {
    name: 'enquiry-api-plugin',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), enquiryApiPlugin(env)],
  }
})
