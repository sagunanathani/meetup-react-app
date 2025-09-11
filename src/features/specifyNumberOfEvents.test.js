import { loadFeature, defineFeature } from "jest-cucumber";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { events as mockData } from "../mock-data";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("Default number of events is 32", ({ given, when, then }) => {
    given("the user has not specified a number of events", () => {});

    // eslint-disable-next-line no-unused-vars
    let app;
    when("the app loads", () => {
      app = render(<App />);
    });

    then("the user should see up to 32 events", async () => {
      const events = await waitFor(() => screen.getAllByRole("listitem"));
      const expectedCount = Math.min(32, mockData.length);
      expect(events.length).toBe(expectedCount);
    });
  });

  test("User can change the number of events", ({ given, when, then }) => {
    given("the user has opened the app", () => {});

    // eslint-disable-next-line no-unused-vars
    let app;
    when('the user types "5" in the number of events input', async () => {
      app = render(<App />);
      const input = await screen.findByRole("spinbutton"); // assuming input type="number"
      userEvent.clear(input);
      userEvent.type(input, "5");
    });

    then("the app should display 5 events", async () => {
      const events = await waitFor(() => screen.getAllByRole("listitem"));
      expect(events.length).toBe(5);
    });
  });
});
