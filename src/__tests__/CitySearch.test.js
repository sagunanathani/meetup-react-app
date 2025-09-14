import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";

const allLocations = ["Berlin, Germany", "Munich, Germany", "London, UK"];

describe("<CitySearch /> component", () => {
  let mockSetCity;
  let mockSetInfoAlert;

  beforeEach(() => {
    mockSetCity = jest.fn();
    mockSetInfoAlert = jest.fn();

    render(
      <CitySearch
        locations={allLocations}
        onCityChange={mockSetCity}
        setInfoAlert={mockSetInfoAlert} // ✅ pass mock
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("renders text input with class 'city'", () => {
    const cityTextBox = screen.getByRole("textbox", {
      name: /search for a city/i,
    });
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    const suggestionList = screen.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  // Helper function to test suggestions
  const typeCityAndCheckSuggestions = async (
    inputValue,
    expectedSuggestions
  ) => {
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole("textbox", {
      name: /search for a city/i,
    });
    await user.click(cityTextBox);
    await user.clear(cityTextBox);
    await user.type(cityTextBox, inputValue);

    const suggestionItems = await screen.findAllByRole("listitem");
    expect(suggestionItems).toHaveLength(expectedSuggestions.length);

    expectedSuggestions.forEach((text, index) => {
      expect(suggestionItems[index]).toHaveTextContent(text);
    });
  };

  test.each([
    ["Berlin", ["Berlin, Germany", "See all cities"]],
    ["Paris", ["See all cities"]],
  ])(
    "shows correct suggestions when typing '%s'",
    async (inputValue, expectedSuggestions) => {
      await typeCityAndCheckSuggestions(inputValue, expectedSuggestions);
    }
  );

  test("updates textbox value when suggestion is clicked", async () => {
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole("textbox", {
      name: /search for a city/i,
    });
    await user.click(cityTextBox);

    const berlinSuggestion = screen.getByText("Berlin, Germany");
    await user.click(berlinSuggestion);

    expect(cityTextBox).toHaveValue("Berlin, Germany");
    expect(mockSetCity).toHaveBeenCalledWith("Berlin, Germany");
    expect(mockSetInfoAlert).toHaveBeenCalledWith(""); // alert cleared
  });

  test("selecting 'See all cities' updates the textbox value", async () => {
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole("textbox", {
      name: /search for a city/i,
    });
    await user.click(cityTextBox);

    const seeAllCities = screen.getByText(/See all cities/i);
    await user.click(seeAllCities);

    expect(cityTextBox).toHaveValue("all");
    expect(mockSetCity).toHaveBeenCalledWith("all");
    expect(mockSetInfoAlert).toHaveBeenCalledWith(""); // alert cleared
  });

  test("shows info alert when typing a city not in locations", async () => {
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole("textbox", {
      name: /search for a city/i,
    });
    await user.click(cityTextBox);
    await user.clear(cityTextBox);
    await user.type(cityTextBox, "NonExistentCity");

    expect(mockSetInfoAlert).toHaveBeenCalledWith(
      "We can not find the city you are looking for. Please try another city"
    );
  });

  test("typing the same city twice maintains suggestions correctly", async () => {
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole("textbox", {
      name: /search for a city/i,
    });
    await user.click(cityTextBox);

    await user.clear(cityTextBox);
    await user.type(cityTextBox, "Berlin");

    await user.clear(cityTextBox);
    await user.type(cityTextBox, "Berlin");

    const suggestionItems = await screen.findAllByRole("listitem");
    expect(suggestionItems).toHaveLength(2); // Berlin + See all cities
  });

  test("handles empty locations prop gracefully", async () => {
    cleanup();
    const user = userEvent.setup();

    render(
      <CitySearch
        locations={[]} // empty array
        onCityChange={jest.fn()}
        setInfoAlert={mockSetInfoAlert} // must pass mock
      />
    );

    const cityTextBox = screen.getByRole("textbox", {
      name: /search for a city/i,
    });

    await user.click(cityTextBox);
    await user.type(cityTextBox, "Berlin"); // type once

    const suggestionItems = await screen.findAllByRole("listitem");

    // Only "See all cities" should be rendered
    expect(suggestionItems).toHaveLength(1);
    expect(suggestionItems[0]).toHaveTextContent("See all cities");

    // Alert should be called because the city is not found
    expect(mockSetInfoAlert).toHaveBeenCalledWith(
      "We can not find the city you are looking for. Please try another city"
    );
  });
});
