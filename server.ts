import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { connectDB } from './backend/db';
import { apiRouter } from './backend/routes/api';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Initialize database connection
  await connectDB();

  // API routes mounted first
  app.use('/api', apiRouter);

  // Check if running in production mode or bundled server
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    (process.argv[1] && process.argv[1].endsWith('server.cjs'));

  // Development: Vite middleware + SPA HTML serving / Production: static files
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Serve transformed index.html for SPA routes in dev mode
    app.use('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        if (!fs.existsSync(indexPath)) {
          return res.status(404).send('index.html not found');
        }
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
    console.log(`[Server] Network access: http://127.0.0.1:${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      const fallbackPort = PORT + 1;
      console.warn(`[Server] Port ${PORT} is in use, retrying on port ${fallbackPort}...`);
      app.listen(fallbackPort, '0.0.0.0', () => {
        console.log(`[Server] Running on http://localhost:${fallbackPort}`);
      });
    } else {
      console.error('[Server] Server error:', err);
    }
  });
}

startServer().catch((err) => {
  console.error('[Server] Startup error:', err);
});

