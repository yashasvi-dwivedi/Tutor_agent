const math = require('mathjs');

// Basic evaluator
function simpleCalculator(expression) {
    try {
        if (!/^[\d\s\+\-\*\/\.\(\)]+$/.test(expression)) return null;
        return math.evaluate(expression);
    } catch {
        return null;
    }
}

// Extract a valid math expression
function extractExpression(question) {
    console.log('[MathAgent] Raw question:', question);
    for (let i = 0; i < question.length; i++) {
        console.log(`char[${i}]: '${question[i]}' code: ${question.charCodeAt(i)}`);
    }

    // Normalize common Unicode math symbols and 'x'/'X' to ASCII
    let normalized = question
        .replace(/[＋]/g, '+')
        .replace(/[－–—]/g, '-')   // minus, en dash, em dash
        .replace(/[×✕✖xX]/g, '*') // <-- add x and X here
        .replace(/[÷]/g, '/')
        .replace(/[\u00D7\u2715\u2716\u2717\u2718\u2719\u271A\u271B\u271C\u271D\u271E\u271F\u2A09\u2A2F\u2A30\u2A31\u2A34\u2A35\u2A36\u2A37\u2A38\u2A39\u2A3A\u2A3B\u2A3C\u2A3D\u2A3E\u2A3F\u2A40\u2A41\u2A42\u2A43\u2A44\u2A45\u2A46\u2A47\u2A48\u2A49\u2A4A\u2A4B\u2A4C\u2A4D\u2A4E\u2A4F\u2A50\u2A51\u2A52\u2A53\u2A54\u2A55\u2A56\u2A57\u2A58\u2A59\u2A5A\u2A5B\u2A5C\u2A5D\u2A5E\u2A5F\u2A60\u2A61\u2A62\u2A63\u2A64\u2A65\u2A66\u2A67\u2A68\u2A69\u2A6A\u2A6B\u2A6C\u2A6D\u2A6E\u2A6F\u2A70\u2A71\u2A72\u2A73\u2A74\u2A75\u2A76\u2A77\u2A78\u2A79\u2A7A\u2A7B\u2A7C\u2A7D\u2A7E\u2A7F\u2A80\u2A81\u2A82\u2A83\u2A84\u2A85\u2A86\u2A87\u2A88\u2A89\u2A8A\u2A8B\u2A8C\u2A8D\u2A8E\u2A8F\u2A90\u2A91\u2A92\u2A93\u2A94\u2A95\u2A96\u2A97\u2A98\u2A99\u2A9A\u2A9B\u2A9C\u2A9D\u2A9E\u2A9F\u2AA0\u2AA1\u2AA2\u2AA3\u2AA4\u2AA5\u2AA6\u2AA7\u2AA8\u2AA9\u2AAA\u2AAB\u2AAC\u2AAD\u2AAE\u2AAF\u2AB0\u2AB1\u2AB2\u2AB3\u2AB4\u2AB5\u2AB6\u2AB7\u2AB8\u2AB9\u2ABA\u2ABB\u2ABC\u2ABD\u2ABE\u2ABF\u2AC0\u2AC1\u2AC2\u2AC3\u2AC4\u2AC5\u2AC6\u2AC7\u2AC8\u2AC9\u2ACA\u2ACB\u2ACC\u2ACD\u2ACE\u2ACF\u2AD0\u2AD1\u2AD2\u2AD3\u2AD4\u2AD5\u2AD6\u2AD7\u2AD8\u2AD9\u2ADA\u2ADB\u2ADC\u2ADD\u2ADE\u2ADF\u2AE0\u2AE1\u2AE2\u2AE3\u2AE4\u2AE5\u2AE6\u2AE7\u2AE8\u2AE9\u2AEA\u2AEB\u2AEC\u2AED\u2AEE\u2AEF\u2AF0\u2AF1\u2AF2\u2AF3\u2AF4\u2AF5\u2AF6\u2AF7\u2AF8\u2AF9\u2AFA\u2AFB\u2AFC\u2AFD\u2AFE\u2AFF]/g, '*');
    console.log('[MathAgent] Normalized:', normalized);

    // Now clean as before
    const cleaned = normalized.toLowerCase().replace(/[^\d\+\-\*\/\.\(\)\s]/g, '').trim();
    console.log('[MathAgent] Cleaned:', cleaned);

    const match = cleaned.match(/\d+(\.\d+)?\s*[\+\-\*\/]\s*\d+(\.\d+)?/);
    console.log('[MathAgent] Regex match:', match);

    return match ? match[0] : cleaned;
}

async function mathAgentRespond(question) {
    console.log('[MathAgent] Question:', question);

    const expr = extractExpression(question);
    console.log('[MathAgent] Expression:', expr);

    const result = simpleCalculator(expr);
    if (result !== null) {
        return `Math agent: The answer is ${result}`;
    }

    // Fallback
    return `Math agent: Sorry, I couldn't parse that expression.`;
}

module.exports = { respond: mathAgentRespond };
