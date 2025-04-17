import React from "react";
import { Box } from "@mui/material";
import colors from "../theme/colors";

//the icon row component, get the icons from https://openweathermap.org/img/wn/${d.icon}@2x.png
export default function IconRow({ data, size = 32, alt = "weather icon" }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 1,
        mx: "-30px",
        transform: "translateY(-8px)",
      }}
    >
      {data.map((d, idx) => (
        <Box
          key={idx}
          sx={{
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 0,
          }}
        >
          {d.icon && (
            <Box
              component="img"
              //the icon from openweathermap api for example: https://openweathermap.org/img/wn/01d@2x.png for sunny day
              src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`}
              alt={alt}
              sx={{
                width: size,
                height: size,
                objectFit: "contain",
                pointerEvents: "none",
                opacity: colors.iconOpacity,
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
