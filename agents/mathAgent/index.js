const math = require('mathjs');
module.exports = {
    respond: (question) => {
        // Try to evaluate math expressions
        try {
            const result = math.evaluate(question);
            return `The answer is ${result}`;
        } catch {
            return "Sorry, I couldn't solve that math problem.";
        }
    }
};