import PropTypes from "prop-types";
import "./App.css";

const NumberOfEvents = ({ number, onNumberChange }) => {
  const handleChange = (event) => {
    const value = Number(event.target.value);
    onNumberChange(value);
  };

  return (
    <div className="number-of-events">
      <label htmlFor="number-input">Number of events: </label>
      <input
        id="number-input"
        type="number"
        className="number"
        value={number}
        onChange={handleChange}
      />
    </div>
  );
};

NumberOfEvents.propTypes = {
  number: PropTypes.number.isRequired,
  onNumberChange: PropTypes.func.isRequired,
};

export default NumberOfEvents;
