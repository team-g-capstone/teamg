import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { addPlayer } from "../../API/gameRoomFB";
import * as firebase from 'firebase';


export default function JoinRoom(props){
  const [gameID, setGameID] = useState("");
  const [gamesArr , setGamesArr] = useState([]);
  const userUID = props.route.params.userUID;
  const firstName = props.route.params.firstName;

  useEffect( ()=>{
    let arrFB=[];
    const db = firebase.firestore();
    db.collection('games').get().then(function(queryShot){
      queryShot.forEach(function(doc){
        arrFB.push(doc.id);
      })
      setGamesArr(arrFB);
    })
  })

  const handlePress = () => {
    let length = gameID.length
    let gameIDUpper= gameID.toUpperCase();
    if(!gameID || length<5 || length>5){
      Alert.alert(`Please enter the 6 alphabet Game ID before pressing "Enter Game Room"`)
    }else if( gamesArr.includes(gameIDUpper)){
      addPlayer(gameIDUpper,userUID, firstName);
      props.navigation.navigate('GameRoom',{
        gameID:gameIDUpper,
        userUID: userUID,
        firstName: firstName,
        })
    }
    else{
      Alert.alert("This is not a valid game ID.")
    }
    setGameID('')
  }

  return (
    <ImageBackground style = {styles.container} source={require("../../assets/backgrounds/green.jpg")}>
      <Text style={styles.text}>Put in the Game ID to enter the game:</Text>
      <ScrollView onBlur={Keyboard.dismiss}>
        <TextInput
          style={styles.emailInput}
          placeholder="Enter GAME ID*"
          value={gameID}
          onChangeText={(gameID) => setGameID(gameID)}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Enter Game Room</Text>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:"8%",
    backgroundColor: "#3FC5AB",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    margin: 10,
    fontWeight: "bold",
    color: "#40434E",
  },
  emailInput: {
    width: 300,
    borderWidth: 3,
    borderColor:"#96C598",
    padding: 10,
    margin: 5,
  },
  passwordInput: {
    width: 300,
    borderWidth: 3,
    borderColor:"#96C598",
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
    backgroundColor: "#8F540E",
    borderWidth: 2,
    borderColor: "#AD8557",
    borderRadius: 15,
    alignSelf: "center",
    margin: 8,
  },
  forgotButton:{
    width: 200,
    padding: 6,
    backgroundColor: "#8F540E",
    borderWidth: 2,
    borderColor: "#AD8557",
    borderRadius: 15,
    alignSelf: "center",
    margin: 5,
  }
});
