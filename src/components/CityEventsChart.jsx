import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import PropTypes from "prop-types";

const CityEventsChart = ({ allLocations, events }) => {
  // Define colors for the scatter points
  const colors = ["#8884d8", "#82ca9d", "#ff8042", "#ffbb28", "#00c49f"];

  // Prepare data for the chart
  const getData = () => {
    return allLocations.map((location) => {
      const count = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(/, | - /)[0]; // shorten labels if needed
      return { city, count };
    });
  };

  const data = getData();

  return (
    <div>
      <ResponsiveContainer width="99%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 60,
            left: -30,
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
          <Scatter data={data}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

CityEventsChart.propTypes = {
  allLocations: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
};

export default CityEventsChart;
