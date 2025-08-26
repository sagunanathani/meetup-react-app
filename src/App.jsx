import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import "./App.css";

const mockEvents = [
  {
    id: 1,
    title: "React Meetup",
    city: "Berlin",
    date: "2025-09-01",
    description: "Learn React with others.",
  },
  {
    id: 2,
    title: "JavaScript Conference",
    city: "Munich",
    date: "2025-09-10",
    description: "All about JS.",
  },
];

function App() {
  return (
    <div className="App">
      <h1>📅 Meetup Events App</h1>
      <p>Find and explore upcoming events in your city</p>

      <CitySearch />
      <NumberOfEvents />
      <EventList events={mockEvents} />
    </div>
  );
}

export default App;
