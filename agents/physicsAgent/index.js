const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

// Simulate Gemini fallback
async function callGeminiAPI(question) {
    return `Gemini API: I couldn't find an exact match. Here's a detailed explanation about "${question}"...`;
}

// Constants
const constants = {
    "speed of light": { value: 299792458, unit: "m/s" },
    "gravitational constant": { value: 6.67430e-11, unit: "m³/kg/s²" },
    "planck constant": { value: 6.62607015e-34, unit: "J·s" },
    "elementary charge": { value: 1.602176634e-19, unit: "C" },
    "avogadro constant": { value: 6.02214076e23, unit: "1/mol" },
    "boltzmann constant": { value: 1.380649e-23, unit: "J/K" }
};

// Lookup helper
function lookupConstant(query) {
    const qWords = query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    console.log('Cleaned words:', qWords);

    for (const key in constants) {
        const keyWords = key.split(' ');
        if (keyWords.every(kw => qWords.includes(kw))) {
            const c = constants[key];
            return `Physics agent: The ${key} is ${c.value} ${c.unit}.`;
        }
    }
    return null;
}

// Handle logic
async function physicsAgentRespond(question) {
    console.log('Question:', question);

    const constant = lookupConstant(question);
    if (constant) {
        console.log('Matched a physics constant.');
        return constant;
    }

    // Final velocity
    const velocityMatch = question.match(/accelerates? from rest at (\d+(?:\.\d+)?)\s*m\/s²? for (\d+(?:\.\d+)?)\s*seconds?/i);
    if (velocityMatch) {
        const a = parseFloat(velocityMatch[1]);
        const t = parseFloat(velocityMatch[2]);
        const v = a * t;
        return `Physics agent: The final velocity is ${v} m/s.`;
    }

    // Force
    const forceMatch = question.match(/(?:force|what is the force)[^0-9]*(\d+(?:\.\d+)?)\s*kg[^0-9]*(\d+(?:\.\d+)?)\s*m\/s²?/i);
    if (forceMatch) {
        const m = parseFloat(forceMatch[1]);
        const a = parseFloat(forceMatch[2]);
        const F = m * a;
        return `Physics agent: The force is ${F} N.`;
    }

    // Fallback
    console.log('Falling back to Gemini...');
    return await callGeminiAPI(question);
}

// Middleware
app.use(bodyParser.json());

// API Route
app.post('/ask', async (req, res) => {
    const question = req.body.question;
    console.log('\n---- Incoming API Request ----');
    console.log('Raw question:', question);

    if (!question) {
        return res.status(400).json({ error: 'Missing question field' });
    }

    const answer = await physicsAgentRespond(question);
    res.json({ answer });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
