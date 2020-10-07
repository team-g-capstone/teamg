import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./src/redux/index.js";
import { initialiseApplication } from "./src/redux/reducers/applicationReducer.js";
import Navigation from "./src/navigation/index.js";
import { enableScreens } from "react-native-screens";

enableScreens();

const store = configureStore();
store.dispatch(initialiseApplication());

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
