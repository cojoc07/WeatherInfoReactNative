import React, { useState, useEffect } from "react";
import AppScreens from "../navigation/Navigation";
import {
  Alert,
  ActivityIndicator,
  Dimensions,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as forecastActions from "../store/actions/forecast";
import * as locationActions from "../store/actions/location";
import * as keys from "../constants/keys";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";

import { FloatingAction } from "react-native-floating-action";
import * as Location from "expo-location";

import PlacesInput from "../components/SearchFC";

const MainScreen = () => {
  const dispatch = useDispatch();
  const STATUS_BAR = StatusBar.statusBarHeight || 24;
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState(44.43);
  const [lon, setLon] = useState(26.09);

  const actions = [
    {
      text: "Locate me",
      icon: (
        <Ionicons
          name={Platform.OS === "ios" ? "ios-location" : "md-location"}
          size={22}
          color={"white"}
        />
      ),
      name: "bt_locate",
      position: 2,
    },
  ];

  useEffect(() => {
    tryLoad();
  }, [lat, lon, dispatch]);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    try {
      const response = await fetch(
        `${keys.REVGEOCODE}?latlng=${location.coords.latitude},${location.coords.longitude}&key=${keys.PLACESKEY}`
      );
      const resData = await response.json();
      var locationAddress = resData.results[0].formatted_address;

      dispatch(locationActions.setLocation(locationAddress));
    } catch (err) {
      Alert.alert("Eroare", err.message);
    }

    setLat(location.coords.latitude);
    setLon(location.coords.longitude);
  };
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
          stylesItem={{
            borderBottomWidth: 1,
            borderTopWidth: 0,
            borderRadius: 15,
          }}
          placeHolder={"Caută"}
          queryCountries={["ro"]}
        />
      </View>

      <FloatingAction
        actions={actions}
        floatingIcon={
          <Ionicons
            name={Platform.OS == "ios" ? "ios-location" : "md-location"}
            size={22}
            color={"white"}
          />
        }
        distanceToEdge={{ vertical: 70, horizontal: 30 }}
        onPressItem={(name) => {
          switch (name) {
            case "bt_locate": {
              getLocation();
              tryLoad();
              return;
            }
            default: {
              return;
            }
          }
        }}
      />
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
