const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  page: { type: String, default: '/' },
  visitedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visitor', visitorSchema);
