import { ExampleInput } from "./example_input";

// Helper to build expected compiled task with array content parts
const makeCompiledTask = (
  code: string,
  language?: string,
  context?: string
) => ({
  type: "vector.completion" as const,
  messages: [
    {
      role: "user" as const,
      content: [
        { type: "text" as const, text: "Evaluate the quality of the following" },
        { type: "text" as const, text: language ? ` ${language}` : "" },
        { type: "text" as const, text: " code" },
        { type: "text" as const, text: context ? ` (${context})` : "" },
        { type: "text" as const, text: ":\n\n```\n" },
        { type: "text" as const, text: code },
        {
          type: "text" as const,
          text: "\n```\n\nConsider readability, maintainability, efficiency, error handling, and best practices.",
        },
      ],
    },
  ],
  responses: ["Excellent", "Good", "Acceptable", "Poor", "Very Poor"],
});

// Code samples for testing
const CODE_BINARY_SEARCH = `def binary_search(arr: list[int], target: int) -> int:
    """
    Perform binary search on a sorted array.

    Args:
        arr: A sorted list of integers
        target: The value to search for

    Returns:
        The index of target if found, -1 otherwise
    """
    if not arr:
        return -1

    left, right = 0, len(arr) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`;

const CODE_POOR_PYTHON = `def f(x):
  a=0
  for i in x:a=a+i
  return a/len(x)`;

const CODE_JS_VALIDATION = `function validateEmail(email) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

function validateForm(formData) {
  const errors = [];

  if (!formData.name || formData.name.trim() === '') {
    errors.push('Name is required');
  }

  if (!validateEmail(formData.email)) {
    errors.push('Valid email is required');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}`;

const CODE_SQL_INJECTION = `def get_user(username):
    query = "SELECT * FROM users WHERE name = '" + username + "'"
    cursor.execute(query)
    return cursor.fetchone()`;

const CODE_JAVA_CALC = `public class Calculator {
    public int add(int a, int b) {
        int result = a + b;
        return result;
    }

    public int subtract(int a, int b) {
        int result = a - b;
        return result;
    }

    public int multiply(int a, int b) {
        int result = a * b;
        return result;
    }

    public int divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
        int result = a / b;
        return result;
    }
}`;

const CODE_JS_ARROW = `const sum = arr => arr.reduce((a, b) => a + b, 0);`;

const CODE_RUST_COUNTER = `/// A thread-safe counter that can be shared across threads.
#[derive(Default)]
pub struct Counter {
    value: std::sync::atomic::AtomicUsize,
}

impl Counter {
    /// Creates a new counter initialized to zero.
    pub fn new() -> Self {
        Self::default()
    }

    /// Increments the counter and returns the new value.
    pub fn increment(&self) -> usize {
        self.value.fetch_add(1, std::sync::atomic::Ordering::SeqCst) + 1
    }

    /// Returns the current value of the counter.
    pub fn get(&self) -> usize {
        self.value.load(std::sync::atomic::Ordering::SeqCst)
    }
}`;

const CODE_OBFUSCATED = `_=(_=+!![]+[+[]])+(_[_]=_,_[++_]=_,_)`;

const CODE_TS_USER = `interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data.users;
}

async function getUserById(id: number): Promise<User | undefined> {
  const users = await fetchUsers();
  return users.find(user => user.id === id);
}`;

const CODE_HELLO = `print("Hello, World!")`;

const CODE_UNICODE = `# -*- coding: utf-8 -*-
def greet(name: str) -> str:
    """Greet a user with emoji 👋"""
    return f"Hello, {name}! 🎉"`;

const CODE_ADD = `function add(a, b) { return a + b; }`;

const CODE_COMMENTS = `// This is a comment
/* Another comment */`;

export const Inputs: ExampleInput[] = [
  // 1. Code only (no language, no context)
  {
    value: { code: CODE_BINARY_SEARCH },
    compiledTasks: [makeCompiledTask(CODE_BINARY_SEARCH)],
    outputLength: null,
  },

  // 2. Code + language (no context)
  {
    value: { code: CODE_POOR_PYTHON, language: "python" },
    compiledTasks: [makeCompiledTask(CODE_POOR_PYTHON, "python")],
    outputLength: null,
  },

  // 3. Code + language + context (all fields)
  {
    value: {
      code: CODE_JS_VALIDATION,
      language: "javascript",
      context: "Form validation utilities",
    },
    compiledTasks: [
      makeCompiledTask(CODE_JS_VALIDATION, "javascript", "Form validation utilities"),
    ],
    outputLength: null,
  },

  // 4. Code + language + context
  {
    value: {
      code: CODE_SQL_INJECTION,
      language: "python",
      context: "Database query function",
    },
    compiledTasks: [
      makeCompiledTask(CODE_SQL_INJECTION, "python", "Database query function"),
    ],
    outputLength: null,
  },

  // 5. Code + language (no context)
  {
    value: { code: CODE_JAVA_CALC, language: "java" },
    compiledTasks: [makeCompiledTask(CODE_JAVA_CALC, "java")],
    outputLength: null,
  },

  // 6. Code only
  {
    value: { code: CODE_JS_ARROW },
    compiledTasks: [makeCompiledTask(CODE_JS_ARROW)],
    outputLength: null,
  },

  // 7. Code + language + context
  {
    value: {
      code: CODE_RUST_COUNTER,
      language: "rust",
      context: "Thread-safe atomic counter",
    },
    compiledTasks: [
      makeCompiledTask(CODE_RUST_COUNTER, "rust", "Thread-safe atomic counter"),
    ],
    outputLength: null,
  },

  // 8. Code + language (no context)
  {
    value: { code: CODE_OBFUSCATED, language: "javascript" },
    compiledTasks: [makeCompiledTask(CODE_OBFUSCATED, "javascript")],
    outputLength: null,
  },

  // 9. Code + language + context
  {
    value: {
      code: CODE_TS_USER,
      language: "typescript",
      context: "User API client",
    },
    compiledTasks: [
      makeCompiledTask(CODE_TS_USER, "typescript", "User API client"),
    ],
    outputLength: null,
  },

  // 10. Code + language + context
  {
    value: {
      code: CODE_HELLO,
      language: "python",
      context: "Hello world program",
    },
    compiledTasks: [
      makeCompiledTask(CODE_HELLO, "python", "Hello world program"),
    ],
    outputLength: null,
  },

  // 11. Empty code string (code only)
  {
    value: { code: "" },
    compiledTasks: [makeCompiledTask("")],
    outputLength: null,
  },

  // 12. Code + language (unicode)
  {
    value: { code: CODE_UNICODE, language: "python" },
    compiledTasks: [makeCompiledTask(CODE_UNICODE, "python")],
    outputLength: null,
  },

  // 13. Code + context (NO language - important permutation)
  {
    value: { code: CODE_ADD, context: "Simple arithmetic helper function" },
    compiledTasks: [
      makeCompiledTask(CODE_ADD, undefined, "Simple arithmetic helper function"),
    ],
    outputLength: null,
  },

  // 14. Whitespace-only code (code only)
  {
    value: { code: "   \n\t  \n   " },
    compiledTasks: [makeCompiledTask("   \n\t  \n   ")],
    outputLength: null,
  },

  // 15. Code + language
  {
    value: { code: CODE_COMMENTS, language: "javascript" },
    compiledTasks: [makeCompiledTask(CODE_COMMENTS, "javascript")],
    outputLength: null,
  },
];
