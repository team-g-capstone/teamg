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
import { styles } from "../../styles/SignIn.Component.style";
import { signIn } from "../../API/generalOp";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <ImageBackground style = {styles.container} source={require("../../assets/backgrounds/green.jpg")}>
      <Text style={styles.text}>Enter your email and password to sign in:</Text>
      <ScrollView onBlur={Keyboard.dismiss}>
        <TextInput
          style={styles.emailInput}
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotButton} onPress={()=>navigation.navigate('forgotPassword')}>
          <Text style={styles.buttonText}>Forgot password</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

