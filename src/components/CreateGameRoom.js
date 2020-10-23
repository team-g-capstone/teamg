import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  Alert} from 'react-native';
import { createNewGame } from "../../API/gameRoomFB";
import styles from "../../styles/CreateGameRoom.Component.style";

export default class CreateGameRoom extends Component {
    constructor(props){
      super(props);
      this.state = {
        gameID:'',
        firstName: this.props.route.params.firstName,
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
      let newGameID = this.generateGameID();
      this.setState({gameID: newGameID})
    }

    handlePressCreateGame = () =>{
      if(!this.state.gameID){
        Alert.alert(`Error: Please make sure you click on "Generate Game ID" before "Create Game"`)
      }

      const userUID = this.props.route.params.userUID;
      const {gameID, firstName} = this.state;

      createNewGame(gameID, userUID);
      
      this.props.navigation.navigate("GameRoom",{userUID:userUID, gameID:gameID,firstName:firstName})

    }

    render(){
      const {userUID,firstName} =this.props.route.params;
      return(
      <ImageBackground style={styles.background} source={require("../../assets/backgrounds/blue.jpg")}>
        <View style={styles.container}>
         <Text style={styles.screenTitle}>Create a Game Room</Text>
         <Text style={styles.steps}>{`Step One: Click "Generate Game ID" to get a new Game ID`}</Text>
         <TouchableOpacity style={styles.button} onPress={this.handlePressGenerateGameID}>
         <Text style={styles.buttonText}>Generate Game ID</Text>
         </TouchableOpacity>
        
        <Text style={styles.steps}>{`Step Two: Let your student know the Game ID: ${this.state.gameID}`}</Text>
        <Text style={styles.steps}>{`Step Three: Click "Create Game" to enter the room`}</Text>
        <TouchableOpacity style={styles.button} onPress={this.handlePressCreateGame}>
        <Text style={styles.buttonText}>Create Game</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Games", {
                  screen:"JoinRoom",
                  params:{ userUID, firstName }})
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>
               Return to an existing Game Room
              </Text>
            </TouchableOpacity>
      </ImageBackground>
      )}
  }
