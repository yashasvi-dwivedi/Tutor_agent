// const agentRegistry = require('../agentRegistry');
// const mathAgent = require('../mathAgent');
// const physicsAgent = require('../physicsAgent');
// const callGeminiAPI = require('../../services/geminiService');

// agentRegistry.registerAgent('math', mathAgent);
// agentRegistry.registerAgent('physics', physicsAgent);

// console.log('[API] mathAgent:', mathAgent);

async function detectSubject(question) {
    const raw = question.toLowerCase().trim();
    console.log('[detectSubject] Raw:', raw);

    // Normalize Unicode math symbols and 'x'/'X' to ASCII
    const normalized = raw
        .replace(/[＋]/g, '+')
        .replace(/[－–—]/g, '-')
        .replace(/[×✕✖xX]/g, '*')
        .replace(/[÷]/g, '/');

    console.log('[detectSubject] Normalized:', normalized);

    const mathPattern = /\d+(\.\d+)?\s*[\+\-\*\/]\s*\d+(\.\d+)?/;
    if (mathPattern.test(normalized)) {
        console.log('[detectSubject] Math detected via regex');
        return 'math';
    }

    const words = normalized.replace(/[^\w\s]/g, '').split(/\s+/);
    const physicsKeywords = ['newton', 'velocity', 'acceleration', 'mass', 'force', 'gravitational', 'speed', 'light'];

    if (physicsKeywords.some(k => words.includes(k))) {
        console.log('[detectSubject] Detected as physics');
        return 'physics';
    }

    // Fallback
    console.log('[detectSubject] Fallback to general');
    return 'general';
}


// async function handleQuestion(question) {
//     const subject = await detectSubject(question);
//     console.log('[handleQuestion] Detected subject:', subject);
//     const agent = agentRegistry.getAgent(subject);
//     if (agent) {
//         return await agent.respond(question); // call as a function
//     }
//     // Fallback to Gemini for general questions or if no agent found
//     return await callGeminiAPI(question);
// }

// module.exports = {
//     detectSubject,
//     handleQuestion
// };
