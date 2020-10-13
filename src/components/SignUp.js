import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "react-native-picker-dropdown";
import * as firebase from "firebase";
import "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("student");
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
      db.collection("users")
        .doc(currentUser.uid)
        .set({
          email: currentUser.email,
          lastName: lastName,
          firstName: firstName,
          userType: userType,
          mathScores: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
        });

      navigation.navigate("GameMenu", { userUID: currentUser.uid });
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
  const handleValueChange = (type) => {
    setUserType(type);
  };
  const handlePressSignIn = () => {
    navigation.navigate("SignIn");
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert("First name is required");
    } else if (!email) {
      Alert.alert("Email field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else if (!confirmPassword) {
      setPassword("");
      Alert.alert("Confirm password field is required.");
    } else if (password !== confirmPassword) {
      Alert.alert("Password does not match!");
    } else {
      registration(email, password);
      navigation.navigate("GameMenu");
      emptyState();
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Go back to home"
        onPress={() => {
          navigation.navigate("WelcomePage");
        }}
      />
      <Text style={styles.text}>Create an account </Text>
      <Picker
        style={styles.pickerInput}
        enabled={false}
        selectedValue={userType}
        onValueChange={handleValueChange}
      >
        <Picker.Item label="Student" value="student" />
        <Picker.Item label="Teacher" value="teacher" />
        <Picker.Item label="Parents" value="parent" />
      </Picker>

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
    </View>
  );
}

const styles = StyleSheet.create({
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
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
  textInput: {
    width: 250,
    borderWidth: 1,
    padding: 10,
    margin: "0.2%",
  },
  pickerInput: {
    width: 250,
    borderWidth: 1,
    padding: 10,
    margin: "0.2%",
    marginLeft: "34.5%",
    alignContent: "center",
  },
});
