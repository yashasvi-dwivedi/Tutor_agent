const callGeminiAPI = require('./services/geminiService');

async function test() {
  try {
    const question = "What is 2 + 2?";
    const answer = await callGeminiAPI(question);
    console.log("Gemini API answer:", answer);
  } catch (err) {
    console.error(err);
  }
}

test();
