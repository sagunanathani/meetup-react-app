import { render, screen, within } from "@testing-library/react";
import EventList from "../components/EventList";

// 🔹 Updated mock events to match your current structure
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
  test("renders the list container and correct number of events", () => {
    render(<EventList events={mockEvents} />);

    // 🔹 Check container exists
    const eventList = screen.getByTestId("event-list");
    expect(eventList).toBeInTheDocument();

    // 🔹 Check number of list items
    const eventItems = within(eventList).getAllByRole("listitem");
    expect(eventItems).toHaveLength(mockEvents.length);

    // 🔹 Check content of first event
    expect(eventItems[0]).toHaveTextContent("Event 1");
    expect(eventItems[0]).toHaveTextContent("Berlin, Germany");
    expect(eventItems[0].querySelector("button")).toHaveClass("details-btn");

    // 🔹 Check content of second event
    expect(eventItems[1]).toHaveTextContent("Event 2");
    expect(eventItems[1]).toHaveTextContent("Munich, Germany");
    expect(eventItems[1].querySelector("button")).toHaveClass("details-btn");
  });

  test("matches updated snapshot", () => {
    const { asFragment } = render(<EventList events={mockEvents} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
