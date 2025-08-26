import Event from "./Event";
import PropTypes from "prop-types";

function EventList({ events }) {
  return (
    <div>
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default EventList;
