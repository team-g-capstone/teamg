import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Button } from "react-native";
import * as firebase from "firebase";

export default function LoadingScreen({ navigation }) {
  //MAIN checking if a user is logged in
  useEffect(
    (checkIfLoggedIn = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userUID = user.uid;
          navigation.navigate("MainMenu", {
            screen: "MainMenuNav",
            params: { userUID },
          });
        } else {
          navigation.navigate("WelcomePage");
        }
      });
    })
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Button
        title="Go to Main Menu"
        onPress={() => navigation.navigate("MainMenu")}
        style={styles.progressButton}
      />
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
  progressButton: {
    alignSelf: "flex-end",
  },
});
