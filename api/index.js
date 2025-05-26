const express = require('express');
const tutorAgent = require('../agents/tutorAgent');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('public'));
app.use(express.json());

app.post('/ask', async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).send('Question is required');

    try {
        console.log('API received:', question);
        const answer = await tutorAgent.handleQuestion(question);
        res.send({ answer });
    } catch (err) {
        console.error('Error handling question:', err);
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/', (req, res) => {
    res.send('Gemini API is running. Use POST /ask to interact.');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});
