import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Sign up with email and password
  async function registration(email, password) {
    try {
      //Authenticating
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      //Assign additional info to the Auth profile
      const currentUser = firebase.auth().currentUser;

      //Setting the user info to the firestone database
      const db = firebase.firestore();
      db.collection("users").doc(currentUser.uid).set({
        email: currentUser.email,
        lastName: lastName,
        firstName: firstName,
      });
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    }
  }

  const emptyState = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handlePressSignIn = () => {
    navigation.navigate("SignIn");
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert("First name is required");
    }

    if (!email) {
      Alert.alert("Email field is required.");
    }

    if (!password) {
      Alert.alert("Password field is required.");
    }

    if (!confirmPassword) {
      setPassword("");
      Alert.alert("Confirm password field is required.");
    }

    if (password !== confirmPassword) {
      Alert.alert("Password does not match!");
    } else {
      registration(email, password);
      navigation.navigate("GameMenu");
      emptyState();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account </Text>
      <TextInput
        style={styles.emailInput}
        placeholder="First name"
        value={firstName}
        onChangeText={(name) => setFirstName(name)}
      />
      <TextInput
        style={styles.emailInput}
        placeholder="Last name"
        value={lastName}
        onChangeText={(name) => setLastName(name)}
      />

      <TextInput
        style={styles.emailInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.passwordInput}
        placeholder="Enter your password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.passwordInput}
        placeholder="Retype your password to confirm"
        value={confirmPassword}
        onChangeText={(password2) => setConfirmPassword(password2)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <Button
        title="Go back to home"
        onPress={() => {
          navigation.navigate("WelcomePage");
        }}
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
  text: {
    //center the text
    textAlign: "center",
    fontSize: 18,
    margin: 10,
    fontWeight: "bold",
    color: "#2E6194",
  },
  emailInput: {
    width: 250,
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  passwordInput: {
    width: 250,
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: 200,
    padding: 5,
    backgroundColor: "#ff9999",
    borderWidth: 2,
    borderColor: "#ffcccc",
    borderRadius: 15,
    alignSelf: "center",
    margin: 5,
  },
});
