import { render, screen, fireEvent } from "@testing-library/react";
import Event from "../components/Event";

// Mock event data
const mockEvent = {
  id: 1,
  summary: "React Meetup",
  location: "Online",
  start: { dateTime: "2025-09-08T10:00:00" },
  created: "2025-09-01T09:00:00",
  description: "This is a React meetup event.",
};

describe("<Event /> component", () => {
  test("renders event title, start time, location, and show details button", () => {
    render(<Event event={mockEvent} />);

    expect(screen.queryByText(mockEvent.summary)).toBeInTheDocument();
    expect(screen.queryByText(mockEvent.created)).toBeInTheDocument();
    expect(screen.queryByText(mockEvent.location)).toBeInTheDocument();
    expect(screen.getByText(/show details/i)).toBeInTheDocument();
  });

  test("shows event details when show details button is clicked", () => {
    render(<Event event={mockEvent} />);

    const button = screen.getByText(/show details/i);
    fireEvent.click(button);

    expect(screen.queryByText(mockEvent.description)).toBeInTheDocument();
    expect(screen.getByText(/hide details/i)).toBeInTheDocument();
  });

  test("hides event details when hide details button is clicked", () => {
    render(<Event event={mockEvent} />);

    const button = screen.getByText(/show details/i);
    fireEvent.click(button); // show details first
    expect(screen.queryByText(mockEvent.description)).toBeInTheDocument();

    fireEvent.click(button); // hide details
    expect(screen.queryByText(mockEvent.description)).not.toBeInTheDocument();
    expect(screen.getByText(/show details/i)).toBeInTheDocument();
  });
});
