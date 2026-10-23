import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory / file store fallback for messages if Supabase is unconfigured
const messagesFilePath = path.join(__dirname, 'messages.json');
function loadLocalMessages(): any[] {
  try {
    if (fs.existsSync(messagesFilePath)) {
      return JSON.parse(fs.readFileSync(messagesFilePath, 'utf-8'));
    }
  } catch (e) {
    console.error('Error reading local messages:', e);
  }
  return [];
}

function saveLocalMessage(msg: any) {
  try {
    const messages = loadLocalMessages();
    messages.unshift(msg);
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages.slice(0, 100), null, 2));
  } catch (e) {
    console.error('Error saving local message:', e);
  }
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Contact form submission
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, honeypot } = req.body || {};

    // Spam bot trap
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const newMessage = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'General Portfolio Inquiry').trim(),
      message: message.trim(),
      created_at: new Date().toISOString(),
      is_read: false
    };

    saveLocalMessage(newMessage);

    console.log(`[Contact Form Received] From: ${newMessage.name} <${newMessage.email}> - Subject: ${newMessage.subject}`);

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received and Ubaid will get back to you shortly.',
      data: newMessage
    });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Server error processing contact message.' });
  }
});

// Admin endpoint to read received contact inquiries
app.get('/api/contact/messages', (req: Request, res: Response) => {
  const messages = loadLocalMessages();
  return res.json({ messages });
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  return res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// -------------------------------------------------------------
// Vite Dev Server / Static Production Server
// -------------------------------------------------------------
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production: serve built static files
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
