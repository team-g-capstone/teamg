import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  ImageBackground,
  Alert,
  ScrollView,
  Keyboard
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../styles/TeacherEditStudent.Component.style";
import * as firebase from "firebase";

import { useDocument } from "react-firebase-hooks/firestore";

export default function TeacherEditStudent(props) {
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

      <ImageBackground style={styles.image} source={image} style={styles.image}>
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
            navigation.navigate("AllStudentsList", { userUID });
          }}
        >
          <Text style={styles.buttonText}>VIEW ALL STUDENTS</Text>
        </TouchableOpacity>
        {/* <Button title="Menu" onPress={() => navigation.navigate("Menu")} /> */}
        <TouchableOpacity
          style={styles.viewAllChildbutton}
          onPress={() => navigation.navigate("MainMenuNav", { userUID })}
        >
          <Text style={styles.buttonText}>Main Menu</Text>
        </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
  );
}

