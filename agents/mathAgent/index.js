const math = require('mathjs');
const callGeminiAPI = require('../../services/geminiService');

// Simple calculator tool
function simpleCalculator(expression) {
    try {
        if (!/^[\d\s\+\-\*\/\.\(\)]+$/.test(expression)) return null;
        return eval(expression);
    } catch {
        return null;
    }
}

module.exports = {
    respond: async (question) => {
        // Try to extract and solve a math expression
        const match = question.match(/result of (.+?)[\?\.]?$/i);
        let expression = match ? match[1] : question;

        // Use simple calculator if explicit calculation detected
        if (/^\s*[\d\.\s\+\-\*\/\(\)]+$/.test(expression)) {
            const calcResult = simpleCalculator(expression);
            if (calcResult !== null) {
                return `Math agent (calculator): The answer is ${calcResult}`;
            }
        }

        // Use mathjs for more complex math
        try {
            const result = math.evaluate(expression);
            return `Math agent: The answer is ${result}`;
        } catch {
            // Fallback to Gemini API if unable to solve
            return await callGeminiAPI(question);
        }
    }
};