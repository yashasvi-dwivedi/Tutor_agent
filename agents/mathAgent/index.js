function respond(question) {
  if (question.includes('2+2')) {
    return "Math Agent: 2 + 2 = 4";
  }
  return `Math Agent: I received "${question}", but don't know how to solve it yet.`;
}
