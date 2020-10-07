import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import SceneSplash from "../scenes/auth/sceneSplash";
import OriginalTextPage from "../components/OriginalTextPage";
import Shapes from "../components/Shapes";

const Stack = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="OriginalTextPage"
        component={OriginalTextPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Shapes"
        component={Shapes}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
