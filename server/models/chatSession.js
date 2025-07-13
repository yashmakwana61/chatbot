const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    role: String,
    content: String,
}, { _id: false });

const chatSessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    messages: [messageSchema],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ChatSession', chatSessionSchema);
