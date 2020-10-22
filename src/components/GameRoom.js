import React, {Component} from 'react';
import {
  Button,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  StyleSheet,
  ImageBackground,
  ActivityIndicator} from "react-native";
  import { endGameFS, updateQuestion, updateScore } from "../../API/gameRoomFB"
import * as firebase from "firebase";

  export default class GameRoom extends Component {
    constructor(props){
      super(props);
      this.state = {
        gameID:this.props.route.params.gameID,
        userUID:this.props.route.params.userUID,
        firstName: this.props.route.params.firstName,
        status: false,
        waiting:"",
        questions:[],
        creator:"",
        received:"",
        players:[],
        numOne:0,
        numTwo:0,
        answer:0,
        numOneFS:0,
        numTwoFS:0,
        answerFS:0,
        inputAnswer:0,
        score:0,
        isSubmitted: false,
        gameEnded:'',
      }

      this.handlePressUpdateQuestion = this.handlePressUpdateQuestion.bind(this);
      this.handlePressSubmitAnswer = this.handlePressSubmitAnswer.bind(this);
      this.handleChangeNumOne = this.handleChangeNumOne.bind(this);
      this.handlePressEndGame = this.handlePressEndGame.bind(this);
    }
    //Listen to Host
    componentDidMount(){
      this.db = firebase.firestore();
      this.db.collection('games')
            .doc(this.state.gameID)
            .onSnapshot((snapshot)=>{
             let data={};
             let userUID = this.props.route.params.userUID;
             data['status'] = snapshot.data().status;
             data['score'] = snapshot.data()[userUID];
             data['creator'] = snapshot.data().creator;
             data['numOneFS'] = snapshot.data().numOne;
             data['numTwoFS'] = snapshot.data().numTwo;
             data['answerFS'] = snapshot.data().answer;
             data['waiting'] = snapshot.data().waiting;
             data['received'] = snapshot.data().received;
             data['players'] = snapshot.data().players;
             data['question'] = snapshot.data().question;
             data['gameEnded'] = snapshot.data().gameEnded;
             this.setState(data);
            })

    }

    handlePressUpdateQuestion= () =>{
      let {gameID, numOne,numTwo} = this.state;
      let answer = Number(numOne)+ Number(numTwo);
      this.setState({
        answer: answer,
        waiting:false ,
        isSubmitted:false,
      })
      updateQuestion(gameID,Number(numOne), Number(numTwo), answer);
    }

    handlePressSubmitAnswer= () =>{
      let {gameID, answerFS, inputAnswer, userUID} = this.state;
      let score = 0;
      if(!inputAnswer){
         return Alert.alert('Please enter your answer')
      }

      if(answerFS === Number(inputAnswer)){
        score =1
        Alert.alert('You got it!')
      }else{
        Alert.alert('Sorry, incorrect!')
      }
      updateScore(gameID, userUID,score);
      this.setState({inputAnswer:'', isSubmitted:true})
    }

    handleChangeNumOne = (num) =>{
      if(this.state.creator === this.state.userUID){
        this.setState({numOne:num})
      }else{
        Alert.alert('Not authorized')
      }
    }

    handleChangeNumTwo = (num) =>{
      if(this.state.creator === this.state.userUID){
        this.setState({numTwo:num})

      }else{
        Alert.alert('Not authorized')
      }
    }

    handlePressEndGame = () =>{
      const gameID = this.state.gameID;
      endGameFS(gameID);
      this.props.navigation.navigate('EndGameRoom',{gameID})
    }
    render(){
      const isHost = this.state.creator === this.state.userUID;
      const waitingRes = this.state.waiting;
      const isSubmitted = this.state.isSubmitted;
      const gameEnded = this.state.gameEnded;
      if(gameEnded){
        return(
          <ImageBackground style={styles.background} source={require("../../assets/backgrounds/yellow.jpg")}>
          <Text style={styles.screenTitle}>This Game ID {this.state.gameID} has ENDED.</Text>
          <ActivityIndicator/>
          <Button title="MAIN MENU" onPress={()=>this.props.navigation.navigate('Menu',{
            screen:"MainMenuNav",
            params:{userUID:this.state.userUID}
          })}/>
        </ImageBackground>

        )
      }
      else if(this.state.players.length < 2){
        return (
        <ImageBackground style={styles.background} source={require("../../assets/backgrounds/yellow.jpg")}>
          <Text style={styles.screenTitle}>Waiting for players to join GAME ID: {this.state.gameID}</Text>
          <ActivityIndicator/>
          <Button title="EXIT GAME" onPress={()=>this.props.navigation.navigate('Menu',{
            screen:"MainMenuNav",
            params:{userUID:this.state.userUID}
          })}/>
        </ImageBackground>
        )
      }else{
      return(
      <ImageBackground style={styles.background} source={require("../../assets/backgrounds/blue.jpg")}>
         <Text styles={styles.title}>{`${this.state.firstName} Welcome to Game Room:${this.state.gameID}`}</Text>
      {isHost? <><Text>Question Number: {this.state.question}</Text><Text>Response received: {this.state.received}</Text><TextInput
          style={styles.holder}
          placeholder="NUMONE"
          value={this.state.numOne}
          onChangeText={(num)=> this.handleChangeNumOne(num)}
        />
        <Text>+</Text>
        <TextInput
          style={styles.holder}
          placeholder="NUMTWO"
          value={this.state.numTwo}
          onChangeText={(num)=> this.handleChangeNumTwo(num)}
        />
        </>:<><Text styles={styles.screenTitle}>Score:{this.state.score}</Text>
      <Text>{this.state.numOneFS}+</Text>
      <Text>{this.state.numTwoFS}</Text>
        <Text>=</Text>
        <TextInput
          style={styles.ansholder}
          placeholder="ANS"
          value={this.state.inputAnswer}
          onChangeText={(ans) => this.setState({inputAnswer:ans})}
        />
        </>}


       {isHost? <TouchableOpacity onPress={this.handlePressUpdateQuestion}>
        <Text style={styles.screenTitle}>Update Question</Text>
      </TouchableOpacity>
      : <TouchableOpacity style={styles.button} onPress={this.handlePressSubmitAnswer}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>}
      {isHost? waitingRes?<Text style={styles.waitingTitle}>Please update Question</Text>:<Text style={styles.waitingTitle}>Waiting for answer</Text>:waitingRes?
        isSubmitted? <Text style={styles.waitingTitle}>Waiting for others to answer or new question </Text>:<Text style={styles.waitingTitle}>Ready???</Text>: <Text style={styles.waitingTitle}>NEW QUESTION PLEASE ENTER YOUR ANSWER</Text>
    }
    <Button title="EXIT GAME" onPress={()=>this.props.navigation.navigate('Menu',{
            screen:"MainMenuNav",
            params:{userUID:this.state.userUID}
          })}/>
          {isHost? <Button style={styles.endGameText} title="END GAME" onPress={this.handlePressEndGame}/>:null}
      </ImageBackground>
      )}

    }
  }

 const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
    width:"25%",
    height:"7%",
    backgroundColor:"navy",
    marginTop:"2%"

  },
  buttonText:{
    fontSize:20,
    fontWeight:"bold",
    color:"white",
    paddingBottom:"2%",
    paddingTop:"2%",
    textAlign:"center",
    textAlignVertical:"center"
  },
  endGameText:{
    color:"red",
  },
  holder:{
    height:50,
    width:50,
    backgroundColor:"red",
  },
  ansholder:{
    height:50,
    width:50,
    backgroundColor:"blue",
  },

  number:{
    color:"white",
  },
  waitingTitle: {
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
    color: "red",
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
  title:{
    color:"red"
  }
})
