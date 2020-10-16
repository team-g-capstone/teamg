import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, Alert, ActivityIndicator} from "react-native";
import * as firebase from 'firebase';
import { useDocument } from "react-firebase-hooks/firestore";
import {FlatList, ScrollView } from "react-native-gesture-handler";
import { ListItem, Divider } from 'react-native-elements';

export default function AllChildList(props) {
  const navigation = useNavigation();
  const userUID = props.route.params.userUID;
  let studentsList =[];

  let image = require("../../assets/backgrounds/blue.jpg");

  const getStudents = async () => {
    const snapshot = await firebase.firestore().collection('users').where('teacherUID', '==',userUID).get();

    if(snapshot.empty){
      Alert.alert('There is no students under your profile.')
      return;
    }

    snapshot.forEach(doc=>{
      const student = doc.data();
      student.id = doc.id
      console.log("student", student)
      studentsList.push(student)
      console.log("studentList", studentsList, "studentsList end")
    })
  };

getStudents()



  return (
   <View style={styles.container}>
  {/* //     <ImageBackground source={image} style={styles.image}> */}
      <Text style={styles.textList}>All children list under construction</Text>
       {studentsList? studentsList.map((student)=>{
        <> <Text style={styles.textList}> 1. {student.firstName}</Text></>
       }):<Text>List is empty</Text>}
      {/* // </ImageBackground> */}
      </View>

  )}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textList: {
    textAlign: "center",
    fontSize: 15,
    margin: 10,
    fontWeight: "bold",
    color: "black",
  },
  image: {
    flex: 1,
    paddingTop:"2%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems:"center",
    height: "100%",
    width: "100%",
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8
  },
});
