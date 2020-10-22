import React, {useEffect, useState} from 'react';
import {
  Text,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { addPlayer } from "../../API/gameRoomFB";
import { styles } from "../../styles/JoinRoom.Component.style";
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
          style={styles.input}
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

