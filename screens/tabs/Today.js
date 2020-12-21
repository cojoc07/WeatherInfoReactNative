import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";

const Today = () => {
  const getForecast = async () => {
    let url = `https://api.darksky.net/forecast/***REMOVED***/44.20,27.32?exclude=hourly&lang=ro&units=si`;
    let res = await fetch(url);
    let data = await res.json();

    setTemp(Math.floor(data.currently.temperature));
    setFeelsLike(Math.floor(data.currently.apparentTemperature));
    setSummary(data.currently.summary);
  };

  const [temp, setTemp] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    try {
      getForecast();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Card style={styles.card}>
        <View style={styles.cardColumn}>
          <Text style={styles.title}>ACUM</Text>
          <Text>Ziua: -° ↑</Text>
          <Text>Noaptea: -° ↓</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 48 }}>{temp}</Text>
            <Text style={{ fontSize: 20 }}> C</Text>
          </View>

          <Text>Se simt ca {feelsLike} grade</Text>
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
          SAPTAMANA ACEASTA
        </Text>
        <Text>
          Ploaie usoara de azi pana duminica, cu posibile ploi in timpul noptii
          si temperaturi ce urca pana la 18 grade sambata.
        </Text>
      </Card>
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
    marginTop: 30,
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
    height: 100,
  },
  title: {
    fontWeight: "bold",
    color: "#0d47a1",
  },
});

export default Today;
