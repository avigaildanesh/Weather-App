import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ForecastView from "./components/ForecastView";
import MonaImg from "./components/MonaImg";
import colors from "./theme/colors";

export default function App() {
  return (
    // wrap all of the screen, the height of the page
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/*wrap the background image and the information*/}
      <Box
        sx={{
          height: "100%",
          backgroundImage: `url("https://www.picshare.co.il/m_pictures/img49130.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          display: "flex",
          pt: 6,
        }}
      >
        <Container sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: colors.textPureWhite,
              background: colors.textGradientBase,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            Weekly Weather Forecast
          </Typography>
          <ForecastView />
          <MonaImg />
        </Container>
      </Box>
    </Box>
  );
}
