const mathAgent = require('../mathAgent');

function handleQuestion(question){
    if(question.toLowerCase().includes('math')){
        return mathAgent.respond(question);
    } else{
        return `Sorry, I can't help with that yet.`;
    }
}

module.exports = {handleQuestion}