import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const mockEvents = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  summary: `Event ${i + 1}`,
  location: i % 2 === 0 ? "Berlin, Germany" : "Munich, Germany",
  start: { dateTime: "2025-09-10T10:00" },
  created: "2025-09-01T08:00",
}));

jest.mock("../api", () => ({
  getEvents: jest.fn(() => Promise.resolve(mockEvents)),
}));

test("renders number of events matching user input", async () => {
  render(<App />);
  const user = userEvent.setup();

  // Wait until initial events are rendered
  const eventList = await screen.findByTestId("event-list");
  const initialItems = within(eventList).getAllByRole("listitem");
  expect(initialItems.length).toBeGreaterThan(0);

  const numberInput = screen.getByRole("spinbutton");

  // Clear the input and type "10"
  await user.clear(numberInput);
  await user.type(numberInput, "10");

  // Wait for input to reflect the correct value
  await waitFor(() => expect(numberInput).toHaveValue(10));

  // Wait for event list to update
  const updatedList = await screen.findByTestId("event-list");
  const items = within(updatedList).getAllByRole("listitem");
  expect(items.length).toBe(10);

  // Confirm displayed events match mock summaries and locations
  for (let i = 0; i < 10; i++) {
    expect(items[i]).toHaveTextContent(mockEvents[i].summary);
    expect(items[i]).toHaveTextContent(mockEvents[i].location);
  }
});
