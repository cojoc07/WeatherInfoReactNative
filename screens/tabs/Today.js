import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
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
    setFeelsLike(
      Math.round(Number(weatherData.forecast.currently?.apparentTemperature))
    );
    setSummary(weatherData.forecast.currently?.summary);
  }, [weatherData]);

  const [temp, setTemp] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);
  const [summary, setSummary] = useState("");

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
        <Button
          title="Check"
          onPress={() =>
            //Alert.alert("redux slice", weatherData)
            console.log("REDUX: " + weatherData.forecast.currently.summary)
          }
        />
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
    height: 180,
  },
  title: {
    fontWeight: "bold",
    color: "#0d47a1",
  },
});

export default Today;
