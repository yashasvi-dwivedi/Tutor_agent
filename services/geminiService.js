require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function callGeminiAPI(question) {
  // Make sure 'question' is a string
  const prompt = typeof question === 'string' ? question : JSON.stringify(question);

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const modelName = "gemini-1.5-flash-001";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errText}`);
  }

  const data = await response.json();
  // The response format may vary; adjust as needed
  return data.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data);
}

module.exports = callGeminiAPI;