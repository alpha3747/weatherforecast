import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";

const SplashScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={["#1B1B3A", "#693E99"]} style={styles.container}>
      <Image
        style={styles.img}
        source={require("../assets/images/splash-img.png")}
      />
      <View style={styles.headings}>
        <Text style={styles.heading1}>Weather</Text>
        <Text style={styles.heading2}>Forecasts</Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnTxt}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    resizeMode: "contain",
  },
  headings: {
    flexDirection: "column",
    alignItems: "center",
    fontSize: 50,
    marginTop: 10,
    //    fontFamily: Platform.OS === "android" ? "sans-serif-light" : "Times New Roman",
    //    fontFamily: Platform.OS === "android" ? "sans-serif" : "Helvetica",
  },
  heading1: {
    color: "#FFF",
    fontSize: 70,
    fontWeight: "bold",
  },
  heading2: {
    color: "#DDB130",
    fontSize: 70,
  },
  btn: {
    backgroundColor: "#DDB130",
    width: 302,
    height: 72,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  btnTxt: {
    fontSize: 30,
    fontWeight: "500",
    color: "#1B1B3A",
  },
});

export default SplashScreen;
