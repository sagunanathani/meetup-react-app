import { render, screen } from "@testing-library/react";
import EventList from "./components/EventList";

test("renders event list", async () => {
  const mockEvent = {
    id: 1,
    summary: "React Meetup",
    location: "Online",
    start: { dateTime: "2025-09-08T10:00:00" },
    created: "2025-09-01T09:00:00",
    description: "This is a React meetup event.",
  };

  render(<EventList events={[mockEvent]} />);
  expect(await screen.findByText(/React Meetup/i)).toBeInTheDocument();
});
