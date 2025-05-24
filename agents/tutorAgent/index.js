const agentRegistry = require('../agentRegistry');
const mathAgent = require('../mathAgent');
const physicsAgent = require('../physicsAgent');
const callGeminiAPI = require('../../services/geminiService'); // or your Gemini API path

// Register agents
agentRegistry.registerAgent('math', mathAgent);
agentRegistry.registerAgent('physics', physicsAgent);
// agentRegistry.registerAgent('chemistry', chemistryAgent);

async function detectSubject(question) {
    const q = question.toLowerCase();
    if (q.includes('result of') || q.match(/\d+\s*[\+\-\*\/]\s*\d+/)) {
        return 'math';
    }
    if (q.includes('newton') || q.includes('law of motion')) {
        return 'physics';
    }
    // Fallback: ask Gemini to classify
    const subject = await callGeminiAPI({ question, intent: true }); // Implement intent recognition in Gemini
    return subject || 'general';
}

async function handleQuestion(question) {
    const subject = await detectSubject(question);
    const agent = agentRegistry.getAgent(subject);
    if (agent) {
        return await agent.respond(question); // Await here!
    } else {
        return await callGeminiAPI(question);
    }
}
module.exports = { detectSubject, handleQuestion };