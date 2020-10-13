import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import SceneSplash from "../scenes/auth/sceneSplash";
//import SideMenu from "react-native-side-menu";
import { Menu } from "react-native-side-menu";

import Shapes from "../components/Shapes";
import ShapesAnswer from "../components/ShapesAnswer";
import Subjects from "../components/Subjects";
import WelcomePage from "../components/WelcomePage";
import MainMenu from "../components/MainMenu";
import ColorSortGame from '../components/ColorSortGame';
import GameMenu from "../components/GameMenu";
import UserStats_PT from "../components/UserStats_PT";
import UserStats_Student from "../components/UserStats_Student";
import SignUp from "../components/SignUp";

import AudioButton from "../components/AudioButton";
import SignIn from "../components/SignIn";
import LoadingScreen from "../components/LoadingScreen";
//Firebase
import * as firebase from "firebase";
import apiKeys from "../../config/keys";

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}
const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
      <Stack.Screen
        name="MainMenu"
        component={MainMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Subjects"
        component={Subjects}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Shapes"
        component={Shapes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ColorSortGame"
        component={ColorSortGame}
        options={{ headerShown: false}}
        />
      <Stack.Screen
        name="ShapesAnswer"
        component={ShapesAnswer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserStats_PT"
        component={UserStats_PT}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserStats_Student"
        component={UserStats_Student}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
