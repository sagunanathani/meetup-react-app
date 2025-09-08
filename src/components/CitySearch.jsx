import { useState } from "react";
import PropTypes from "prop-types";

const CitySearch = ({ allLocations, onCityChange }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) =>
          location.toUpperCase().includes(value.toUpperCase())
        )
      : [];
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    if (onCityChange) onCityChange(value === "See all cities" ? "all" : value);
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        aria-label="city"
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
        data-testid="city-input"
      />
      {showSuggestions && (
        <ul className="suggestions" data-testid="suggestions-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={handleItemClicked}
              data-testid="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
          <li
            key="See all cities"
            onClick={handleItemClicked}
            data-testid="see-all-cities"
          >
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

CitySearch.propTypes = {
  allLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCityChange: PropTypes.func,
};

export default CitySearch;
