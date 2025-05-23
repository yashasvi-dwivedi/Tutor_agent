const mathAgent = require('../mathAgent');
const physicsAgent = require('../physicsAgent');

function handleQuestion(question) {
  const q = question.toLowerCase();
  if (q.includes('math')) return mathAgent.respond(question);
  if (q.includes('physics')) return physicsAgent.respond(question);
  return `Tutor Agent: I don't understand what subject this is.`;
}
