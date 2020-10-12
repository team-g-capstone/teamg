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
import UserStats_PT from "../components/UserStats_PT";
import UserStats_Student from "../components/UserStats_Student";

import AudioButton from "../components/AudioButton";

const Stack = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="WelcomePage"
        component={WelcomePage}
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
