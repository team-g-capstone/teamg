import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, Alert, ActivityIndicator,FlatList, Button} from "react-native";
import * as firebase from 'firebase';
import { useDocument } from "react-firebase-hooks/firestore";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {  Divider } from 'react-native-elements';
import { render } from "react-dom";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const Item = ({title})=>(
  <View style={styles.item}>
    <Text style={styles.listItemText}>{title}</Text>
  </View>
)

export default class AllStudentsList extends Component {
  constructor(props){
    super(props);
    this.state={
      studentsArr:[],
      userUID: this.props.route.params.userUID,
    }
    this.handlePress = this.handlePress.bind(this);
  }

  //const navigation = useNavigation();

//let image = require("../../assets/backgrounds/blue.jpg");

componentDidMount(){
  this.getStudentsList();
  // this.setState({studentsArr: studentsList})
}

getStudentsList = async () => {
  try{
    const userUID = this.props.route.params.userUID;
    const snapshot = await firebase.firestore()
    .collection('users')
    .where('teacherUID', '==',userUID)
    .get();

    if(snapshot.empty){
      Alert.alert('There is no students under your profile.')
      return;
    }

    let studentsList = [];
    await snapshot.forEach(doc=>{
     const student = doc.data();
     student.id = doc.id
    // console.log("student", student)
     studentsList.push(student)
    })

    this.setState({studentsArr: [...studentsList]})

  }catch(err){
    Alert.alert("There is an error", err.message)
  }
}


handlePress(studentUID){
  console.log(studentUID)
}
 render()  {
   const studentsArr = this.state.studentsArr;
   const userUID = this.props.route.params.userUID;
   return (
    <ImageBackground style={styles.background} source={require("../../assets/backgrounds/blue.jpg")}>
      <View style={styles.listContainer}>
      <Text style={styles.screenTitle}>Student's List</Text>
      <Text style={styles.screenSubText}>Click on student's name to see their progress or make changes</Text>
        <FlatList
        data={studentsArr}
        renderItem={({item})=>{
          return(
            <View style={styles.listItemContainer}>
            <TouchableOpacity style={styles.listItemTO} onPress={()=>this.props.navigation.navigate('UserStats_TCH', {studentUID:item.id, userUID:userUID})}>
              <Item title ={`${item.firstName} ${item.lastName}`} />
            </TouchableOpacity>
            </View>
          )
        }}
        keyExtractor={item=>item.id}
        />
      </View>
    </ImageBackground>

  )}
 }

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screenTitle: {
    textAlign: "center",
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
    color: "white",
  },
  screenSubText:{
    fontSize:14,
    color:"white",
    fontStyle:"italic",
  },
  listContainer:{
    margin:"1%",
  },
  listItemTO: {
    width:450,
    borderColor:"navy",
    borderWidth:1,
    borderRadius:3,
    backgroundColor:"#b3d9ff",
    padding:"0.5%",
    marginBottom: 8,
  },
  listItemText:{
    color:"#001a33",
    fontSize:20,
  },
  listItemContainer:{
    flex:1,
    flexDirection:"row",
    alignContent:"center"
  }
});
