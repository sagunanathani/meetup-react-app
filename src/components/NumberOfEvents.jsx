import { useState } from "react";

function NumberOfEvents() {
  const [numEvents, setNumEvents] = useState(32);

  return (
    <div>
      <label>
        Number of events:
        <input
          type="number"
          value={numEvents}
          onChange={(e) => setNumEvents(e.target.value)}
        />
      </label>
    </div>
  );
}

export default NumberOfEvents;
