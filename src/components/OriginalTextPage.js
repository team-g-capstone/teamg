import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AudioButton from "./AudioButton";
import Shapes from "./Shapes";

export default function OriginalTextPage(props) {
  return (
    <View style={styles.container}>
      <Text>Team G Capstone!</Text>
      {/* <AudioButton /> */}
      <Shapes />
      <StatusBar style="auto" />
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
