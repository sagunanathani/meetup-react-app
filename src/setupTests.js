// src/setupTests.js

// ----------------------------
// Extend Jest with additional matchers
// ----------------------------
import "@testing-library/jest-dom";

// ----------------------------
// Suppress specific warning messages in the console
// ----------------------------
// Only ignore messages that match these patterns
const MESSAGES_TO_IGNORE = [
  "When testing, code that causes React state updates should be wrapped into >act(...):",
  "Error:",
  "The above error occurred",
];

// Save the original console.error function
const originalError = console.error.bind(console.error);

// Override console.error to filter out the messages we want to ignore
console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find((message) =>
    args.toString().includes(message)
  );
  if (!ignoreMessage) {
    originalError(...args); // Log anything else normally
  }
};

// ----------------------------
// Set a global Jest timeout for long-running tests (like Puppeteer e2e tests)
// ----------------------------
jest.setTimeout(30000);
