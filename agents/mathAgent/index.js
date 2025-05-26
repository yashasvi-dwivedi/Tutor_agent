const math = require('mathjs');
const callGeminiAPI = require('../../services/geminiService');

function simpleCalculator(expression) {
    try {
        if (!/^[\d\s\+\-\*\/\.\(\)]+$/.test(expression)) return null;
        return math.evaluate(expression);
    } catch {
        return null;
    }
}

function extractExpression(question) {
    // Clean question: remove all except digits, math symbols, dots, parentheses, and spaces
    const cleaned = question.toLowerCase().replace(/[^\d\+\-\*\/\.\(\)\s]/g, '').trim();
    // Match direct math expressions like "4000 + 45000" or "3.5*2"
    const match = cleaned.match(/\d+(\.\d+)?\s*[\+\-\*\/]\s*\d+(\.\d+)?/);
    if (match) return match[0];
    return cleaned; // fallback: the cleaned string might be the expression itself
}

async function mathAgentRespond(question) {
    console.log('[Math Agent] Question:', question);

    const expr = extractExpression(question);
    console.log('[Math Agent] Extracted expression:', expr);

    if (expr) {
        const result = simpleCalculator(expr);
        if (result !== null) {
            return `Math agent: The answer is ${result}`;
        }
    }

    // Fallback to mathjs evaluate for more complex expressions
    try {
        const result = math.evaluate(expr);
        return `Math agent: The answer is ${result}`;
    } catch (err) {
        console.log('[Math Agent] Error:', err.message);
    }

    // Final fallback to Gemini
    return await callGeminiAPI(question);
}

module.exports = {
    respond: mathAgentRespond
};
