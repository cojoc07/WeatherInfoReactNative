import React from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";

const SevenDays = () => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text>7 zile</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SevenDays;
