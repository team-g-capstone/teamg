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
import ColorSortGame from "../components/ColorSortGame";

import UserStats_PT from "../components/UserStats_PT";
import UserStats_Student from "../components/UserStats_Student";
import SignUp from "../components/SignUp";

import SignIn from "../components/SignIn";
import LoadingScreen from "../components/LoadingScreen";
//Firebase
import * as firebase from "firebase";
import apiKeys from "../../config/keys";
import parentEditProfile from "../components/parentEditProfile";
import AllChildList from "../components/AllChildrenList";

//Drawer
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
