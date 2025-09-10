import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";

const mockEvent = {
  id: "1",
  summary: "React Meetup",
  location: "Berlin, Germany",
  start: { dateTime: "2025-09-09T18:00:00Z" },
  description: "This is a test event for React developers.",
};

describe("<Event /> component", () => {
  test("renders event summary, start date, and location", () => {
    render(<Event event={mockEvent} />);

    expect(screen.getByText(mockEvent.summary)).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("2025"))
    ).toBeInTheDocument(); // Adjust date format if needed
    expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
  });

  test("renders 'Show details' button by default", () => {
    render(<Event event={mockEvent} />);
    const button = screen.getByRole("button", { name: /show details/i });
    expect(button).toBeInTheDocument();
  });

  test("toggles event description on button click", async () => {
    const user = userEvent.setup();
    render(<Event event={mockEvent} />);
    const button = screen.getByRole("button", { name: /show details/i });

    // Click to show details
    await user.click(button);
    expect(screen.getByText(mockEvent.description)).toBeInTheDocument();
    expect(button).toHaveTextContent(/hide details/i);

    // Click to hide details
    await user.click(button);
    expect(screen.queryByText(mockEvent.description)).not.toBeInTheDocument();
    expect(button).toHaveTextContent(/show details/i);
  });

  test("shows fallback text when location is missing", () => {
    const eventWithoutLocation = { ...mockEvent, location: "" };
    render(<Event event={eventWithoutLocation} />);
    expect(screen.getByText(/location not specified/i)).toBeInTheDocument();
  });

  test("shows fallback text when start date is missing", () => {
    const eventWithoutStart = { ...mockEvent, start: null };
    render(<Event event={eventWithoutStart} />);
    expect(screen.getByText(/date not available/i)).toBeInTheDocument();
  });

  test("does not render description if it is missing", () => {
    const eventWithoutDescription = { ...mockEvent, description: "" };
    render(<Event event={eventWithoutDescription} />);
    const button = screen.getByRole("button", { name: /show details/i });
    expect(screen.queryByText(/this is a test event/i)).not.toBeInTheDocument();
    // Click button shouldn't show anything
    userEvent.click(button);
    expect(screen.queryByText(/this is a test event/i)).not.toBeInTheDocument();
  });
});
