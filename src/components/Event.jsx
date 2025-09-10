import PropTypes from "prop-types";
import { useState } from "react";

function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  const eventStart = event.start?.dateTime
    ? new Date(event.start.dateTime).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Date not available";

  return (
    <div className="event">
      <h3>{event.summary}</h3>
      <p>{eventStart}</p>
      <p>{event.location || "Location not specified"}</p>

      <button onClick={() => setShowDetails(!showDetails)}>
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
