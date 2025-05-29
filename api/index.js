const express = require('express');
const tutorAgent = require('../agents/tutorAgent');
const app = express();
const PORT = process.env.PORT || 4000;
const mathAgent = require('../agents/mathAgent'); // Import the math agent

app.use(express.static('public'));
app.use(express.json());

app.post('/ask', async (req, res) => {
    const { question } = req.body;
    console.log('\n---- Incoming API Request ----');
    console.log('Raw question:', question);

    if (!question) return res.status(400).send('Question is required');

    try {
        const answer = await tutorAgent.handleQuestion(question);
        res.send({ answer });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).send('Error: ' + err.message);
    }
});

// Direct endpoint for math agent
app.post('/math', async (req, res) => {
    const { question } = req.body;
    console.log('\n---- Incoming Math Agent Request ----');
    console.log('Raw question:', question);

    if (!question) {
        return res.status(400).json({ error: 'Missing question field' });
    }

    // If your mathAgent exports { respond }, use mathAgent.respond
    // If it exports a function, use mathAgent(question)
    const answer = await (mathAgent.respond ? mathAgent.respond(question) : mathAgent(question));
    res.json({ answer });
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
