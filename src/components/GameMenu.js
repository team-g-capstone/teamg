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
    let mathScores = value.data().mathScores;
    let userType = value.data().userType;
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.headerText}>
            Hello {userType}
            {` `}
            {value.data().firstName} ! Your Game Menu!
          </Text>
          <Text style={styles.signUpText}>Collect some stickers</Text>

          <Button
            title="Go To Subjects"
            onPress={() => navigation.navigate("Subjects")}
          />

          {userType !== "student" ? (
            <Button
              title="User Progress for Parents/Teachers"
              onPress={() => navigation.navigate("UserStats_PT")}
              style={styles.progressButton}
            />
          ) : (
            <>
              <Text style={styles.signUpText}>View my stickers</Text>
              <Button
                title="Testing Student Dashboard"
                onPress={() =>
                  navigation.navigate("testingStudentDashboard", {
                    mathScores: mathScores,
                  })
                }
                style={styles.progressButton}
              />
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>NO USER </Text>
        <Button
          title="homepage"
          onPress={() => navigation.navigate("WelcomePage")}
        />
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
