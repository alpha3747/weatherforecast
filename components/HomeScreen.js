import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

// API
const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto";


const weatherIcons = {
  0: "https://openweathermap.org/img/wn/01d.png", // Clear sky
  1: "https://openweathermap.org/img/wn/02d.png", // Few clouds
  2: "https://openweathermap.org/img/wn/03d.png", // Scattered clouds
  3: "https://openweathermap.org/img/wn/04d.png", // Broken clouds
  45: "https://openweathermap.org/img/wn/50d.png", // Fog
  48: "https://openweathermap.org/img/wn/50n.png", // Fog
  51: "https://openweathermap.org/img/wn/09d.png", // Drizzle
  53: "https://openweathermap.org/img/wn/09d.png", // Drizzle
  55: "https://openweathermap.org/img/wn/09d.png", // Drizzle
  61: "https://openweathermap.org/img/wn/10d.png", // Rain showers
  63: "https://openweathermap.org/img/wn/10d.png", // Rain showers
  65: "https://openweathermap.org/img/wn/10d.png", // Rain showers
  80: "https://openweathermap.org/img/wn/11d.png", // Thunderstorm
  81: "https://openweathermap.org/img/wn/11d.png", // Thunderstorm
  82: "https://openweathermap.org/img/wn/11d.png", // Thunderstorm
};

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const formattedData = data.daily.time.map((date, index) => {
          const day = new Date(date).toLocaleDateString("en-GB", {
            weekday: "short", 
          });

          return {
            date: day,
            maxTemp: `${data.daily.temperature_2m_max[index]}°C`,
            minTemp: `${data.daily.temperature_2m_min[index]}°C`,
            icon:
              weatherIcons[data.daily.weathercode[index]] || weatherIcons[0],
          };
        });

        setWeatherData(formattedData);
        setSelectedDay(formattedData[0]); 
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
        <Text style={styles.loadingText}>Fetching Weather Data...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#1B1B3A", "#693E99"]} style={styles.container}>
      {/* Location Info */}
      <Text style={styles.cityCountry}>Berlin, Germany</Text>

      {/* Selected Day Weather */}
      {selectedDay && (
        <View style={styles.mainWeather}>
          <Image source={{ uri: selectedDay.icon }} style={styles.mainIcon} />
          <Text style={styles.date}>{selectedDay.date}</Text>
          <Text style={styles.tempRange}>
            Max: {selectedDay.maxTemp} | Min: {selectedDay.minTemp}
          </Text>
        </View>
      )}

      {/* Separator */}
      <View style={styles.separator}></View>

      {/* 15-Day Forecast */}
      <FlatList
        horizontal
        data={weatherData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedDay(item)}
            style={styles.forecastItem}
          >
            <Image source={{ uri: item.icon }} style={styles.forecastIcon} />
            <Text style={styles.forecastDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.forecastList}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: 18,
    color: "black",
    marginTop: 10,
  },
  cityCountry: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  mainWeather: {
    alignItems: "center",
    marginBottom: 20,
  },
  mainIcon: {
    width: 150,
    height: 150,
  },
  date: {
    fontSize: 20,
    color: "#fff",
    marginVertical: 5,
  },
  tempRange: {
    fontSize: 18,
    color: "#ddd",
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#ddd",
    marginVertical: 20,
  },
  forecastList: {
    paddingHorizontal: 20,
  },
  forecastItem: {
    alignItems: "center",
    padding: 10,
  },
  forecastIcon: {
    width: 60,
    height: 60,
  },
  forecastDate: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  weatherTipsContainer: {
    marginTop: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  weatherTipText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  weatherTip: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
  },
});

export default HomeScreen;
