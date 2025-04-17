// the api adress for openweathermap api
const BASE_URL =
  "https://api.openweathermap.org/data/3.0/onecall?exclude=minutely,hourly,alerts&units=metric";

export async function fetchWeeklyForecast(lat, lon) {
  const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;

  // sent api request to openweathermap api with lat and lon and get the forecast data
  const url = `${BASE_URL}&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  //send the data, json format
  const data = await response.json();
  //only first 7 days of the forecast
  return data.daily.slice(0, 7);
}
