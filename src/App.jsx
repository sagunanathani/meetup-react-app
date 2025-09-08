// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { mockEvents } from "./mockEvent";

// Helper to extract unique locations
const extractLocations = (events) => {
  const locations = events.map((event) => event.location).filter(Boolean);
  return [...new Set(locations)];
};

function App() {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32); // default
  const [currentCity, setCurrentCity] = useState("all");

  useEffect(() => {
    let filteredEvents = mockEvents;

    if (currentCity !== "all") {
      filteredEvents = mockEvents.filter(
        (event) => event.location === currentCity
      );
    }

    setEvents(filteredEvents.slice(0, numberOfEvents));
    setLocations(extractLocations(mockEvents));
  }, [currentCity, numberOfEvents]);

  const handleCityChange = (city) => setCurrentCity(city);
  const handleNumberChange = (number) => setNumberOfEvents(number);

  return (
    <div className="App">
      <CitySearch
        allLocations={locations}
        onCityChange={handleCityChange}
        data-testid="city-search"
      />
      <NumberOfEvents
        number={numberOfEvents}
        onNumberChange={handleNumberChange}
        data-testid="number-of-events"
      />
      <h1>Meetup Events</h1>
      <EventList events={events} data-testid="event-list" />
    </div>
  );
}

export default App;
