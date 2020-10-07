import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AudioButton from "./AudioButton";

export default function Subjects({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Choose a Subject!</Text>
      <StatusBar style="auto" />
      <Button title="Math" onPress={() => navigation.navigate("Shapes")} />
      <Button title="History" />
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
