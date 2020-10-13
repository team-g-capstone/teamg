import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import SideMenu from "react-native-side-menu";
import * as firebase from "firebase";
import {
  useCollection,
  useDocument,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { useNavigation } from "@react-navigation/native";

export default function GameMenu(props) {
  const navigation = useNavigation();
  const userUID = props.route.params.userUID;
  console.log("UID from GameMenu", props);
  // const [currentUID, setCurrentUID] = useState("");

  // useEffect(
  //   () =>
  //     (getUser = () => {
  //       firebase.auth().onAuthStateChanged((user) => {
  //         if (user) {
  //           setCurrentUID(user.uid);
  //         }
  //       });
  //     })
  // );

  let image = require("../../assets/backgrounds/orange.jpg");
  let currentUserUID = firebase.auth().currentUser.uid;

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
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.headerText}>
            {value.data().firstName}! Welcome to Game Menu!
          </Text>
          <Text style={styles.signUpText}>Collect some stickers</Text>

          <Button
            title="Go To Subjects"
            onPress={() => navigation.navigate("Subjects")}
          />

          <Button
            title="User Progress for Parents/Teachers"
            onPress={() => navigation.navigate("UserStats_PT")}
            style={styles.progressButton}
          />
          <Text style={styles.signUpText}>View my stickers</Text>
          <Button
            title="User Progress for Students"
            onPress={() => navigation.navigate("UserStats_Student")}
            style={styles.progressButton}
          />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Log Out</Text>
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
