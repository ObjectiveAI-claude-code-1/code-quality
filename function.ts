import { Functions } from "objectiveai";

export const Function: Functions.RemoteFunction = {
  type: "scalar.function",
  input_maps: null,
  description:
    "Code Quality Scoring. Evaluate how well-written a piece of code is based on multiple quality dimensions including readability, maintainability, efficiency, and adherence to best practices. Returns a single score in [0, 1] where 1 represents excellent code quality.",
  changelog: null,
  input_schema: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description: "The code snippet to evaluate for quality.",
      },
      language: {
        type: "string",
        description:
          "The programming language of the code (e.g., 'python', 'javascript', 'rust'). Optional - will be auto-detected if not provided.",
      },
      context: {
        type: "string",
        description:
          "Optional context about what the code is supposed to do, helping the evaluation be more accurate.",
      },
    },
    required: ["code"],
  },
  tasks: [
    {
      type: "vector.completion",
      skip: null,
      map: null,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Evaluate the quality of the following",
            },
            {
              $jmespath:
                "if(input.language, {type: 'text', text: join('', [' ', input.language || ''])}, {type: 'text', text: ''})",
            },
            {
              type: "text",
              text: " code",
            },
            {
              $jmespath:
                "if(input.context, {type: 'text', text: join('', [' (', input.context || '', ')'])}, {type: 'text', text: ''})",
            },
            {
              type: "text",
              text: ":\n\n```\n",
            },
            {
              type: "text",
              text: { $jmespath: "input.code" },
            },
            {
              type: "text",
              text: "\n```\n\nConsider readability, maintainability, efficiency, error handling, and best practices.",
            },
          ],
        },
      ],
      tools: null,
      responses: ["Excellent", "Good", "Acceptable", "Poor", "Very Poor"],
    },
  ],
  output: {
    $jmespath:
      "add(add(add(multiply(tasks[0].scores[1], `0.75`), multiply(tasks[0].scores[2], `0.5`)), multiply(tasks[0].scores[3], `0.25`)), tasks[0].scores[0])",
  },
};
