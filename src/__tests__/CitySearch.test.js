import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { cleanup } from "@testing-library/react";
const allLocations = ["Berlin, Germany", "Munich, Germany", "London, UK"];

describe("<CitySearch /> component", () => {
  const mockSetCity = jest.fn();

  beforeEach(() => {
    mockSetCity.mockClear();
    render(<CitySearch locations={allLocations} onCityChange={mockSetCity} />);
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
  });

  // New test: type a city not in locations
  test("shows only 'See all cities' when typing a city not in locations", async () => {
    await typeCityAndCheckSuggestions("NonExistentCity", ["See all cities"]);
  });

  // New test: typing the same city twice
  test("typing the same city twice maintains suggestions correctly", async () => {
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole("textbox", {
      name: /search for a city/i,
    });
    await user.click(cityTextBox);

    // First type
    await user.clear(cityTextBox);
    await user.type(cityTextBox, "Berlin");

    // Second type (same value)
    await user.clear(cityTextBox);
    await user.type(cityTextBox, "Berlin");

    const suggestionItems = await screen.findAllByRole("listitem");
    expect(suggestionItems).toHaveLength(2); // Berlin + See all cities
  });

  // New test: handles empty locations gracefully
  test("handles empty locations prop gracefully", async () => {
    cleanup(); // remove any previous renders
    const user = userEvent.setup();
    render(<CitySearch locations={[]} onCityChange={mockSetCity} />);
    const cityTextBox = screen.getByRole("textbox", {
      name: /search for a city/i,
    });
    await user.click(cityTextBox);
    await user.type(cityTextBox, "Berlin");

    const suggestionItems = await screen.findAllByRole("listitem");
    expect(suggestionItems).toHaveLength(1); // Only "See all cities"
    expect(suggestionItems[0]).toHaveTextContent("See all cities");
  });
});
