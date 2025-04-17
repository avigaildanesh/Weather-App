// src/components/WeatherChart.jsx
import React, { useState } from "react";
import colors from "../theme/colors";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { Box, Button, useTheme } from "@mui/material";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import CustomTooltip from "./CustomTooltip";
import IconRow from "./IconRow";

export default function WeatherChart({ data }) {
  const theme = useTheme();
  const [showBar, setShowBar] = useState(false); // toggle between line and bar chart

  //if there is no data to present, return null
  if (!Array.isArray(data) || data.length === 0) return null;

  //map the data to the format that the chart needs
  const chartData = data.map((d) => ({
    date: format(new Date(d.dt * 1000), "EEE dd/MM", { locale: enUS }), // num of sec that pased since 1970 converted to milliseconds
    temp: Math.round(d.temp.day),
    temp_min: Math.round(d.temp.min),
    temp_max: Math.round(d.temp.max),
    icon: d.weather[0]?.icon,
    wind_speed: +(d.wind_speed * 3.6).toFixed(1), // 1 m/s = 3.6 km/h because in one hour there are 3600 seconds
    // + convert from string to number
    pop: d.pop,
    summary: d.summary ?? d.weather?.[0]?.description ?? "",
    //if there is no summary, use the description of the weather, if there is no description, use an empty string
    // ?? - if the first value is null or undefined, use the second value
  }));

  const renderChart = (isBar) => {
    const ChartComponent = isBar ? BarChart : LineChart; // from rechart library
    const DataElement = isBar ? (
      <Bar dataKey="temp" fill={colors.chartMain} /> // if we need to show bar chart, use Bar component
    ) : (
      <Line
        type="monotone"
        dataKey="temp" // data to show in the chart
        stroke={colors.chartMain} // color of the line
        strokeWidth={2.5} 
        minPointSize = {5} // minimum size of the point
        // label - show the 
        // value of the point on the line- 30c for example
        label={{
          position: "top",
          fontSize: 14,
          fill: colors.chartMain,
          formatter: (value) => `${value}°`,
          
          dy: -14,
        }}
      />
    );

    return (
      <ChartComponent
        data={chartData}
        margin={{ top: 30, right: 30, bottom: 5, left: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGrid} /> {/*grid lines inside the chart*/}

        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, dx: 20, dy: 8 }}
          textAnchor="end"
          height={50}
        >
          <Label
            value="Date"
            position="insideBottom"
            dx={-10}
            style={{
              fill: theme.palette.text.secondary,
              fontSize: 16,
            }}
          />
        </XAxis>

        <YAxis
          tick={{ fontSize: 12 }}
          width={45}
          tickFormatter={(v) => `${v}°`}
        >
          <Label
            value="Temperature (°C)"
            angle={-90}
            position="outsideLeft"
            dx={-20}
            dy={-10}
            style={{
              fill: theme.palette.text.secondary,
              fontSize: 16,
            }}
          />
        </YAxis>

        <Tooltip content={<CustomTooltip />} />
        {DataElement} {/*show the data in the chart*/}
      </ChartComponent>
    );
  };

  return (
    <Box
    // influence the chart, icons and button
      sx={{
        mt: 4,
        width: "100%",
        height: 370,
        borderRadius: 2,
        boxShadow: 2,
        px: 3,
        py: 2,
        backgroundColor: colors.primary,
        backdropFilter: "blur(4px)",
      }}
    >
      {/* show the chart */}
      <ResponsiveContainer width="100%" height="80%">
        {renderChart(showBar)}
      </ResponsiveContainer>
      {/* show the icons below the chart */}
      <IconRow data={chartData} />
      <Box sx={{ textAlign: "center", mt: 6 }}>
        {/* button to toggle between line and bar chart */}
        <Button
          variant="contained"
          size="small"
          onClick={() => setShowBar((prev) => !prev)}
        >
          {showBar ? "Show Line Chart" : "Show Bar Chart"}
        </Button>
      </Box>
    </Box>
  );
}
