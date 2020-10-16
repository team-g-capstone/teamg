import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import AudioButton from "./AudioButton";
import * as firebase from "firebase";

export default function Subjects(props) {
  const navigation = useNavigation();
  // const userUID = props.route.params.userUID;
  // let propsUSer = props.route.params.userUID;
  // let userUID;
  // if (propsUSer) {
  //   userUID = props.route.params.userUID;
  // } else {
  //   userUID = props.userUID;
  // }
  let user = firebase.auth().currentUser;
  const userUID = user.uid;

  let image = require("../../assets/backgrounds/blue.jpg");
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <StatusBar style="auto" />
        <Button
          title="Math"
          onPress={() => navigation.navigate("Shapes", { userUID })}
        />
        <Button
          title="Logic"
          onPress={() => navigation.navigate("ColorSortGame", { userUID })}
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
    resizeMode: "cover",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
