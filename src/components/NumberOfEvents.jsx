import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const NumberOfEvents = ({ number, onNumberChange, setErrorAlert }) => {
  const [inputValue, setInputValue] = useState(number.toString());

  // Sync internal state if parent value changes
  useEffect(() => {
    setInputValue(number.toString());
  }, [number]);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const numericValue = parseInt(value, 10);

    if (isNaN(numericValue) || numericValue <= 0) {
      setErrorAlert("Please enter a valid number of events");
    } else {
      setErrorAlert("");
      onNumberChange(numericValue);
    }
  };

  return (
    <div className="number-of-events">
      <label htmlFor="number-input">Number of events: </label>
      <input
        id="number-input"
        type="number"
        className="input"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

NumberOfEvents.propTypes = {
  number: PropTypes.number.isRequired,
  onNumberChange: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};

export default NumberOfEvents;
