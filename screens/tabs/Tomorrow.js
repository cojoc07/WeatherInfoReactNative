import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";

const Tomorrow = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [summary, setSummary] = useState("");
  const [pres, setPres] = useState(0);
  const [hum, setHum] = useState(0);
  const [rainChance, setRainChance] = useState("");
  const [apparentMin, setApparentMin] = useState(0);
  const [apparentMax, setApparentMax] = useState(0);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  return (
    <SafeAreaView style={styles.screen}>
      <Card style={styles.card}>
        <View style={styles.cardColumnLeft}>
          <Text style={styles.heading}>Ziua: {max}° ↑</Text>
          <Text style={styles.heading}>Noaptea: {min}° ↓</Text>
        </View>
        <View style={styles.cardColumnRight}>
          <Image
            source={require("../../assets/images/cloudy.png")}
            style={styles.image}
          />
          <Text>{summary}</Text>
        </View>
      </Card>

      <Card style={styles.cardSmall}>
        {/*  <Text style={{ ...styles.title, marginBottom: 5 }}>DETALII</Text> */}
        <View style={styles.cardColumnLeft}>
          <Text>Presiune atmosferică</Text>
          <Text>Umiditate</Text>
          <Text>Șanse de precipitații</Text>
          <Text>Tip de precipitații</Text>
          <Text>Temperatura minimă resimțită</Text>
          <Text>Temperatura maximă resimțită</Text>
          <Text>Răsărit</Text>
          <Text>Apus</Text>
        </View>
        <View style={styles.cardColumnRight}>
          <Text>1019 hPa</Text>
          <Text>76%</Text>
          <Text>75%</Text>
          <Text>Ploaie</Text>
          <Text>3 C</Text>
          <Text>8 C</Text>
          <Text>06:35</Text>
          <Text>20:30</Text>
        </View>
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
  cardColumnLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",

    margin: 15,
    borderWidth: 1,
    borderColor: "red",
  },
  cardColumnRight: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "30%",
    margin: 15,
    borderWidth: 1,
    borderColor: "green",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "center",
  },
  cardSmall: {
    flexDirection: "row",
    marginTop: 5,
    margin: 15,
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
