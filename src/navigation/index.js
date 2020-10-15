import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import apiKeys from "../../config/keys";



import { createDrawerNavigator } from "@react-navigation/drawer";
import stackNav from "./stacknav";
import SubjectsNav from "./subjectsnav";
import MainMenuNav from "./MainMenuNav";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}
const Navigation = () => (
  <NavigationContainer>
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="WelcomePage"
        component={stackNav}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="MainMenu"
        component={MainMenuNav}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="SubjectsNav"
        component={SubjectsNav}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default Navigation;
