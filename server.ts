import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Proxy: Pexels API
  app.post("/api/pexels", async (req, res) => {
    try {
      const { apiKey, query } = req.body;
      const response = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=3`, {
        headers: {
          'Authorization': apiKey
        }
      });
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Proxy: ElevenLabs API
  app.post("/api/elevenlabs", async (req, res) => {
    try {
      const { apiKey, text, voiceId } = req.body;
      // In a real scenario, this returns audio bits. 
      // For this applet, since returning audio via proxy can be complex, 
      // ElevenLabs DOES support CORS for its endpoint: 
      // const target = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId || '21m00Tcm4TlvDq8ikWAM'}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });
      // We pipe the audio response back
      if (!response.ok) {
        throw new Error(`ElevenLabs error: ${response.statusText}`);
      }
      res.setHeader('Content-Type', 'audio/mpeg');
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      res.send(buffer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Proxy: Shotstack API
  app.post("/api/shotstack/render", async (req, res) => {
    try {
      const { apiKey, timeline } = req.body;
      const response = await fetch("https://api.shotstack.io/edit/v1/render", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify(timeline)
      });
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Proxy: Shotstack Polling
  app.post("/api/shotstack/status", async (req, res) => {
    try {
      const { apiKey, renderId } = req.body;
      const response = await fetch(`https://api.shotstack.io/edit/v1/render/${renderId}`, {
        headers: {
          "x-api-key": apiKey
        }
      });
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
