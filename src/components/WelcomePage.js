import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AudioButton from "./AudioButton";
// import SideMenu from "react-native-side-menu";

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <StatusBar style="auto" />
      <Button
        title="Go To Subjects"
        onPress={() => navigation.navigate("Subjects")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
