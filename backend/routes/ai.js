const express = require('express');
const OpenAI = require('openai');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Lazy initialization of OpenAI client - only create if API key is available
let openai = null;

function getOpenAIClient() {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
}

// Get AI suggestions for resume content
router.post('/suggest', authenticateToken, async (req, res) => {
  try {
    const { text, section } = req.body;

    if (!text || !section) {
      return res.status(400).json({ error: 'Text and section are required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file.' });
    }

    const client = getOpenAIClient();
    if (!client) {
      return res.status(500).json({ error: 'OpenAI client initialization failed' });
    }

    const prompts = {
      summary: `Improve this professional summary for an ATS-friendly resume. Make it concise, impactful, and include relevant keywords. Keep it under 150 words:\n\n${text}`,
      experience: `Improve this work experience description for an ATS-friendly resume. Use strong action verbs, quantify achievements, and make it professional. Keep the same length:\n\n${text}`,
      skills: `Suggest ATS-friendly keywords and skills related to this field. Return a comma-separated list:\n\n${text}`,
      education: `Improve this education description for a resume. Make it professional and concise:\n\n${text}`,
      projects: `Improve this project description for an ATS-friendly resume. Use action verbs and quantify results. Keep it concise:\n\n${text}`,
      certifications: `Improve this certification description for a resume. Make it professional:\n\n${text}`
    };

    const prompt = prompts[section] || prompts.summary;

    const completion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume writing assistant specializing in ATS (Applicant Tracking System) optimization. Provide clear, professional, and impactful resume content.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    const suggestion = completion.choices[0].message.content.trim();

    res.json({
      original: text,
      suggestion: suggestion,
      section: section
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({
      error: 'Failed to get AI suggestion',
      details: error.message
    });
  }
});

module.exports = router;

