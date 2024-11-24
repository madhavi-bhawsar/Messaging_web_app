const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    content: { type: String, required: true },
    agentResponse: { type: String, default: null },
    agentId: { type: String, default: null }, // Tracks which agent responded
    lockedBy: { type: String, default: null }, // Tracks which agent locked the message
    lockedAt: { type: Date, default: null },   // Tracks when the message was locked
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
