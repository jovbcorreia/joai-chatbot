const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chatRouter = require('./routes/chat');

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '10mb' }));

app.use('/api/chat', chatRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'JoAI Chatbot API' });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`JoAI server running on http://localhost:${PORT}`);
  console.log(`AI provider: ${process.env.AI_PROVIDER || 'openrouter'}`);
});
