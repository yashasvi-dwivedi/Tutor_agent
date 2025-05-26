const agents = {};

function registerAgent(subject, agentModule) {
    agents[subject] = agentModule;
}

function getAgent(subject) {
    return agents[subject];
}

module.exports = {
    registerAgent,
    getAgent
};