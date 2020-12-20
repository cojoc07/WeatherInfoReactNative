import React from "react";
import { Text, StyleSheet, View } from "react-native";

const SevenDays = () => {
  return (
    <View style={styles.screen}>
      <Text>7 zile</Text>
    </View>
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
