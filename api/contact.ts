import type { IncomingMessage, ServerResponse } from 'http';

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string; // spam protection
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, honeypot } = (req.body || {}) as ContactPayload;

    // Honeypot spam detection
    if (honeypot) {
      // Silently drop bot submissions
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide all required fields: name, email, and message.' });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address provided.' });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! Ubaid will get back to you shortly.',
      received: {
        name,
        email,
        subject: subject || 'General Inquiry',
        timestamp: new Date().toISOString()
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Server error processing contact request.' });
  }
}
