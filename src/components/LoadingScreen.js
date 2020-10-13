import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as firebase from "firebase";
import WelcomePage from "../components/WelcomePage";

export default function LoadingScreen({ navigation }) {
  //MAIN checking if a user is logged in
  useEffect(
    (checkIfLoggedIn = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate("GameMenu", { userUID: user.uid });
        } else {
          navigation.navigate("WelcomePage");
        }
      });
    })
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#3FC5AB",
    alignItems: "center",
    justifyContent: "center",
  },
});
