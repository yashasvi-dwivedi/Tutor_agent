const agentRegistry = require('../agentRegistry');
const mathAgent = require('../mathAgent');
const physicsAgent = require('../physicsAgent');
const callGeminiAPI = require('../../services/geminiService');

agentRegistry.registerAgent('math', mathAgent);
agentRegistry.registerAgent('physics', physicsAgent);



async function detectSubject(question) {
    const raw = question.toLowerCase().trim();
    console.log('[detectSubject] Raw:', raw);

    // Clean to digits, operators, dots, parentheses, spaces
    const cleaned = raw.replace(/[^0-9\+\-\*\/\.\(\)\s]/g, '');
    console.log('[detectSubject] Cleaned:', cleaned);

    // Check if math expression exists
    const mathExprMatch = cleaned.match(/\d+(\.\d+)?\s*[\+\-\*\/]\s*\d+(\.\d+)?/);
    console.log('[detectSubject] Regex match:', mathExprMatch);

    if (mathExprMatch) {
        console.log('[detectSubject] Math detected');
        return 'math';
    }

    // Fallback:
    console.log('[detectSubject] Fallback');
    return 'general';
}


async function handleQuestion(question) {
    const subject = await detectSubject(question);
    console.log('[handleQuestion] Detected subject:', subject);
    const agent = agentRegistry.getAgent(subject);
    if (agent) {
        return await agent(question); // call as a function
    }
    // Fallback to Gemini for general questions or if no agent found
    return await callGeminiAPI(question);
}

module.exports = {
    detectSubject,
    handleQuestion
};
