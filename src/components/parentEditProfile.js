import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { useDocument } from "react-firebase-hooks/firestore";

export default function parentEditProfile(props) {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userUID = props.route.params.userUID;
  const [value, loading, error] = useDocument(
    firebase.firestore().collection("users").doc(userUID)
  );
  const [childUID, setChildUID] = useState("");
  const [childrenFB, setChildrenFB] = useState([]);

  let alertMsg =
    "You have added this child, click View all children to see the child's score";
  let image = require("../../assets/backgrounds/red.jpg");

  // const readChildrenFB = () =>{
  //   let childrenArr =[];
  //   firebase.firestore().collection('users').doc(userUID).onSnapshot((querysnap)=>
  //        console.log(querysnap)
  //   )

  // }
  const addAChild = async () => {
    let childrenFB = value.data().children;
    childrenFB.includes(childUID)
      ? Alert.alert(alertMsg)
      : childrenFB.push(childUID);
    let userDocument = await firebase
      .firestore()
      .collection("users")
      .doc(userUID)
      .get();
    userDocument.ref.update({
      children: childrenFB,
    });
  };

  const handlePressAddAChild = () => {
    addAChild();
  };

  //Creating a new child account:
  const handlePress=()=>{
    console.log("from handlePress parentEdiProfile", firstName)
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.headerText}>
          Teacher Dashboard: Create a new student
        </Text>
        <TextInput
        style={styles.textInput}
        placeholder="First name"
        value={firstName}
        onChangeText={(name) => setFirstName(name)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Last name"
        value={lastName}
        onChangeText={(name) => setLastName(name)}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.textInput}
        placeholder="Enter your password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Retype your password to confirm"
        value={confirmPassword}
        onChangeText={(password2) => setConfirmPassword(password2)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

        <View style={styles.addAChildContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Child UID"
            value={childUID}
            onChangeText={(uid) => setChildUID(uid)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handlePressAddAChild}
          >
            <Text style={styles.buttonText}>Add a child </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.viewAllChildbutton}
          onPress={() => {
            navigation.navigate("AllChildrenList", { userUID });
          }}
        >
          <Text style={styles.buttonText}>View all children </Text>
        </TouchableOpacity>
        <Button
          title="Main Menu"
          onPress={() => navigation.navigate("MainMenu")}
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
    margin: "1%",
  },
  viewAllChildbutton: {
    width: 250,
    padding: 5,
    backgroundColor: "#ff9999",
    borderWidth: 2,
    borderColor: "#ffcccc",
    borderRadius: 15,
    alignSelf: "center",
    margin: "0.5%",
    marginLeft: "10%",
  },
  textInput: {
    width: 250,
    borderWidth: 1,
    padding: 10,
    margin: "0.2%",
    marginLeft: "35%",
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
  addAChildContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: "1%",
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
