import { useState, useEffect } from "react";
import { getEvents } from "./api";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  // eslint-disable-next-line no-unused-vars
  const [currentCity, setCurrentCity] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getEvents();
      setEvents(allEvents);
    };
    fetchEvents();
  }, []);

  const allLocations = [...new Set(events.map((event) => event.location))];
  const eventsToDisplay = events.slice(0, currentNOE);

  return (
    <div className="App">
      <h1>Meetup Events App</h1>
      <p>Find and explore upcoming events in your city</p>

      {/* Search for city */}
      <CitySearch locations={allLocations} onCityChange={setCurrentCity} />

      {/* Number of events input */}
      <NumberOfEvents number={currentNOE} onNumberChange={setCurrentNOE} />

      {/* Events list */}
      <EventList events={eventsToDisplay} />
    </div>
  );
}

export default App;
