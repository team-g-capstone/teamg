import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { resetPassword } from "../../API/generalOp";
import { styles } from "../../styles/ForgotPassword.Component.style";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");

  const handlePress = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    }
      resetPassword(email);
      setEmail("");
      navigation.navigate("WelcomePage");
  };

  return (

    <ImageBackground style = {styles.container} source= {require("../../assets/backgrounds/green.jpg")}>
      <Text style={styles.title}>Forgot password?</Text>
      <Text style={styles.text}>Enter the email associated with your account:</Text>
      <ScrollView onBlur={Keyboard.dismiss}>
        <TextInput
          style={styles.emailInput}
          placeholder="Email*"
          value={email}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
}

