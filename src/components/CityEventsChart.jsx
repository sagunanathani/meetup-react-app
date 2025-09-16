import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!allLocations || !events) return;

    const data = allLocations.map((location) => {
      const count = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ")[0]; // only city name
      return { city, count };
    });

    setData(data);
  }, [events, allLocations]); // re-run when events/locations change

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="City" />
        <YAxis type="number" dataKey="count" name="Number of Events" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Events" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

CityEventsChart.propTypes = {
  allLocations: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
};

export default CityEventsChart;
