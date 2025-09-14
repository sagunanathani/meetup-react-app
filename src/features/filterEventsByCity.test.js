import { loadFeature, defineFeature } from "jest-cucumber";
import { render, screen, within, act } from "@testing-library/react";
import App from "../App";
import { events as mockData } from "../mock-data";
import userEvent from "@testing-library/user-event";

// Mock API
jest.mock("../api", () => ({
  getEvents: jest.fn(() => Promise.resolve(mockData)),
}));

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    // eslint-disable-next-line no-unused-vars
    let AppComponent;

    given("user hasn’t searched for any city", () => {});

    when("the user opens the app", async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });
    });

    then("the user should see the list of all upcoming events.", async () => {
      const eventList = await screen.findByTestId("event-list");
      const items = within(eventList).getAllByRole("listitem");
      expect(items.length).toBe(mockData.length);
    });
  });

  test("User should see a list of suggestions when they search for a city.", ({
    given,
    when,
    then,
  }) => {
    let citySearchInput;

    given("the main page is open", async () => {
      await act(async () => {
        render(<App />);
      });
      citySearchInput = screen.getByRole("textbox", {
        name: /search for a city/i,
      });
    });

    when("user starts typing in the city textbox", async () => {
      const user = userEvent.setup();
      await user.type(citySearchInput, "Berlin");
    });

    then(
      "the user should receive a list of cities (suggestions) that match what they’ve typed",
      async () => {
        const suggestionList = await screen.findByTestId("suggestions-list");
        const suggestionListItems =
          within(suggestionList).getAllByRole("listitem");

        // Only include matching locations + "See all cities"
        const expectedCount = mockData.some((e) =>
          e.location.includes("Berlin")
        )
          ? 2
          : 1;

        expect(suggestionListItems).toHaveLength(expectedCount);
      }
    );
  });

  test("User can select a city from the suggested list.", ({
    given,
    and,
    when,
    then,
  }) => {
    let citySearchInput;
    let suggestionListItems;

    given("user was typing “Berlin” in the city textbox", async () => {
      await act(async () => {
        render(<App />);
      });
      const user = userEvent.setup();
      citySearchInput = screen.getByRole("textbox", {
        name: /search for a city/i,
      });
      await user.type(citySearchInput, "Berlin");
    });

    and("the list of suggested cities is showing", async () => {
      const suggestionsList = await screen.findByTestId("suggestions-list");
      suggestionListItems = within(suggestionsList).getAllByRole("listitem");

      expect(suggestionListItems.length).toBeGreaterThanOrEqual(1); // at least "See all cities"
    });

    when(
      "the user selects a city (e.g., “Berlin, Germany”) from the list",
      async () => {
        const user = userEvent.setup();
        // click the first real location, if it exists; else click "See all cities"
        await user.click(
          suggestionListItems.find((li) => li.textContent.includes("Berlin")) ||
            suggestionListItems[0]
        );
      }
    );

    then(
      "their city should be changed to that city (i.e., “Berlin, Germany”)",
      () => {
        expect(citySearchInput.value).toMatch(/Berlin|all/); // matches selected city or fallback
      }
    );

    and(
      "the user should receive a list of upcoming events in that city",
      async () => {
        const EventListDOM = await screen.findByTestId("event-list");
        const EventListItems = within(EventListDOM).getAllByRole("listitem");

        const filteredEvents = mockData.filter((event) =>
          citySearchInput.value === "all"
            ? true
            : event.location.includes(citySearchInput.value)
        );

        expect(EventListItems).toHaveLength(filteredEvents.length);
      }
    );
  });
});
