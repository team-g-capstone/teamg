import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import SceneSplash from "../scenes/auth/sceneSplash";
import OriginalTextPage from "../components/OriginalTextPage";

import Shapes from "../components/Shapes";
import ShapesAnswer from "../components/ShapesAnswer";
import Subjects from "../components/Subjects";
import WelcomePage from "../components/WelcomePage";
import ColorSortGame from '../components/ColorSortGame';

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
        name="ColorSortGame"
        component={ColorSortGame}
        options={{ headerShown: false}}
        />
      <Stack.Screen
        name="ShapesAnswer"
        component={ShapesAnswer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
