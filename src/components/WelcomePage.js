import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import AudioButton from "./AudioButton";
// import SideMenu from "react-native-side-menu";

export default function Welcome({ navigation }) {
  let image = require('../../assets/backgrounds/red.jpg')
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      {/* <Text>Welcome!!</Text> */}
      <StatusBar style="auto" />
      <Button
        title="Go To Subjects"
        onPress={() => navigation.navigate("Subjects")}
      />
      <Button
        title="User Progress for Parents/Teachers"
        onPress={() => navigation.navigate("UserStats_PT")}
        style={styles.progressButton}
      />
      <Button
        title="User Progress for Students"
        onPress={() => navigation.navigate("UserStats_Student")}
        style={styles.progressButton}
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

  progressButton: {
    alignSelf: "flex-end",
  },
  image: {
    flex: 1, 
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center'
  }
});
