import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";

// import SideMenu from "react-native-side-menu";

export default function Welcome() {
  const navigation = useNavigation();
  let image = require("../../assets/backgrounds/red.jpg");

  // const signInAnonymous =()=>{
  //   firebase.auth().signInAnonymously().catch(function(error){Alert.alert("There is an error", error.message)})

  //   firebase.auth().onAuthStateChanged((user)=>{
  //     if(user){
  //      const userUID = user.uid
  //      navigation.navigate("Subjects", {userUID})
  //     }
  //   })
  // }

  const handlePress =()=>{
      //signInAnonymous();
      navigation.navigate("Subjects")
  }

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
        <Text style={styles.signUpText}>Already have an account?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
        <Button
          title="Go To Subjects"
          onPress={handlePress}
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
