import { useState, useEffect } from "react";
import { getEvents } from "./api";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/InfoAlert";

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [currentCity, setCurrentCity] = useState("all");
  const [loading, setLoading] = useState(true);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorText, setErrorText] = useState("");
  const [warningText, setWarningText] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      // check online/offline status
      if (navigator.onLine) {
        setWarningText("");
      } else {
        console.console.log("Offline mode activated");
        setWarningText(
          "You are offline. Events are loaded from cache and may not be up to date."
        );
      }

      try {
        const allEvents = await getEvents();
        setEvents(allEvents || []);
      } catch (error) {
        setErrorText("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentCity, currentNOE]); // ✅ re-check warning + fetch when filters change

  const filteredEvents =
    currentCity === "all"
      ? events
      : events.filter((event) => event.location === currentCity);

  const eventsToDisplay = filteredEvents.slice(0, currentNOE);

  return (
    <div className="App">
      <h1>Meetup Events App</h1>
      <p className="subtitle">Find and explore upcoming events in your city</p>

      <div className="alerts-container">
        {infoAlert && <InfoAlert text={infoAlert} />}
        {errorText && <ErrorAlert text={errorText} />}
        {warningText && <WarningAlert text={warningText} />}
      </div>

      <div className="controls">
        <CitySearch
          locations={[...new Set(events.map((e) => e.location))]}
          onCityChange={setCurrentCity}
          setInfoAlert={setInfoAlert}
        />
        <NumberOfEvents
          number={currentNOE}
          onNumberChange={setCurrentNOE}
          setErrorAlert={setErrorText}
        />
      </div>

      {loading && <p className="loading">Loading events...</p>}

      {!loading && eventsToDisplay.length > 0 && (
        <EventList events={eventsToDisplay} />
      )}

      {!loading && eventsToDisplay.length === 0 && (
        <p className="no-events">No events found for this city.</p>
      )}
    </div>
  );
}

export default App;
