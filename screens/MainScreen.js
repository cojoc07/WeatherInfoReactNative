import React, { useState, useEffect } from "react";
import AppScreens from "../navigation/Navigation";
import {
  Alert,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View,
  Keyboard,
} from "react-native";
import * as forecastActions from "../store/actions/forecast";
import * as keys from "../constants/keys";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";

import PlacesInput from "react-native-places-input";

const MainScreen = () => {
  const dispatch = useDispatch();
  const STATUS_BAR = StatusBar.statusBarHeight || 24;
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState(44.43);
  const [lon, setLon] = useState(26.09);

  useEffect(() => {
    tryLoad();
  }, [lat, lon, dispatch]);

  const tryLoad = async () => {
    setIsLoading(true);
    try {
      await dispatch(forecastActions.fetchForecast(lat, lon));
    } catch (err) {
      Alert.alert("Eroare", err.message);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={{ marginTop: Platform.OS == "ios" ? STATUS_BAR + 15 : 0, flex: 1 }}
    >
      <StatusBar backgroundColor="#9ccc65" barStyle="dark-content" />

      <AppScreens />
      {isLoading ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
      ) : null}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <PlacesInput
          googleApiKey={keys.PLACESKEY}
          stylesInput={{ elevation: 15, borderRadius: 15 }}
          stylesList={{
            top: 5,
            borderRadius: 15,
            borderColor: "#dedede",
            borderLeftWidth: 1,
            borderRightWidth: 1,
          }}
          queryCountries={["ro"]}
          onSelect={(place) => {
            console.log(place);
            setLat(place.result.geometry.location.lat);
            setLon(place.result.geometry.location.lng);
            Keyboard.dismiss();
          }}
        />
      </View>
    </SafeAreaView>
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
