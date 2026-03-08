const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// Log visitor
router.post('/log', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const { page } = req.body;
    await new Visitor({ ip, userAgent, page }).save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get visitor count
router.get('/count', async (req, res) => {
  try {
    const count = await Visitor.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ count: 0 });
  }
});

module.exports = router;
