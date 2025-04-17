import React from "react";
import { Box } from "@mui/material";

export default function MonaImg() {
  return (
    <Box
      component="img"
      src="mona_labs_logo.png"
      alt="mona png"
      sx={{
        position: "absolute",
        bottom: 20,
        left: 20,
        width: 120,
        opacity: 0.8,
      }}
    />
  );
}
