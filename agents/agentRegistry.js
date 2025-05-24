const agents = {};

function registerAgent(subject, agent) {
    agents[subject] = agent;
}

function getAgent(subject) {
    return agents[subject];
}

module.exports = { registerAgent, getAgent };