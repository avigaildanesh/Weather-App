//this is the forecast view component, it shows the forecast for the selected city
//it uses the city selector component to select the city and the weather chart component to show the forecast
import React, { useState, useEffect } from "react";
import CitySelector from "./CitySelector";
import WeatherChart from "./WeatherChart";
import { fetchWeeklyForecast } from "../api/openWeather";
import colors from "../theme/colors"; 

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function ForecastView() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecast, setForecast] = useState([]); //the forecast
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //loading data or not

  useEffect(() => { //when the selected city changes, fetch the forecast
    if (!selectedCity) return;

    const load = async () => {
      setLoading(true); //set loading to true
      setError(""); //no error
      try {
        const data = await fetchWeeklyForecast( //call the api to fetch the forecast
          //using lat and lon
          selectedCity.lat,
          selectedCity.lon
        );
        console.log("Forecast data:", data); //print for checking the information we have
        setForecast(data); //the forsecast data is set to the data we fetched
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedCity]); //do it if the selected city changes

  return (
    <>
      <CitySelector onSelect={setSelectedCity} /> {/*city selection page*/}

      {/*if loading is true, show the loading spinner*/}
      {loading && ( 
        <Box sx={{ mt: 2, justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )} {/*loading spinner, mt- margin top */}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error} {/*error message*/}
        </Typography>
      )}

      {/*if the forecast is not empty and the selected city is not null, show the chart*/}
      {forecast.length > 0 && selectedCity && (
        <>
          <Typography
            variant="h6"
            sx={{
              mt: 4,
              mb: 2,
              color: colors.forecastTitle, 
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Temperatures for the Upcoming Week&nbsp;
            <Box component="span" sx={{ fontWeight: "bold" }}>
              ({selectedCity.name}) {/*selected city name in ()*/}
            </Box>
          </Typography>

          <WeatherChart data={forecast} /> {/*bring to chart component the forecast*/}
        </>
      )}

      {/*if the forecast is empty and loading is false and error is false, show the message*/}
      {forecast.length === 0 && !loading && !error && (
        <Typography sx={{ mt: 4 }}>
          Select a city to view the forecast
        </Typography>
      )}
    </>
  );
}
