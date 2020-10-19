import React from "react";
import Subjects from "../components/Subjects";
import MainMenu from "../components/MainMenu";
import UserStats_Student from "../components/UserStats_Student";
import { createStackNavigator } from "@react-navigation/stack";
import TeacherEditStudent from "../components/TeacherEditStudent";
import UserStats_TCH from "../components/UserStats_TCH";
import AllStudentsList from "../components/AllStudentsList";

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
        name="UserStats_TCH"
        component={UserStats_TCH}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserStats_Student"
        component={UserStats_Student}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TeacherEditStudent"
        component={TeacherEditStudent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllStudentsList"
        component={AllStudentsList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MainMenuNav;
