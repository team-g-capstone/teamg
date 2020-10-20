import React from "react";
import {
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
import { styles } from "../../styles/MainMenu.Component.style";
import { loggingOut } from "../../API/generalOp";

export default function MainMenu(props) {
  const navigation = useNavigation();
  const userUID = props.route.params.userUID;

  let image = require("../../assets/backgrounds/orange.jpg");

  const [value, loading, error] = useDocument(
    firebase.firestore().collection("users").doc(userUID)
  );

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
                navigation.navigate("TeacherEditStudent", { userUID })
              }
            >
              <Text style={styles.anonButtonText}>
                Add/View Student(s)
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
                <Text style={styles.anonButtonText}>View My Stars </Text>
              </TouchableOpacity>
            </>
          )}
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

