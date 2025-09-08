import PropTypes from "prop-types";
import { useState } from "react";

function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="event">
      <h2 className="event-title">{event.summary}</h2>
      <p className="event-start">{event.created}</p>
      <p className="event-location">{event.location}</p>
      <button
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide details" : "Show details"}
      </button>
      {showDetails && <p className="event-description">{event.description}</p>}
    </div>
  );
}

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    summary: PropTypes.string.isRequired,
    location: PropTypes.string,
    start: PropTypes.shape({
      dateTime: PropTypes.string,
    }),
    created: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Event;
