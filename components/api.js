import React, { useState } from "react";
import { Button, Text, ToastAndroid, View } from "react-native";

const Api = () => {
  const [weather, setWeather] = useState(null);

  const weatherData = async () => {
    try {
      const response = await fetch(
        // "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timezone=auto"
        "https://api.open-meteo.com/v1/forecast?latitude=33.7215&longitude=73.0433&hourly=temperature_2m,precipitation,rain,showers,snowfall&forecast_days=14"
      );
      const data = await response.json();
      return data.hourly.temperature_2m;
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        "Unable to fetch weather data. Please try again later."
      );
    }
  };

  const handleFetch = async () => {
    const data = await weatherData();
    setWeather(data.hourly);
    console.log("fetched weatherData: ", data);
  };

  return (
    <View>
      <Button title="fetch data" onPress={handleFetch} />
    </View>
  );
};

export default Api;
