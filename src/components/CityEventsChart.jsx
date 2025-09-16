import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import PropTypes from "prop-types";

const CityEventsChart = ({ allLocations, events }) => {
  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(/, | - /)[0]; // fix long labels
      return { city, count };
    });
    return data;
  };

  const data = getData();

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60, // extra space // was 20, now 60 to make room for labels
          left: -30, // tighter alignment - remove empty space on left
        }}
      >
        <CartesianGrid />
        <XAxis
          type="category"
          dataKey="city"
          name="City"
          angle={60}
          interval={0}
          tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
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
