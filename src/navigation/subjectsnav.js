import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Shapes from "../components/Shapes";
import ShapesAnswer from "../components/ShapesAnswer";
import Subjects from "../components/Subjects";
import ColorSortGame from "../components/ColorSortGame";
import MemoryGame from "../components/MemoryGame";
import CreateGameRoom from "../components/CreateGameRoom";
import GameRoom from "../components/GameRoom";
import JoinRoom from "../components/JoinRoom";

const Stack = createStackNavigator();

function SubjectsNav({ navigation }) {
  return (
    <Stack.Navigator>
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShapesAnswer"
        component={ShapesAnswer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MemoryGame"
        component={MemoryGame}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateGameRoom"
        component={CreateGameRoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameRoom"
        component={GameRoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JoinRoom"
        component={JoinRoom}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default SubjectsNav;
