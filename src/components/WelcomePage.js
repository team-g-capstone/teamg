import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AudioButton from "./AudioButton";
// import SideMenu from "react-native-side-menu";

export default function Welcome({ navigation }) {
  let image = require("../../assets/backgrounds/red.jpg");
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.headerText}>Welcome to Math Crazy!!</Text>
        <Text style={styles.signUpText}>Don't have an account yet?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}>SIGN IN NOW</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
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
    fontSize: 25,
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
});
