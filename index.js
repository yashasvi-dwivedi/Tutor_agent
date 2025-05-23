require('dotenv').config();

console.log("Hello Tutor Agent!");

const apiKey = process.env.GEMINI_API_KEY;
console.log("Your Gemini API Key is:", apiKey ? "Loaded" : "Not found");

// Just to keep the server alive for testing:
setInterval(() => {}, 1000);
