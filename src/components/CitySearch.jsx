import { Component } from "react";
import PropTypes from "prop-types";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
  };

  handleInputChanged = (event) => {
    const query = event.target.value;

    const suggestions =
      this.props.locations?.filter((location) =>
        location.toLowerCase().includes(query.toLowerCase())
      ) ?? [];

    if (
      query !== this.state.query ||
      suggestions.length !== this.state.suggestions.length
    ) {
      this.setState({ query, suggestions });
    }
  };

  handleSuggestionClicked = (suggestion) => {
    const selectedCity = suggestion === "See all cities" ? "all" : suggestion;
    this.setState({ query: selectedCity, suggestions: [] });
    this.props.onCityChange(selectedCity);
  };

  render() {
    const { query, suggestions } = this.state;
    const showSuggestions = query.length > 0 || suggestions.length > 0;

    return (
      <div className="city-search">
        <label htmlFor="city-search">Search for a city:</label>
        <input
          id="city-search"
          className="city"
          type="text"
          placeholder="Search for a city"
          role="textbox"
          value={query}
          onChange={this.handleInputChanged}
          onFocus={this.handleInputChanged}
        />
        {showSuggestions && (
          <ul
            className="suggestions"
            id="suggestions-list"
            data-testid="suggestions-list"
            role="list"
          >
            {suggestions.map((location, index) => (
              <li
                role="listitem"
                key={index}
                onClick={() => this.handleSuggestionClicked(location)}
              >
                {location}
              </li>
            ))}
            <li
              role="listitem"
              onClick={() => this.handleSuggestionClicked("See all cities")}
            >
              See all cities
            </li>
          </ul>
        )}
      </div>
    );
  }
}

CitySearch.propTypes = {
  locations: PropTypes.array.isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default CitySearch;
