import { render, screen } from "@testing-library/react";
import EventList from "../components/EventList";

describe("<EventList /> component", () => {
  test("renders event list with 32 events", async () => {
    // Mock events array, each with required `created` field
    const mockEvents = Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      summary: `Event ${i + 1}`,
      location: i % 2 === 0 ? "Berlin, Germany" : "Munich, Germany",
      start: { dateTime: "2025-09-10T10:00" },
      created: "2025-09-01T08:00", // Required for PropTypes
    }));

    render(<EventList events={mockEvents} />);

    // Check first event is rendered
    expect(await screen.findByText(/Event 1/i)).toBeInTheDocument();

    // Check total number of events rendered
    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(32);
  });

  test("renders correct details for first and last events", async () => {
    const mockEvents = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      summary: `Event ${i + 1}`,
      location: i % 2 === 0 ? "Berlin, Germany" : "Munich, Germany",
      start: { dateTime: "2025-09-10T10:00" },
      created: "2025-09-01T08:00",
    }));

    render(<EventList events={mockEvents} />);

    // Check first and last events
    expect(await screen.findByText(/Event 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Event 5/i)).toBeInTheDocument();

    // Optional: check locations
    expect(screen.getByText(/Berlin, Germany/i)).toBeInTheDocument();
    expect(screen.getByText(/Munich, Germany/i)).toBeInTheDocument();
  });
});
