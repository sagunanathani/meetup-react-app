import PropTypes from "prop-types";

import "./App.css";

const EventList = ({ events }) => {
  return (
    <ul data-testid="event-list">
      {events.map((event) => (
        <li key={event.id}>
          <div className="event">
            <h2 className="event-title">{event.summary}</h2>
            <p className="event-start">
              {new Date(event.start.dateTime).toLocaleString()}
            </p>
            <p className="event-location">{event.location}</p>
            <button className="details-btn">Show details</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      summary: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      start: PropTypes.shape({
        dateTime: PropTypes.string.isRequired,
      }).isRequired,
      created: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventList;
