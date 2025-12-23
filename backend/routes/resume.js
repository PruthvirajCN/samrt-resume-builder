const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// In-memory resume storage (replace with MongoDB in production)
const resumes = {};

// Get user's resume
router.get('/', authenticateToken, (req, res) => {
  const resume = resumes[req.user.id] || {
    personalInfo: {},
    summary: '',
    skills: [],
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    template: 'minimal'
  };
  res.json(resume);
});

// Save user's resume
router.post('/', authenticateToken, (req, res) => {
  try {
    resumes[req.user.id] = req.body;
    res.json({ message: 'Resume saved successfully', resume: resumes[req.user.id] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save resume', details: error.message });
  }
});

module.exports = router;

