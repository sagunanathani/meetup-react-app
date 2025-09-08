import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock mockEvents so App has something to render
jest.mock("../mockEvent", () => ({
  mockEvents: [
    {
      id: 1,
      summary: "React Meetup",
      location: "Online",
      start: { dateTime: "2025-09-08T10:00:00" },
      created: "2025-09-01T09:00:00",
      description: "This is a React meetup event.",
    },
  ],
}));

test("renders app without crashing", () => {
  render(<App />);

  // Check that <h1> text renders
  expect(screen.getByText(/Meetup Events/i)).toBeInTheDocument();

  // Check that the mock event is displayed
  expect(screen.getByText(/React Meetup/i)).toBeInTheDocument();
});
