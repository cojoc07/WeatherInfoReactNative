import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../../components/Card";

import { useSelector } from "react-redux";

const Today = () => {
  const weatherData = useSelector((state) => state.forecast);

  useEffect(() => {
    setTemp(Math.round(Number(weatherData.forecast.currently?.temperature)));
    setMin(
      Math.round(Number(weatherData.forecast.daily?.data[0].temperatureLow))
    );
    setMax(
      Math.round(Number(weatherData.forecast.daily?.data[0].temperatureHigh))
    );
    setFeelsLike(
      Math.round(Number(weatherData.forecast.currently?.apparentTemperature))
    );
    setSummary(weatherData.forecast.currently?.summary.toUpperCase());
    setWeekSummary(weatherData.forecast.daily?.summary);
  }, [weatherData]);

  const [temp, setTemp] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);
  const [summary, setSummary] = useState("");
  const [weekSummary, setWeekSummary] = useState("");

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        keyboardShouldPersistTaps="never"
        style={{ width: "100%", height: "100%" }}
      >
        <Card style={styles.card}>
          <View style={styles.cardColumn}>
            <Text style={styles.title}>Acum</Text>
            <Text>Ziua: {min}° ↑</Text>
            <Text>Noaptea: {max}° ↓</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 48 }}>{temp}</Text>
              <Text style={{ fontSize: 20 }}> °C</Text>
            </View>

            <Text>
              Se simt ca {feelsLike} {feelsLike == 1 ? "grad" : "grade"}
            </Text>
          </View>
          <View style={styles.cardColumn}>
            <Image
              source={require("../../assets/images/cloudy.png")}
              style={styles.image}
            />
            <Text>{summary}</Text>
          </View>
        </Card>
        <Card style={styles.cardSmall}>
          <Text style={{ ...styles.title, marginBottom: 5 }}>
            Săptămâna asta
          </Text>
          <Text>{weekSummary}</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    marginTop: 70,
    margin: 15,
    width: "95%",
    height: 200,
  },
  cardColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    margin: 15,
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "center",
  },
  cardSmall: {
    marginTop: 5,
    margin: 15,
    padding: 15,
    width: "95%",
  },
  title: {
    fontFamily: "open-sans",
    fontWeight: "bold",
    fontSize: 18,
    color: "#0d47a1",
  },
});

export default Today;
