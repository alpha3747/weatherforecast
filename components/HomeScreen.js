import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const weatherIcons = {
  0: "https://cdn-icons-png.flaticon.com/512/869/869869.png", // Clear
  1: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png", // Mainly clear
  2: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png", // Partly cloudy
  3: "https://cdn-icons-png.flaticon.com/512/1163/1163630.png", // Overcast
  61: "https://cdn-icons-png.flaticon.com/512/414/414974.png", // Rain
};

const WeatherScreen = () => {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=33.7215&longitude=73.0433&hourly=temperature_2m,precipitation,rain,showers,snowfall&forecast_days=14"
      );
      const data = await res.json();

      const daily = data.daily.time.map((date, index) => {
        const day = new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
        });
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        });

        return {
          id: index.toString(),
          date: formattedDate,
          day,
          tempMin: data.daily.temperature_2m_min[index],
          tempMax: data.daily.temperature_2m_max[index],
          icon: weatherIcons[data.daily.weathercode[index]] || weatherIcons[0],
        };
      });

      setDailyData(daily);
      setLoading(false);
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dailyData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.day}>{item.day}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <View>
              <Text style={styles.temp}>
                {item.tempMax}° / {item.tempMin}°
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 40,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    color: "#ccc",
    fontSize: 14,
  },
  icon: {
    width: 36,
    height: 36,
  },
  temp: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default WeatherScreen;
