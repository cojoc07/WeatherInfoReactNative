import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import moment from "moment";

const Tomorrow = () => {
  const weatherData = useSelector((state) => state.forecast);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [summary, setSummary] = useState("");
  const [pres, setPres] = useState(0);
  const [hum, setHum] = useState(0);
  const [precChance, setPrecChance] = useState("");
  const [precType, setPrecType] = useState("");
  const [apparentMin, setApparentMin] = useState(0);
  const [apparentMax, setApparentMax] = useState(0);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  useEffect(() => {
    setMin(
      Math.round(Number(weatherData.forecast.daily?.data[1]?.temperatureLow))
    );
    setMax(
      Math.round(Number(weatherData.forecast.daily?.data[1]?.temperatureHigh))
    );
    setSummary(weatherData.forecast.daily?.data[1]?.summary);

    setPres(Math.round(Number(weatherData.forecast.daily?.data[1]?.pressure)));
    setHum(Math.round(Number(weatherData.forecast.daily?.data[1]?.humidity)));
    setPrecChance(
      Math.round(Number(weatherData.forecast.daily?.data[1]?.precipProbability))
    );
    setPrecType(
      weatherData.forecast.daily?.data[1]?.precipType == "snow"
        ? "Ninsoare"
        : "Ploaie"
    );
    setApparentMin(
      Math.round(
        Number(weatherData.forecast.daily?.data[1]?.apparentTemperatureLow)
      )
    );
    setApparentMax(
      Math.round(
        Number(weatherData.forecast.daily?.data[1]?.apparentTemperatureHigh)
      )
    );
    setSunrise(weatherData.forecast.daily?.data[1]?.sunriseTime);
    setSunset(weatherData.forecast.daily?.data[1]?.sunsetTime);
  }, [weatherData]);

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      keyboardShouldPersistTaps="never"
      style={{ width: "100%", height: "100%" }}
    >
      <Card style={styles.card}>
        <View style={styles.cardColumnLeft}>
          <Text style={styles.heading}>Ziua: {max}° ↑</Text>
          <Text style={styles.heading}>Noaptea: {min}° ↓</Text>
          <Text style={{ marginTop: 15 }}>{summary}</Text>
        </View>
        <View style={styles.cardColumnRight}>
          <Image
            source={require("../../assets/images/cloudy.png")}
            style={styles.image}
          />
        </View>
      </Card>

      <Card style={styles.cardSmall}>
        <View style={{ flex: 1 }}>
          <Text style={{ ...styles.title, marginBottom: 5 }}>DETALII</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.cardColumnLeftSmall}>
              <Text>Presiune atmosferică</Text>
              <Text>Umiditate</Text>
              <Text>Șanse de precipitații</Text>
              <Text>Tip de precipitații</Text>
              <Text>Temperatura minimă resimțită</Text>
              <Text>Temperatura maximă resimțită</Text>
              <Text>Răsărit</Text>
              <Text>Apus</Text>
            </View>
            <View style={styles.cardColumnRightSmall}>
              <Text>{pres}</Text>
              <Text>{hum}</Text>
              <Text>{precChance}</Text>
              <Text>{precType}</Text>
              <Text>{apparentMin}</Text>
              <Text>{apparentMax}</Text>
              <Text>{moment.unix(sunrise).format("HH:mm").toString()}</Text>
              <Text>{moment.unix(sunset).format("HH:mm").toString()}</Text>
            </View>
          </View>
        </View>
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
    height: 150,
  },
  cardColumnLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 15,
  },
  cardColumnLeftSmall: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "65%",
    margin: 0,
  },
  cardColumnRight: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "35%",
    margin: 15,
  },
  cardColumnRightSmall: {
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "center",
  },
  cardSmall: {
    flexDirection: "row",

    marginTop: 15,
    padding: 15,
    width: "95%",
    height: 250,
  },
  title: {
    fontWeight: "bold",
    color: "#0d47a1",
  },
  heading: {
    fontSize: 24,
  },
});

export default Tomorrow;
