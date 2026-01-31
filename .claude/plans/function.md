# Function Plan: code-quality

## Repository Name
`code-quality`

## Description
Code Quality Scoring. Evaluate how well-written a piece of code is based on multiple quality dimensions including readability, maintainability, efficiency, and adherence to best practices. Returns a single score in [0, 1] where 1 represents excellent code quality.

## Type
Scalar Function

## Input Schema Design
The function takes a code snippet along with optional context about the programming language and purpose:

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string",
      "description": "The code snippet to evaluate for quality."
    },
    "language": {
      "type": "string",
      "description": "The programming language of the code (e.g., 'python', 'javascript', 'rust'). Optional - will be auto-detected if not provided."
    },
    "context": {
      "type": "string",
      "description": "Optional context about what the code is supposed to do, helping the evaluation be more accurate."
    }
  },
  "required": ["code"]
}
```

## Task Structure
The function will use a single vector completion task that evaluates code quality across multiple dimensions. The task asks the LLM ensemble to rate the code on a 5-point scale:

1. **Vector Completion Task**: Evaluates overall code quality with responses:
   - "Excellent" (score contribution: 1.0)
   - "Good" (score contribution: 0.75)
   - "Acceptable" (score contribution: 0.5)
   - "Poor" (score contribution: 0.25)
   - "Very Poor" (score contribution: 0.0)

The output expression computes a weighted average based on the scores for each quality level.

## Output Expression
```jmespath
add(tasks[0].scores[0], add(multiply(tasks[0].scores[1], `0.75`), add(multiply(tasks[0].scores[2], `0.5`), multiply(tasks[0].scores[3], `0.25`))))
```

This produces a score in [0, 1] where:
- Full score for "Excellent" = 1.0
- Weighted score for "Good" = 0.75
- Weighted score for "Acceptable" = 0.5
- Weighted score for "Poor" = 0.25
- "Very Poor" contributes 0