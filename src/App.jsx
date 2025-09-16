import { useState, useEffect } from "react";
import { getEvents } from "./api";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/InfoAlert";
import CityEventsChart from "./components/CityEventsChart";
import EventGenresChart from "./components/EventGenresChart";

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

      if (!navigator.onLine) {
        setWarningText(
          "You are offline. The events shown may be from the cache and not up to date."
        );
      } else {
        setWarningText("");
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

    const handleOnline = () => setWarningText("");
    const handleOffline = () =>
      setWarningText(
        "You are offline. The events shown may be from the cache and not up to date."
      );

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Filter and limit events
  const filteredEvents =
    currentCity === "all"
      ? events
      : events.filter((event) => event.location === currentCity);
  const eventsToDisplay = filteredEvents.slice(0, currentNOE);

  const allLocations = [...new Set(events.map((e) => e.location))];

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
          locations={allLocations}
          onCityChange={setCurrentCity}
          setInfoAlert={setInfoAlert}
        />
        <NumberOfEvents
          number={currentNOE}
          onNumberChange={setCurrentNOE}
          setErrorAlert={setErrorText}
        />
      </div>

      {/* Charts container */}
      <div className="charts-container">
        <div className="chart-wrapper">
          <CityEventsChart
            allLocations={allLocations}
            events={eventsToDisplay}
          />
          <h3
            style={{ textAlign: "center", marginTop: "10px", color: "#8884d8" }}
          >
            Events
          </h3>
        </div>

        <div className="chart-wrapper">
          <EventGenresChart events={eventsToDisplay} />
          <h3
            style={{ textAlign: "center", marginTop: "10px", color: "#8884d8" }}
          >
            Event Genres
          </h3>
        </div>
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
