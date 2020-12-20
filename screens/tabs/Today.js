import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Today = () => {
  return (
    <View style={styles.screen}>
      <Text>Vremea azi</Text>
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

export default Today;
