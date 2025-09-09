import PropTypes from "prop-types";
import { useState } from "react";

import "./App.css";

function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  const eventStart = event.start?.dateTime
    ? new Date(event.start.dateTime).toLocaleString()
    : "Date not available";

  return (
    <div className="event">
      <h2 className="event-title">{event.summary}</h2>
      <p className="event-start">{eventStart}</p>
      <p className="event-location">
        {event.location || "Location not specified"}
      </p>
      <button
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide details" : "Show details"}
      </button>
      {showDetails && event.description && (
        <p className="event-description">{event.description}</p>
      )}
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
    created: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Event;
