import React, { useState, useEffect } from "react";
import AppScreens from "../navigation/Navigation";
import {
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View,
} from "react-native";
import * as forecastActions from "../store/actions/forecast";
import * as keys from "../constants/keys";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";

import PlacesInput from "react-native-places-input";

const MainScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    tryLoad();
  }, [dispatch]);

  const tryLoad = async () => {
    setIsLoading(true);
    try {
      await dispatch(forecastActions.fetchForecast());
    } catch (err) {
      Alert.alert("Eroare", err.message);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </SafeAreaView>
    );
  }

  return (
    <View
      style={Platform.OS === "ios" ? { flex: 1, marginTop: 35 } : { flex: 1 }}
    >
      <AppScreens />
      <View style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
        <PlacesInput
          googleApiKey={keys.PLACESKEY}
          stylesInput={{ borderRadius: 15 }}
          queryCountries={["ro"]}
          onSelect={(place) => console.log(place)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default MainScreen;
