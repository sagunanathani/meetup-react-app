import { useState, useEffect } from "react";
import { getEvents } from "./api";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import { events as mockEvents } from "./mock-data";
import process from "process";

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [currentCity, setCurrentCity] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      try {
        const allEvents =
          process.env.REACT_APP_USE_MOCK === "true"
            ? mockEvents
            : await getEvents();
        console.log("Mock events in app:", mockEvents);
        setEvents(allEvents || []); // fallback to empty array
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Get unique city locations for the CitySearch component
  // Prevent map from running if events is undefined
  const allLocations = events?.length
    ? [...new Set(events.map((e) => e.location))]
    : [];

  // Filter events by city
  const filteredEvents =
    currentCity === "all"
      ? events
      : events.filter((event) => event.location === currentCity);

  // Limit events based on NumberOfEvents input
  const eventsToDisplay = filteredEvents.slice(0, currentNOE);

  return (
    <div className="App">
      <h1>Meetup Events App</h1>
      <p className="subtitle">Find and explore upcoming events in your city</p>

      {/* Controls */}
      <div className="controls">
        <CitySearch locations={allLocations} onCityChange={setCurrentCity} />
        <NumberOfEvents number={currentNOE} onNumberChange={setCurrentNOE} />
      </div>

      {/* Loading state */}
      {loading && <p className="loading">Loading events...</p>}

      {/* Event list */}
      {!loading && eventsToDisplay.length > 0 && (
        <EventList events={eventsToDisplay} />
      )}

      {/* No events message */}
      {!loading && eventsToDisplay.length === 0 && (
        <p className="no-events">No events found for this city.</p>
      )}
    </div>
  );
}

export default App;
