/**
  component to show the date and the icon of each day down the chart
  needed because we have 2 chart types - bar and line (and the date moves right and left when we change the chart type)
*/
import React from "react";

export default function DateWithIcons({ x, y, payload, chartData, colors }) {
  const matchingDay = chartData.find((d) => d.date === payload.value);
  const icon = matchingDay?.icon;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={13}
        textAnchor="middle"
        fill="#333"
        fontSize={12}
      >
        {payload.value}
      </text>

      {icon && (
        <image
          href={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          x={-12}
          y={28}
          width={30}
          height={30}
          style={{ opacity: colors.iconOpacity }}
        />
      )}
    </g>
  );
}
