import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { createNewGame } from "../../API/gameRoomFB";


export default class CreateGameRoom extends Component {
    constructor(props){
      super(props);
      this.state = {
        gameID:'',
        max:'',
        min:'',
        isLoading:false,
      }
      this.handlePressGenerateGameID = this.handlePressGenerateGameID.bind(this);
      this.handlePressCreateGame = this.handlePressCreateGame.bind(this);
    }

    generateGameID() {
      let gameID = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (let i = 0; i < 5; i++) {
        gameID += characters.charAt(Math.floor(Math.random()*(characters.length)));
      }
      return gameID;
    }


    handlePressGenerateGameID = () =>{
      if(!this.state.min || !this.state.max){
        Alert.alert("Error: Please enter both MIN and MAX value before generating the Game ID")
      }
      let newGameID = this.generateGameID();
      this.setState({gameID: newGameID})
    }

    handlePressCreateGame = () =>{
      if(!this.state.gameID){
        Alert.alert(`Error: Please make sure you click on "Generate Game ID" before "Create Game"`)
      }

      const userUID = this.props.route.params.userUID
      const gameID = this.state.gameID;
      console.log(gameID);
      createNewGame(gameID, userUID, this.state.min,this.state.max);
      this.props.navigation.navigate("GameRoom",{userUID, gameID})
    }

    render(){
      return(
      <ImageBackground style={styles.background} source={require("../../assets/backgrounds/blue.jpg")}>
        <Text>MIN</Text>
        <TextInput
          style={styles.textInput}
          placeholder="MIN"
          value={this.state.min}
          onChangeText={(min) => this.setState({min:min})}
        />
        <Text>MAX</Text>
        <TextInput
          style={styles.textInput}
          placeholder="MAX"
          value={this.state.max}
          onChangeText={(max) => this.setState({max:max})}
        />
       <TouchableOpacity onPress={this.handlePressGenerateGameID}>
        <Text style={styles.screenTitle}>Generate Game ID</Text>
      </TouchableOpacity>
        <Text styles={styles.screenTitle}>Game ID:{this.state.gameID}</Text>
        <TouchableOpacity onPress={this.handlePressCreateGame}>
        <Text style={styles.screenTitle}>Create Game</Text>
      </TouchableOpacity>
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
  textInput: {
    width: 250,
    borderWidth: 1,
    borderColor:"#6DA171",
    padding: 10,
    margin: "0.2%",
  },
})
