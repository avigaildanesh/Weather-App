/*
 let the user select a city from the list and pass the selected city to the parent component (forecastView.jsx) 
*/
import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { CITIES } from "../utils/cities";
import colors from "../theme/colors";

export default function CitySelector({ onSelect }) {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <Autocomplete   
      options={CITIES}
      getOptionLabel={(option) => option.name} // the options are the names of CITIES
      value={selectedCity} // the value that selected
      onChange={(_, newVal) => {
        setSelectedCity(newVal); // set the selected city to the new value
        if (newVal) onSelect(newVal); // call the onSelect function with the new value
        // it will do the function that passed from forecastView.jsx
        // (and after that forecastView will fetch the forecast)
      }}
      renderInput={(params) => (
        //select city at the top of the textfield
        <TextField {...params} label="Select a city" variant="outlined"  />
      )}
      sx={{
        width: 300,
        mx: "auto",
        mt: 4,
        backgroundColor: colors.glassBackground, 
      }}
    />
  );
}
