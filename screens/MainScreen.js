import React, { useState, useEffect } from "react";
import AppScreens from "../navigation/Navigation";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as forecastActions from "../store/actions/forecast";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";

const MainScreen = () => {
  const dispatch = useDispatch();

  const weatherData = useSelector((state) => state.forecast);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    tryLoad();
  }, [dispatch]);

  const tryLoad = async () => {
    setIsLoading(true);
    await dispatch(forecastActions.fetchForecast());
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return <AppScreens />;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default MainScreen;
