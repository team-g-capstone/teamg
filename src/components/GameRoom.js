import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  StyleSheet,
  ImageBackground,
  ActivityIndicator} from "react-native";
  import { updateQuestion, updateScore } from "../../API/gameRoomFB"
import * as firebase from "firebase";

  export default class GameRoom extends Component {
    constructor(props){
      super(props);
      this.state = {
        gameID:this.props.route.params.gameID,
        userUID:this.props.route.params.userUID,
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
      }

      this.handlePressUpdateQuestion = this.handlePressUpdateQuestion.bind(this);
      this.handlePressSubmitAnswer = this.handlePressSubmitAnswer.bind(this);
      this.handleChangeNumOne = this.handleChangeNumOne.bind(this);
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
             this.setState(data);
            })

    }

    handlePressUpdateQuestion= () =>{
      let {gameID, numOne,numTwo} = this.state;
      let answer = Number(numOne)+ Number(numTwo);
      this.setState({
        answer: answer,
        waiting:false ,

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


    render(){
      const isHost = this.state.creator === this.state.userUID;
      const waitingRes = this.state.waiting;
      const isSubmitted = this.state.isSubmitted;

      if(this.state.players.length < 2){
        return <ActivityIndicator size='large'/>
      }else{
      return(
      <ImageBackground style={styles.background} source={require("../../assets/backgrounds/blue.jpg")}>
         <Text styles={styles.screenTitle}>Welcome to Game Room:{this.state.gameID}</Text>
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
      : <TouchableOpacity onPress={this.handlePressSubmitAnswer}>
        <Text style={styles.screenTitle}>Submit Answer</Text>
      </TouchableOpacity>}
      {isHost? waitingRes?<Text style={styles.waitingTitle}>Please update Question</Text>:<Text style={styles.waitingTitle}>Waiting for answer</Text>:waitingRes?
        isSubmitted? <Text>Waiting for others to answer or new question </Text>:null: <Text style={styles.waitingTitle}>NEW QUESTION PLEASE ENTER YOUR ANSWER</Text>
    }
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
    fontSize: 15,
    margin: 10,
    fontWeight: "bold",
    color: "white",
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
