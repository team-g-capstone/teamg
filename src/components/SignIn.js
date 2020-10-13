import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(email, password) {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      //DONT DELETE THIS YET
      // console.log("User ID from Sign IN ", user.user.uid);
      navigation.navigate("MainMenu");
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    }
  }

  const handlePress = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    }

    if (!password) {
      Alert.alert("Password field is required.");
    }

    signIn(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter your email and password to sign in:</Text>

      <TextInput
        style={styles.emailInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.passwordInput}
        placeholder="Enter your password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Sumbit</Text>
      </TouchableOpacity>
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
    width: 150,
    padding: 5,
    backgroundColor: "#ff9999",
    borderWidth: 2,
    borderColor: "#ffcccc",
    borderRadius: 15,
    alignSelf: "center",
    margin: 5,
  },
});
