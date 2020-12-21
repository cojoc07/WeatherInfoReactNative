import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

//screens
import Today from "../screens/tabs/Today";
import Tomorrow from "../screens/tabs/Tomorrow";
import SevenDays from "../screens/tabs/SevenDays";

//const
import Colors from "../constants/Colors";

const MyTabs =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const TabScreens = () => {
  return (
    <NavigationContainer>
      <MyTabs.Navigator
        shifting={true}
        tabBarOptions={{
          activeTintColor: Colors.accentColor,

          inactiveTintColor: "gray",
        }}
      >
        <MyTabs.Screen
          name="Azi"
          component={Today}
          options={({ route }) => {
            return {
              tabBarIcon: (tabInfo) => {
                return (
                  <Ionicons
                    name="ios-restaurant"
                    size={22}
                    color={tabInfo.color}
                  />
                );
              },
              tabBarColor: "#9ccc65",
            };
          }}
        />
        <MyTabs.Screen
          name="Maine"
          component={Tomorrow}
          options={({ route }) => {
            return {
              tabBarIcon: (tabInfo) => {
                return (
                  <Ionicons name="ios-heart" size={22} color={tabInfo.color} />
                );
              },
              tabBarColor: "#00acc1",
            };
          }}
        />
        <MyTabs.Screen
          name="7 zile"
          component={SevenDays}
          options={({ route }) => {
            return {
              tabBarIcon: (tabInfo) => {
                return (
                  <Ionicons name="ios-person" size={22} color={tabInfo.color} />
                );
              },
              tabBarColor: "#8d6e63",
            };
          }}
        />
      </MyTabs.Navigator>
    </NavigationContainer>
  );
};

export default TabScreens;
