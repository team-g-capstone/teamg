import React from "react";
import * as firebase from "firebase";
import apiKeys from "../../config/keys";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import LoadingScreen from "../components/LoadingScreen";
import WelcomePage from "../components/WelcomePage";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}

function stackNav({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelcomePage"
        component={WelcomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default stackNav;
