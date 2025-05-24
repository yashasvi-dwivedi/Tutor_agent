const callGeminiAPI = require('../../services/geminiService');

// Physics constants dictionary
const constants = {
    "speed of light": { value: 299792458, unit: "m/s" },
    "gravitational constant": { value: 6.67430e-11, unit: "m³/kg/s²" },
    "planck constant": { value: 6.62607015e-34, unit: "J·s" },
    "elementary charge": { value: 1.602176634e-19, unit: "C" },
    "avogadro constant": { value: 6.02214076e23, unit: "1/mol" },
    "boltzmann constant": { value: 1.380649e-23, unit: "J/K" }
    // Add more as needed
};

function lookupConstant(query) {
    for (const key in constants) {
        if (query.toLowerCase().includes(key)) {
            const c = constants[key];
            return `Physics agent: The ${key} is ${c.value} ${c.unit}.`;
        }
    }
    return null;
}

module.exports = {
    respond: async (question) => {
        // Lookup for physics constants
        const constantResult = lookupConstant(question);
        if (constantResult) return constantResult;

        // Final velocity (from rest)
        const velocityMatch = question.match(/accelerates? from rest at (\d+(?:\.\d+)?)\s*m\/s²? for (\d+(?:\.\d+)?)\s*seconds?/i);
        if (velocityMatch) {
            const a = parseFloat(velocityMatch[1]);
            const t = parseFloat(velocityMatch[2]);
            const v = a * t;
            return `Physics agent: The final velocity is ${v} m/s.`;
        }

        // Force: F = m * a
        const forceMatch = question.match(/(?:force|what is the force)[^0-9]*(\d+(?:\.\d+)?)\s*kg[^0-9]*(\d+(?:\.\d+)?)\s*m\/s²?/i);
        if (forceMatch) {
            const m = parseFloat(forceMatch[1]);
            const a = parseFloat(forceMatch[2]);
            const F = m * a;
            return `Physics agent: The force is ${F} N.`;
        }

        // ...add more patterns as needed...

        // Fallback to Gemini API if not recognized
        return await callGeminiAPI(question);
    }
};