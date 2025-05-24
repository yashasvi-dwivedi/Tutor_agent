# Tutor_agent

## Agent Development Kit (ADK) Principles in This Project

- **Modular Agents:** Each subject (math, physics) is handled by a specialized agent module.
- **Task Delegation:** The Tutor Agent analyzes the question and delegates to the correct agent.
- **Tool Integration:** Agents use tools (e.g., mathjs, regex, Gemini API) to answer questions.
- **Extensibility:** New agents can be added easily for more subjects.
- **Clear Interfaces:** All agents implement a `respond(question)` method for uniform communication.