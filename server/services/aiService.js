const axios = require('axios');

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/chat';

const SYSTEM_MESSAGE = {
  role: 'system',
  content:
    'You are JoAI, a helpful, intelligent, and concise AI assistant. ' +
    'You provide clear, accurate, and thoughtful responses. ' +
    'Be friendly but professional. Keep answers focused and avoid unnecessary padding.',
};

async function callOpenRouter(messages) {
  const response = await axios.post(
    OPENROUTER_URL,
    {
      model: process.env.OPENROUTER_MODEL || 'openai/gpt-3.5-turbo',
      messages: [SYSTEM_MESSAGE, ...messages],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.CLIENT_URL || 'http://localhost:5173',
        'X-Title': 'JoAI Chatbot',
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    }
  );

  return response.data.choices[0].message.content;
}

async function callOllama(messages) {
  const response = await axios.post(
    OLLAMA_URL,
    {
      model: process.env.OLLAMA_MODEL || 'llama3',
      messages: [SYSTEM_MESSAGE, ...messages],
      stream: false,
    },
    { timeout: 60000 }
  );

  return response.data.message.content;
}

async function getAIResponse(messages) {
  const provider = process.env.AI_PROVIDER || 'openrouter';

  if (provider === 'ollama') {
    return callOllama(messages);
  }

  try {
    return await callOpenRouter(messages);
  } catch (err) {
    if (process.env.OLLAMA_FALLBACK === 'true') {
      console.warn('[aiService] OpenRouter failed, falling back to Ollama:', err.message);
      return callOllama(messages);
    }
    throw err;
  }
}

module.exports = { getAIResponse };
