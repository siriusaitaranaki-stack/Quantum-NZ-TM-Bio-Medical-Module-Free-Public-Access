import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { setupBiomedicalWebSocketServer } from './src/server/biomedicalWebSocketServer';

dotenv.config();

async function executeGeminiWithFallback(apiKey: string, contents: any, systemInstruction?: string) {
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });

  const modelsToTry = ['gemini-3.7-flash', 'gemini-flash-latest'];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: systemInstruction ? { systemInstruction } : undefined
      });
      if (response && response.text) {
        return { text: response.text };
      }
    } catch (err: any) {
      lastError = err;
      const errMsg = err?.message || String(err);
      // If temporary overload (503 / 429 / UNAVAILABLE), retry with alternate model
      if (errMsg.includes('503') || errMsg.includes('429') || errMsg.includes('high demand') || errMsg.includes('UNAVAILABLE') || errMsg.includes('RESOURCE_EXHAUSTED')) {
        await new Promise((r) => setTimeout(r, 500));
        continue;
      }
      break;
    }
  }

  return { error: lastError?.message || 'Model temporarily experiencing high demand', fallback: true };
}

function geminiApiDevPlugin(): Plugin {
  return {
    name: 'gemini-api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/gemini') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const apiKey = process.env.GEMINI_API_KEY;

              if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured', fallback: true }));
                return;
              }

              const result = await executeGeminiWithFallback(
                apiKey,
                data.contents || data.prompt || '',
                data.systemInstruction
              );

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Generation error', fallback: true }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

function biomedicalWebSocketDevPlugin(): Plugin {
  return {
    name: 'biomedical-websocket-dev-server',
    configureServer(server) {
      if (server.httpServer) {
        const wss = new WebSocketServer({ noServer: true });
        setupBiomedicalWebSocketServer(wss);

        server.httpServer.on('upgrade', (request, socket, head) => {
          try {
            const host = request.headers.host || 'localhost:3000';
            const pathname = request.url ? new URL(request.url, `http://${host}`).pathname : '';
            if (pathname === '/ws/biomedical-feed' || pathname === '/ws/biomedical') {
              wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
              });
            }
          } catch (e) {
            console.error('WebSocket upgrade error:', e);
          }
        });
      }
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiDevPlugin(), biomedicalWebSocketDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
