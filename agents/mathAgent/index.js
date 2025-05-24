const math = require('mathjs');
const callGeminiAPI = require('../../services/geminiService');

// Simple calculator tool for basic expressions
function simpleCalculator(expression) {
    try {
        if (!/^[\d\s\+\-\*\/\.\(\)]+$/.test(expression)) return null;
        return eval(expression);
    } catch {
        return null;
    }
}

// Extract math expression from question
function extractExpression(question) {
    const q = question.toLowerCase().trim();
    let match = q.match(/(?:calculate|compute|evaluate|solve|result of|what is)\s(.+?)[\?\.]?$/i);
    if (match) return match[1];
    return q.replace(/^(what is|calculate|compute|evaluate|solve)\s+/i, '').replace(/[\?\.]+$/, '').trim();
}

module.exports = {
    respond: async (question) => {
        console.log("\n[ Math Agent ] Received question:", question);

        const expression = extractExpression(question);
        console.log("[ Math Agent ] Extracted expression:", expression);

        // Check for simple math expression
        if (/^[\d\.\s\+\-\*\/\(\)]+$/.test(expression)) {
            const result = simpleCalculator(expression);
            if (result !== null) {
                return `Math agent (calculator): The answer is ${result}`;
            }
        }

        // Use mathjs for complex expressions
        try {
            const result = math.evaluate(expression);
            return `Math agent: The answer is ${result}`;
        } catch (error) {
            console.log("[ Math Agent ] Error evaluating expression:", error.message);
            return await callGeminiAPI(question);
        }
    }
};
