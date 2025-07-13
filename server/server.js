// File: server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const mongoose = require('mongoose');
const path = require('path');
const ChatSession = require('./models/chatSession');
require('dotenv').config();


const app = express();
const PORT = 3000; // Hardcoded port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection (hardcoded URI)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// OpenAI Configuration (hardcoded API key)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Replace with your actual API key
});

app.post('/api/ask', async (req, res) => {
    const { message, sessionId = 'default' } = req.body;

    try {
        let session = await ChatSession.findOne({ sessionId });
        if (!session) {
            session = new ChatSession({ sessionId, messages: [] });
        }

        session.messages.push({ role: 'user', content: message });

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are an assistant that asks one question at a time to gather business information.' },
                ...session.messages,
            ],
        });

        const reply = response.choices[0].message.content;
        session.messages.push({ role: 'assistant', content: reply });

        await session.save();
        res.json({ reply });
    } catch (err) {
        console.error('OpenAI API error:', err);
        res.status(500).json({ reply: 'Sorry, something went wrong. Please try again later.' });
    }
});

// Default route to serve chat.html directly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`🤖 Chatbot server running at http://localhost:${PORT}`);
});
