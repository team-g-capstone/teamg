import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import AudioButton from "./AudioButton";
import * as firebase from "firebase";

export default function Subjects(props) {
  const navigation = useNavigation();
  const userUID = props.route.params.userUID;

  let image = require("../../assets/backgrounds/blue.jpg");
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        {/* <Text>Choose a Subject!</Text> */}
        <StatusBar style="auto" />
        <Button
          title="Math"
          onPress={() => navigation.navigate("Shapes", { userUID })}
        />
        <Button
          title="Math Level 2"
          onPress={() => navigation.navigate("ColorSortGame", { userUID })}
        />
        {/* <Button
          title="User Progress"
          onPress={() => navigation.navigate("UserStats_PT")}
        /> */}
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
    resizeMode: "cover",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
