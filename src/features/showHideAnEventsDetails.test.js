//# BDD step definitions
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, screen, fireEvent } from "@testing-library/react";
import EventList from "../components/EventList";
import { events } from "../mock-data";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("Event details are collapsed by default", ({ given, when, then }) => {
    given("the user opens the Meet app", () => {});
    when("the app loads", () => {
      render(<EventList events={events} />);
    });
    then("the event details should be hidden", () => {
      const details = screen.queryByText(events[0].description);
      expect(details).toBeNull();
    });
  });

  test("User can expand an event to see details", ({ given, when, then }) => {
    given("the user opens the Meet app", () => {});
    when('the user clicks on "Show details"', () => {
      render(<EventList events={events} />);
      fireEvent.click(screen.getAllByText("Show details")[0]);
    });
    then("the event details should be displayed", () => {
      const details = screen.getByText(events[0].description);
      expect(details).toBeInTheDocument();
    });
  });

  test("User can collapse an event to hide details", ({
    given,
    when,
    then,
  }) => {
    given("the event details are shown", () => {
      render(<EventList events={events} />);
      fireEvent.click(screen.getAllByText("Show details")[0]);
    });
    when('the user clicks on "Hide details"', () => {
      fireEvent.click(screen.getAllByText("Hide details")[0]);
    });
    then("the event details should be hidden", () => {
      const details = screen.queryByText(events[0].description);
      expect(details).toBeNull();
    });
  });
});
