import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Keyboard,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {resetPassword} from "../../API/generalOp"

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
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#3FC5AB",
    padding:"8%",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    textAlign: "center",
    fontSize: 28,
    margin: 10,
    fontWeight: "bold",
    color: "#2E6194",
  },

  text: {
    textAlign: "center",
    fontSize: 18,
    margin: 10,
   fontStyle:"italic",
    color: "#1070D1",
  },
  emailInput: {
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
    backgroundColor: "#1070D1",
    borderWidth: 2,
    borderColor: "#79ACDE",
    borderRadius: 15,
    alignSelf: "center",
    margin: 5,
  }

});
