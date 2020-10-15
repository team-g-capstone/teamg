import React from "react";

import Subjects from "../components/Subjects";
import MainMenu from "../components/MainMenu";
import UserStats_PT from "../components/UserStats_PT";
import UserStats_Student from "../components/UserStats_Student";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function MainMenuNav({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainMenuNav"
        component={MainMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Subjects"
        component={Subjects}
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
  );
}

export default MainMenuNav;
