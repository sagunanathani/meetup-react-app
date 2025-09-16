// ----------------------------
// Mock ResizeObserver globally
// ----------------------------
if (typeof window !== "undefined") {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserverMock;
}

// ----------------------------
// Mock Recharts ResponsiveContainer
// ----------------------------
jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => {
      // Ensure children is a function
      if (typeof children === "function") {
        return children({ width: 800, height: 400 });
      }
      // Fallback in case children is a node
      return children;
    },
  };
});

// ----------------------------
// Extend Jest with additional matchers
// ----------------------------
import "@testing-library/jest-dom";

// ----------------------------
// Suppress specific warning messages
// ----------------------------
const MESSAGES_TO_IGNORE = [
  "When testing, code that causes React state updates should be wrapped into >act(...):",
  "Error:",
  "The above error occurred",
];

const originalError = console.error.bind(console.error);
console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find((msg) =>
    args.toString().includes(msg)
  );
  if (!ignoreMessage) originalError(...args);
};

// ----------------------------
// Set a global Jest timeout
// ----------------------------
jest.setTimeout(30000);
