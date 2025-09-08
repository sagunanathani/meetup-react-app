import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import mockData from "../mock-data";
import { extractLocations } from "../api";

describe("<CitySearch /> component", () => {
  const allLocations = extractLocations(mockData);
  // eslint-disable-next-line no-unused-vars
  let CitySearchComponent;

  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={allLocations} />);
  });

  test("renders text input", () => {
    const cityTextBox = screen.getByRole("textbox", { name: /city/i });
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    const suggestionList = screen.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders suggestions list when input gains focus", async () => {
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole("textbox", { name: /city/i });
    await user.click(cityTextBox);

    const suggestionList = screen.getByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test("updates suggestions correctly when typing in textbox", async () => {
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole("textbox", { name: /city/i });
    await user.type(cityTextBox, "Berlin");

    const suggestions = allLocations.filter((location) =>
      location.toUpperCase().includes("BERLIN")
    );

    const suggestionItems = screen.getAllByRole("listitem");
    expect(suggestionItems).toHaveLength(suggestions.length + 1); // +1 for "See all cities"

    suggestions.forEach((location, index) => {
      expect(suggestionItems[index].textContent).toBe(location);
    });
  });

  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole("textbox", { name: /city/i });
    await user.type(cityTextBox, "Berlin");

    const berlinSuggestion = screen.getAllByRole("listitem")[0];
    await user.click(berlinSuggestion);

    expect(cityTextBox).toHaveValue(berlinSuggestion.textContent);
  });

  test("selecting 'See all cities' updates the textbox value", async () => {
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole("textbox", { name: /city/i });
    await user.click(cityTextBox);

    const seeAllCities = screen.getByText(/See all cities/i);
    await user.click(seeAllCities);

    expect(cityTextBox).toHaveValue("See all cities");
  });
});
