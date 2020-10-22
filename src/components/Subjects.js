import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";

export default function Subjects(props) {
  const navigation = useNavigation();

  let user = firebase.auth().currentUser;
  const userUID = user.uid;

  let image = require("../../assets/backgrounds/blue.jpg");
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <StatusBar style="auto" />
        <TouchableOpacity
          onPress={() => navigation.navigate("Shapes", { userUID })}
        >
          <Text style={styles.ButtonText}>Math</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ColorSortGame", { userUID })}
        >
          <Text style={styles.ButtonText}>Logic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MemoryGame", { userUID, navigation })}
        >
          <Text style={styles.ButtonText}>Memory</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>⇦ Back</Text>
        </TouchableOpacity>
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
  ButtonText: {
    color: "cornflowerblue",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#8FE09B",
    borderRadius: 15,
    padding: 1,
    marginLeft: 600,
    marginTop: -240,
    marginBottom: 200,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  backButtonText: {
    color: "#8FE09B",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});
