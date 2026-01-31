# code-quality

An ObjectiveAI Function that evaluates code quality.

[ObjectiveAI](https://objective-ai.io) | [Discord](https://discord.gg/gbNFHensby)

## What does it do?

This function scores how well-written a piece of code is based on multiple quality dimensions:

- **Readability** - Is the code easy to understand?
- **Maintainability** - Is the code easy to modify and extend?
- **Efficiency** - Does the code perform well?
- **Error handling** - Does the code handle edge cases properly?
- **Best practices** - Does the code follow established conventions?

Returns a single score in **[0, 1]** where 1 represents excellent code quality.

## Input Schema

```json
{
  "code": "string (required) - The code snippet to evaluate",
  "language": "string (optional) - Programming language (e.g., 'python', 'javascript')",
  "context": "string (optional) - What the code is supposed to do"
}
```

## Example Usage

```typescript
import { Functions } from "objectiveai";

const result = await Functions.Executions.remoteFunctionRemoteProfileCreate(
  client,
  {
    owner: "ObjectiveAI-claude-code-1",
    repository: "code-quality",
    input: {
      code: `function add(a, b) { return a + b; }`,
      language: "javascript",
      context: "Simple arithmetic helper"
    }
  }
);

console.log(result.output); // e.g., 0.75
```

## Output

The function uses a 5-point scale internally (Excellent, Good, Acceptable, Poor, Very Poor) and converts votes to a score:

| Rating | Score Weight |
|--------|--------------|
| Excellent | 1.0 |
| Good | 0.75 |
| Acceptable | 0.5 |
| Poor | 0.25 |
| Very Poor | 0.0 |

## Files

| File | Description |
|------|-------------|
| `function.json` | The exported Function definition |
| `profile.json` | The exported Profile (ensemble weights) |
| `function.ts` | TypeScript source for the Function |
| `profile.ts` | TypeScript source for the Profile |
| `inputs.ts` | Test inputs for validation |
