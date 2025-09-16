import { loadFeature, defineFeature } from "jest-cucumber";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import App from "../App";
import { events as mockData } from "../mock-data";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

// ----------------------------
// Ensure process.env exists in JSDOM
// ----------------------------
// Ensure process.env exists in the test environment
if (typeof globalThis.process === "undefined") {
  globalThis.process = { env: {} };
}
globalThis.process.env.REACT_APP_USE_MOCK = "true";

defineFeature(feature, (test) => {
  test("Default number of events is 32", ({ given, when, then }) => {
    given("the user has not specified a number of events", () => {});

    when("the app loads", async () => {
      // Render the App inside act
      await act(async () => {
        render(<App />);
      });
    });

    then("the user should see up to 32 events", async () => {
      const events = await waitFor(() => screen.getAllByRole("listitem"));
      const expectedCount = Math.min(32, mockData.length);
      expect(events.length).toBe(expectedCount);
    });
  });

  test("User can change the number of events", ({ given, when, then }) => {
    let input;

    given("the user has opened the app", async () => {
      await act(async () => {
        render(<App />);
      });

      input = await screen.findByRole("spinbutton");
    });

    when('the user types "5" in the number of events input', async () => {
      await act(async () => {
        fireEvent.change(input, { target: { value: 5 } });
      });
    });

    then("the app should display 5 events", async () => {
      await waitFor(() => {
        const events = screen.getAllByRole("listitem");
        expect(events.length).toBe(5);
      });
    });
  });
});
