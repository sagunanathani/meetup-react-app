// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import PropTypes from "prop-types";

class NumberOfEvents extends Component {
  state = {
    number: this.props.number || 32, // default number
  };

  handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      this.setState({ number: value });
      this.props.onNumberChange(value); // use correct prop
    }
  };

  render() {
    return (
      <div className="number-of-events">
        <input
          type="number"
          value={this.state.number}
          onChange={this.handleChange}
          min="1"
        />
      </div>
    );
  }
}

NumberOfEvents.propTypes = {
  number: PropTypes.number,
  onNumberChange: PropTypes.func.isRequired,
};

export default NumberOfEvents;
