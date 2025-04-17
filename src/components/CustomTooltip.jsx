import React from "react";
import { Box } from "@mui/material";
import colors from "../theme/colors"; 

//rechart sending the props to the tooltip
/* active - is the user on the graph
   payload - in payload we have the information we need to show in the tooltip
   label - the label of the tooltip (date)
*/
export default function CustomTooltip({ active, payload, label }) {
  // Check if the tooltip is active and has data
  if (!active || !payload || payload.length === 0) return null;

  const {
    temp_min,
    temp_max,
    wind_speed,
    pop,
    summary,
  } = payload[0].payload;

  return (
    <Box
      sx={{
        backgroundColor: colors.tooltipBackground, 
        p: 1.5,
        borderRadius: 2,
        fontSize: 13,
        textAlign: "center",
        maxWidth: 250,        
      }}
    >
      <strong>{label}</strong>
      <div>min {temp_min} ° ↕️ max {temp_max} °</div>
      <div> 🍃 Wind speed: {wind_speed} km/h</div>
      <div> 🌧️ Chance of precipitation: {Math.round(pop * 100)}%</div>
      {summary && <div> 🗒️ {summary}</div>}
    </Box>
  );
}
