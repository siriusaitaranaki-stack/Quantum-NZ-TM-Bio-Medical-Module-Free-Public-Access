import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { setupBiomedicalWebSocketServer } from './src/server/biomedicalWebSocketServer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

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
      if (errMsg.includes('503') || errMsg.includes('429') || errMsg.includes('high demand') || errMsg.includes('UNAVAILABLE') || errMsg.includes('RESOURCE_EXHAUSTED')) {
        await new Promise((r) => setTimeout(r, 500));
        continue;
      }
      break;
    }
  }

  return { error: lastError?.message || 'Model temporarily experiencing high demand', fallback: true };
}

// Server-side Gemini API endpoint
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt, contents, systemInstruction } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({ error: 'GEMINI_API_KEY is not configured', fallback: true });
    }

    const result = await executeGeminiWithFallback(
      apiKey,
      contents || prompt || '',
      systemInstruction
    );

    res.json(result);
  } catch (err: any) {
    res.json({ error: err?.message || 'Error generating content', fallback: true });
  }
});

// Serve static assets in production
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });
setupBiomedicalWebSocketServer(wss);

server.on('upgrade', (request, socket, head) => {
  try {
    const host = request.headers.host || `localhost:${PORT}`;
    const pathname = request.url ? new URL(request.url, `http://${host}`).pathname : '';
    if (pathname === '/ws/biomedical-feed' || pathname === '/ws/biomedical') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  } catch (err) {
    console.error('Production WebSocket upgrade error:', err);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Quantum-NZ Server with Live Biomedical WebSocket listening on port ${PORT}`);
});
