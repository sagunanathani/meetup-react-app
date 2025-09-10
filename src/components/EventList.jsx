import PropTypes from "prop-types";
import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <ul className="events-container" data-testid="event-list">
      {events.map((event) => (
        <li key={event.id}>
          <Event event={event} />
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
      location: PropTypes.string,
      start: PropTypes.shape({
        dateTime: PropTypes.string,
      }),
      created: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default EventList;
