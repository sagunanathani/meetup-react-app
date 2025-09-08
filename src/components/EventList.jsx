import PropTypes from "prop-types";
import Event from "./Event";

function EventList({ events }) {
  return (
    <ul className="events-list">
      {events?.map(
        (event) =>
          event && (
            <li key={event.id}>
              <Event event={event} />
            </li>
          )
      )}
    </ul>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      summary: PropTypes.string.isRequired,
      location: PropTypes.string,
      start: PropTypes.shape({
        dateTime: PropTypes.string,
      }),
      created: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventList;
