import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { styles } from "../../styles/WelcomePage.Component.style";

export default function Welcome() {
  const navigation = useNavigation();
  let image = require("../../assets/backgrounds/red.jpg");
  let logo = require("../../assets/logo_without_text.png");

  const signInAnonymous = () => {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        Alert.alert("There is an error", error.message);
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userUID = user.uid;
        navigation.navigate("Games", { userUID });
      }
    });
  };

  const handlePress = () => {
    signInAnonymous();
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>Welcome to BrainTeez!!</Text>
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
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.anonButtonText}>Go to Games</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

