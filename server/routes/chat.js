const express = require('express');
const router = express.Router();
const { getAIResponse } = require('../services/aiService');

router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Request must include a non-empty messages array.' });
  }

  const sanitized = messages.map(({ role, content }) => ({ role, content }));

  try {
    const response = await getAIResponse(sanitized);
    res.json({ message: response });
  } catch (err) {
    console.error('[chat route error]', err.message);
    res.status(500).json({ error: 'Failed to get AI response. Please try again.' });
  }
});

module.exports = router;
