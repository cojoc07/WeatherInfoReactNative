import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";

const Today = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Card style={styles.card}>
        <View style={styles.cardColumn}>
          <Text style={styles.title}>ACUM</Text>
          <Text>Ziua: 24</Text>
          <Text>Noaptea: 17</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 48 }}>19</Text>
            <Text style={{ fontSize: 20 }}> C</Text>
          </View>

          <Text>Se simt ca 14 grade</Text>
        </View>
        <View style={styles.cardColumn}>
          <Image
            source={require("../../assets/images/cloudy.png")}
            style={styles.image}
          />
          <Text>Innorat</Text>
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
