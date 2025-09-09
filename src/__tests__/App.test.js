import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";

jest.mock("../api", () => ({
  getEvents: jest.fn(() =>
    Promise.resolve(
      Array.from({ length: 32 }, (_, i) => ({
        id: i + 1,
        summary: `Event ${i + 1}`,
        location: i % 2 === 0 ? "Berlin, Germany" : "Munich, Germany",
        start: { dateTime: "2025-09-10T10:00" },
        created: "2025-09-01T08:00",
      }))
    )
  ),
}));

test("renders number of events matching user input", async () => {
  render(<App />);

  const numberInput = screen.getByRole("spinbutton");

  // Change the input value to 10
  fireEvent.change(numberInput, { target: { value: 10 } });

  // Wait for events to update
  await waitFor(() => {
    const renderedEvents = screen.getAllByRole("listitem");
    expect(renderedEvents.length).toBe(10);
  });

  // Optional: check first and last events in the slice
  expect(screen.getByText("Event 1")).toBeInTheDocument();
  expect(screen.getByText("Event 10")).toBeInTheDocument();
});
