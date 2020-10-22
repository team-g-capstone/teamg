import React, {Component, useEffect, useState} from 'react';
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

import * as firebase from 'firebase';

export default class EndGameRoom extends Component{
  //const [gameID, setGameID] = useState(props.route.params.gameID);
  constructor(props){
    super(props);
    this.state = {
      gameID: this.props.route.params.gameID,
      players:[],
      playersName:[],
    }
  }




  render(){
  return (
    <ImageBackground style = {styles.container} source={require("../../assets/backgrounds/green.jpg")}>
      <Text style={styles.text}>The game has ended:</Text>
      {/* <ScrollView onBlur={Keyboard.dismiss}>
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

      </ScrollView> */}
    </ImageBackground>
  );
}
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
