import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text,TextInput, View, Button, ImageBackground, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from 'firebase';
import { useDocument } from "react-firebase-hooks/firestore";

export default function parentEditProfile(props) {

  const navigation=useNavigation();
  const userUID = props.route.params.userUID
  const [value, loading, error] = useDocument(firebase.firestore().collection('users').doc(userUID))
  const [childUID, setChildUID] = useState('');
  let alertMsg = "You have added this child, click View all children to see the child's score"
  let image = require("../../assets/backgrounds/red.jpg");
  const addAChild =async() =>{
    let childrenFB = value.data().children;
    childrenFB.includes(childUID)? Alert.alert(alertMsg):childrenFB.push(childUID)
    let userDocument = await firebase.firestore().collection('users').doc(userUID).get();
    userDocument.ref.update({
      children: childrenFB
    })
  }
  const handlePressAddAChild=()=>{
    addAChild();
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>

        <Text style={styles.headerText}>Parent Dashboard: Edit your profile</Text>
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('View all childs pressed');
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
    margin: 5,
  },
  textInput: {
    width: 250,
    borderWidth: 1,
    padding: 10,
    margin: "0.2%",
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
