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

const IMAGES = [
  {
    file: require("../../assets/images/clear-day.png"),
  },
  {
    file: require("../../assets/images/clear-night.png"),
  },
  {
    file: require("../../assets/images/cloudy.png"),
  },
  {
    file: require("../../assets/images/fog.png"),
  },
  {
    file: require("../../assets/images/partly-cloudy-day.png"),
  },
  {
    file: require("../../assets/images/partly-cloudy-night.png"),
  },
  {
    file: require("../../assets/images/rain.png"),
  },
  {
    file: require("../../assets/images/sleet.png"),
  },
  {
    file: require("../../assets/images/snow.png"),
  },

  {
    file: require("../../assets/images/sunny.png"),
  },
  {
    file: require("../../assets/images/wind.png"),
  },
];

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

    var i = 0;
    switch (weatherData.forecast?.currently?.icon) {
      case "clear-day": {
        i = 0;
        break;
      }

      case "clear-night": {
        i = 1;
        break;
      }

      case "cloudy": {
        i = 2;
        break;
      }

      case "fog": {
        i = 3;
        break;
      }

      case "partly-cloudy-day": {
        i = 4;
        break;
      }

      case "partly-cloudy-night": {
        i = 5;
        break;
      }

      case "rain": {
        i = 6;
        break;
      }

      case "sleet": {
        i = 7;
        break;
      }

      case "snow": {
        i = 8;
        break;
      }

      case "sunny": {
        i = 9;
        break;
      }

      case "wind": {
        i = 10;
        break;
      }

      default: {
        i = 0;
        break;
      }
    }
    setIcon(IMAGES[i].file);
  }, [weatherData]);

  const [temp, setTemp] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);
  const [summary, setSummary] = useState("");
  const [weekSummary, setWeekSummary] = useState("");
  const [icon, setIcon] = useState(null);

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      contentContainerStyle={styles.screen}
    >
      <Card style={styles.card}>
        <View style={styles.cardColumn}>
          <Text style={styles.title}>Acum</Text>
          <Text>Ziua: {max}° ↑</Text>
          <Text>Noaptea: {min}° ↓</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 48 }}>{temp}</Text>
            <Text style={{ fontSize: 20 }}> °C</Text>
          </View>

          <Text>
            Se simt ca {feelsLike} {feelsLike == 1 ? "grad" : "grade"}
          </Text>
        </View>
        <View style={styles.cardColumn}>
          <Image source={icon} style={styles.image} />
          <Text>{summary}</Text>
        </View>
      </Card>
      <Card style={styles.cardSmall}>
        <Text style={{ ...styles.title, marginBottom: 5 }}>Săptămâna asta</Text>
        <Text>{weekSummary}</Text>
      </Card>
    </ScrollView>
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
    marginTop: 15,
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
