import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AudioButton from './AudioButton'

export default function OriginalTextPage() {
  return (
    <View style={styles.container}>
      <Text>Team G Capstone!</Text>
      <AudioButton />
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
