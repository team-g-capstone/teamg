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
  ScrollView,
  Keyboard
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";

import { useDocument } from "react-firebase-hooks/firestore";

export default function parentEditProfile(props) {
  const navigation = useNavigation();
  const userUID = props.route.params.userUID;
  const [value, loading, error] = useDocument(
    firebase.firestore().collection("users").doc(userUID)
  );
  const [childEmail, setChildEmail]=useState('');

  let alertMsg =
    "Error: You have added this student, click View all students button to see the student's profile.";
  let image = require("../../assets/backgrounds/red.jpg");
  let studentUIDVar;

  const getStudentUID = async () => {
     const snapshot = await firebase.firestore().collection('users').where('email', '==',childEmail).get();

     if(snapshot.empty){
       Alert.alert('The email provided is not registered in the system!')
       return;
     }

     snapshot.forEach(doc=>{
      studentUIDVar= doc.id
      //DON"T DELTE THIS YET until code review, .data() will give us many info
      //  console.log(doc.id, '=>', doc.data())
     })
  };

  const addStudentToTeacher = async()=>{
    let studentsFB;
    if(value&&value.data()){
    studentsFB = await value.data().students;
    }

    studentsFB.includes(studentUIDVar)
      ? Alert.alert(alertMsg)
      : studentsFB.push(studentUIDVar);

    let userDocument = await firebase
      .firestore()
      .collection("users")
      .doc(userUID)
      .get();
    userDocument.ref.update({
      students: studentsFB,
    });

    let studentDocument = await firebase
      .firestore()
      .collection("users")
      .doc(studentUIDVar)
      .get();
    studentDocument.ref.update({
      teacherUID:userUID,
    });
  }

  const handlePressAddAChild = async () => {
   await getStudentUID();
   addStudentToTeacher();
   setChildEmail('');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.headerText}>
          Teacher Dashboard:
        </Text>
        <Text style={styles.textInputTitle}>
          Add a student through their email
        </Text>
        <ScrollView onBlur={Keyboard.dismiss}>
        <View style={styles.addAChildContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter student email"
            value={childEmail}
            autoCapitalize='none'
            onChangeText={(email) => setChildEmail(email)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handlePressAddAChild}
          >
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.viewAllChildbutton}
          onPress={() => {
            navigation.navigate("AllChildrenList", { userUID });
          }}
        >
          <Text style={styles.buttonText}>VIEW ALL STUDENTS</Text>
        </TouchableOpacity>
        {/* <Button title="Menu" onPress={() => navigation.navigate("Menu")} /> */}
        <TouchableOpacity
          style={styles.viewAllChildbutton}
          onPress={() => navigation.navigate("Menu", { userUID })}
        >
          <Text style={styles.buttonText}>Menu</Text>
        </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    padding: 10,
    backgroundColor: "#441196",
    borderWidth: 2,
    borderRadius:5,
    borderColor: "#ffcccc",
    alignSelf: "center",
    margin: "1%",
  },
  viewAllChildbutton: {
    width: 280,
    padding: 12,
    backgroundColor: "#441196",
    borderWidth: 2,
    borderColor: "#ffcccc",
    borderRadius: 5,
    alignSelf: "center",
    margin: "0.5%",
    marginLeft: "1%",
  },
  textInputTitle:{
    color:"#fbedeb",
    marginLeft:"25%",
    fontSize: 18,
    fontWeight:"bold"
  },
  textInput: {
    width: 300,
    borderColor:"#de9999",
    borderWidth: 2,
    padding: 10,
    marginLeft: "25%",
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
    color: "#02042e",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom:"2%"
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
    paddingTop:"1.5%"
  },
});
