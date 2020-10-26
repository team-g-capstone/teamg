import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Keyboard,
  ImageBackground,
} from "react-native";
import { Picker } from "react-native-picker-dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../styles/SignUp.Component.style";
import { registration } from "../../API/generalOp";

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      const userUID = registration(
        email,
        password,
        lastName,
        firstName,
        userType
      );
      navigation.navigate("Menu", userUID);
      emptyState();
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/backgrounds/yellow.jpg")}
    >
      <Button
        title="Back to home"
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
      </Picker>
      <ScrollView onBlur={Keyboard.dismiss}>
        <TextInput
          style={styles.textInput}
          placeholder="First name*"
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
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Retype your password to confirm*"
          value={confirmPassword}
          onChangeText={(password2) => setConfirmPassword(password2)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
