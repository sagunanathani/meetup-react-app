import { render, screen } from "@testing-library/react";
import EventList from "../components/EventList";

const mockEvents = [
  {
    id: 1,
    summary: "Event 1",
    location: "Berlin, Germany",
    start: { dateTime: "2025-09-10T10:00" },
    created: "2025-09-01T08:00",
  },
  {
    id: 2,
    summary: "Event 2",
    location: "Munich, Germany",
    start: { dateTime: "2025-09-10T12:00" },
    created: "2025-09-01T09:00",
  },
];

describe("<EventList /> component", () => {
  test("renders the correct number of events and their details", () => {
    render(<EventList events={mockEvents} />);

    const eventItems = screen.getAllByRole("listitem");
    expect(eventItems).toHaveLength(mockEvents.length);

    // Check each event's summary and location
    expect(screen.getByText(/Event 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Berlin, Germany/i)).toBeInTheDocument();
    expect(screen.getByText(/Event 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Munich, Germany/i)).toBeInTheDocument();
  });
});
