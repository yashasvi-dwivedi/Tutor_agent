const express = require('express');
const callGeminiAPI = require('../services/geminiService');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/ask', async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).send('Question is required');
    try {
        const answer = await callGeminiAPI(question);
        res.send({ answer });
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});
app.get('/', (req, res) => {
    res.send('Gemini API is running. Use POST /ask to interact.');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

});