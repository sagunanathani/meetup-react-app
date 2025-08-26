import { useState } from "react";
import PropTypes from "prop-types";

function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="event">
      <h3>{event.title}</h3>
      <p>
        {event.date} - {event.city}
      </p>

      {showDetails && <p>{event.description}</p>}

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </div>
  );
}

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default Event;
