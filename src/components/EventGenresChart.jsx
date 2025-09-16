import { useState, useEffect, useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import PropTypes from "prop-types";

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  // Memoized genres array to avoid unnecessary re-renders
  const genres = useMemo(
    () => ["React", "JavaScript", "Node", "jQuery", "Angular"],
    []
  );

  const colors = ["#DD0000", "#00DD00", "#0000DD", "#DDDD00", "#DD00DD"];

  useEffect(() => {
    if (events && Array.isArray(events)) {
      const chartData = genres.map((genre) => {
        const filteredEvents = events.filter((event) =>
          event.summary.includes(genre)
        );
        return {
          name: genre,
          value: filteredEvents.length,
        };
      });
      setData(chartData);
    }
  }, [events, genres]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

// PropTypes validation
EventGenresChart.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      summary: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventGenresChart;
