import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import AudioButton from "./AudioButton";

export default function Subjects({ navigation }) {
  let image = require('../../assets/backgrounds/blue.jpg')
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      {/* <Text>Choose a Subject!</Text> */}
      <StatusBar style="auto" />
      <Button title="Math" onPress={() => navigation.navigate("Shapes")} />
      <Button title="History" />
      <Button
        title="User Progress"
        onPress={() => navigation.navigate("UserStats_PY")}
      />
      </ImageBackground>
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

  image: {
    flex: 1, 
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
    width: "100%"
  }
});
