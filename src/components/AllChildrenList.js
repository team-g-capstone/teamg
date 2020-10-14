import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, ImageBackground, Alert, ActivityIndicator } from "react-native";
import * as firebase from 'firebase';
import { useDocument } from "react-firebase-hooks/firestore";
import { ScrollView } from "react-native-gesture-handler";

export default function AllChildList(props) {
  const navigation = useNavigation();
  const userUID = props.route.params.userUID;
  const [value, loading, error] = useDocument(firebase.firestore().collection('users').doc(userUID))
  let image = require("../../assets/backgrounds/blue.jpg");

  if(error){
    Alert.alert("There is an error", error)
  }else if (loading){
    return <ActivityIndicator size="large"/>
  }else if(value && value.data()){
    let childrenFB = value.data().children;
    // childrenFB.forEach((childUID)=> {
    //   const [value, loading, error] = useDocument(firebase.firestore().collection('users').doc(childUID))

    // })
  return (

      <ImageBackground source={image} style={styles.image}>
      <Text>All children list </Text>
      <ScrollView>

      </ScrollView>
      </ImageBackground>

  )}
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    paddingTop:"2%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems:"center",
    height: "100%",
    width: "100%",
  },
});
