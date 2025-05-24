const nlp = require('compromise');
const mathAgent = require('../mathAgent');
const physicsAgent = require('../physicsAgent');
const callGeminiAPI = require('../services/geminiService');

function detectSubject(question){
    const q = question.toLowerCase();
    const doc = nlp(q);

    // Math detection
    if (
        doc.has('math') ||
        doc.has('algebra') ||
         doc.has('geometry') ||
        doc.has('calculus') ||
        doc.has('equation') ||
        doc.has('integrate') ||
        doc.has('derivative') ||
        q.match(/\d+\s*[\+\-\*\/\^]\s*\d+/)
    ) {
        return 'math';
    }
    if (
        doc.has('physics') ||
        doc.has('velocity') ||
        doc.has('acceleration') ||
        doc.has('force') ||
        doc.has('energy') ||
        doc.has('gravity') ||
        doc.has('momentum') ||
        doc.has('thermodynamics') ||
        doc.has('quantum') ||
        doc.has('relativity')
    ) {
        return 'physics';
    }
    return 'general';
}   

async function handleQuestion(question) {
    const subject = detectSubject(question);
    if (subject == 'math') {
        return mathAgent.respond(question);
    } else if (subject === 'physics'){
        return physicsAgent.respond(question);
    } else {
        return await callGeminiAPI(question);
    }
}

module.exports = { handleQuestion };