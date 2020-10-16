import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigation } from "@react-navigation/native";

export default function MainMenu(props) {
  const navigation = useNavigation();
  const userUID = props.route.params.userUID;

  let image = require("../../assets/backgrounds/orange.jpg");

  const [value, loading, error] = useDocument(
    firebase.firestore().collection("users").doc(userUID)
  );

  async function loggingOut() {
    await firebase.auth().signOut();
    navigation.navigate("WelcomePage");
  }
  const handlePress = () => {
    loggingOut();
  };

  if (error) {
    Alert.alert("There is an error", error);
  } else if (loading) {
    return <ActivityIndicator size="large" />;
  } else if (value && value.data()) {
    let mathScores = value.data().mathScores;
    let logicScores = value.data().logicScores;
    let userType = value.data().userType;
    let firstName = value.data().firstName;

    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.headerText}>Hello, {firstName} !</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Games", {
                screen: "Subjects",
                params: { userUID: userUID },
              })
            }
          >
            <Text style={styles.anonButtonText}>Games</Text>
          </TouchableOpacity>

          {userType !== "student" ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Menu", {
                  screen: "UserStats_PT",
                  params: { userUID },
                })
              }
            >
              <Text style={styles.anonButtonText}>
                Student Progress for Teachers/Parents
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Menu", {
                    screen: "UserStats_Student",
                    params: {
                      mathScores: mathScores,
                      userUID: userUID,
                      firstName: firstName,
                      logicScores: logicScores,
                    },
                  })
                }
              >
                <Text style={styles.anonButtonText}>Student Progress</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("parentEditProfile", { userUID })
            }
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  } else {
    let image = require("../../assets/backgrounds/blue.jpg");
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.text}>You are not signed in!</Text>

          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.anonButtonText}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.text}>OR</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.anonButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    padding: 5,
    backgroundColor: "#ff9999",
    borderWidth: 2,
    borderColor: "#ffcccc",
    borderRadius: 15,
    alignSelf: "center",
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  progressButton: {
    alignSelf: "flex-end",
  },
  signUpText: {
    textAlign: "center",
    fontSize: 15,
    margin: 10,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
    color: "white",
  },
  anonButtonText: {
    color: "cornflowerblue",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
