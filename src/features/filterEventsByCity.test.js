import { loadFeature, defineFeature } from "jest-cucumber";
import { render, screen, within, act } from "@testing-library/react";
import App from "../App";
import { events as mockData } from "../mock-data";
import userEvent from "@testing-library/user-event";

// Mock API
jest.mock("../api", () => ({
  getEvents: jest.fn(() => Promise.resolve(mockData)),
}));

//loadFeature - used to load a Gherkin file
const feature = loadFeature("./src/features/filterEventsByCity.feature");

// defineFeature() - used to define the code for that file (feature)
defineFeature(feature, (test) => {
  test("When user hasn’t searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    // eslint-disable-next-line no-unused-vars
    let AppComponent;

    given("user hasn’t searched for any city", () => {
      // no setup needed
    });

    when("the user opens the app", async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });
    });

    then("the user should see the list of all upcoming events.", async () => {
      const eventList = await screen.findByTestId("event-list"); // waits until it exists
      const items = within(eventList).getAllByRole("listitem");
      // Assert that the rendered events match the mock data length
      expect(items.length).toBe(mockData.length);
    });
  });

  test("User should see a list of suggestions when they search for a city.", ({
    given,
    when,
    then,
  }) => {
    // eslint-disable-next-line no-unused-vars
    let AppComponent;
    let citySearchInput;

    given("the main page is open", async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });
      citySearchInput = screen.getByRole("textbox", { name: /city/i });
    });

    when("user starts typing in the city textbox", async () => {
      const user = userEvent.setup();
      await user.type(citySearchInput, "Berlin");
    });

    then(
      "the user should receive a list of cities (suggestions) that match what they’ve typed",
      async () => {
        const suggestionList = screen.getByTestId("suggestions-list"); // or use querySelector("#suggestions-list")
        const suggestionListItems =
          within(suggestionList).getAllByRole("listitem");
        expect(suggestionListItems).toHaveLength(2);
      }
    );
  });

  test("User can select a city from the suggested list.", ({
    given,
    and,
    when,
    then,
  }) => {
    // eslint-disable-next-line no-unused-vars
    let AppComponent;
    let citySearchInput;
    let suggestionListItems;

    given("user was typing “Berlin” in the city textbox", async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });
      const user = userEvent.setup();
      // Query the input using screen
      citySearchInput = screen.getByRole("textbox", { name: /city/i });
      await user.type(citySearchInput, "Berlin");
    });

    and("the list of suggested cities is showing", async () => {
      const suggestionsList = screen.getByTestId("suggestions-list"); // make sure ul has data-testid="suggestions-list"
      suggestionListItems = within(suggestionsList).getAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(2);
    });

    when(
      "the user selects a city (e.g., “Berlin, Germany”) from the list",
      async () => {
        const user = userEvent.setup();
        await user.click(suggestionListItems[0]);
      }
    );

    then(
      "their city should be changed to that city (i.e., “Berlin, Germany”)",
      () => {
        expect(citySearchInput.value).toBe("Berlin, Germany");
      }
    );

    and(
      "the user should receive a list of upcoming events in that city",
      async () => {
        // Use screen to find the event list by test id
        const EventListDOM = await screen.findByTestId("event-list");
        const EventListItems = within(EventListDOM).getAllByRole("listitem");

        const berlinEvents = mockData.filter(
          (event) => event.location === citySearchInput.value
        );

        expect(EventListItems).toHaveLength(berlinEvents.length);
      }
    );
  });
});
