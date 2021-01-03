import React, { useState, useEffect } from "react";
import MainScreen from "./screens/MainScreen";
import * as Font from "expo-font";
import forecastReducer from "./store/reducers/forecast";
import locationReducer from "./store/reducers/location";

import { applyMiddleware, createStore, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import AppLoading from "expo-app-loading";

const rootReducer = combineReducers({
  forecast: forecastReducer,
  location: locationReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => setFontLoaded(false)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};

export default App;
