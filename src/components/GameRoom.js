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
        questions:[],
        creator:"",
        numOne:0,
        numTwo:0,
        answer:0,
        inputAnswer:0,
        score:0,
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
             let updates={};
             let userUID = this.props.route.params.userUID;
             updates['status'] = snapshot.data().status;
             updates['score'] = snapshot.data()[userUID];
             updates['creator'] = snapshot.data().creator;
             this.setState(updates);

            })

    }


    handlePressUpdateQuestion= () =>{
      let {gameID, numOne,numTwo} = this.state;
      let answer = Number(numOne)+ Number(numTwo);
      this.setState({answer: answer})
      updateQuestion(gameID,numOne, numTwo, answer);
    }

    handlePressSubmitAnswer= () =>{
      let {gameID, answer, inputAnswer, userUID} = this.state;
      console.log("answer", typeof answer)
      console.log("inputAnswer", typeof inputAnswer)
      if(answer === Number(inputAnswer)){
        let key = userUID;
        updateScore(gameID, key);
        Alert.alert('You got it!')
      }else{
        Alert.alert('Sorry, incorrect!')
      }
      this.setState({
        numOne:'',
        numTwo:'',
        answer:'',
        inputAnswer:'',
      })
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
      const {creator, userUID} = this.state;

      if(!this.state.status){
        return <ActivityIndicator size='large'/>
      }else{
      return(
      <ImageBackground style={styles.background} source={require("../../assets/backgrounds/blue.jpg")}>
         <Text styles={styles.screenTitle}>Welcome to Game Room:{this.state.gameID}</Text>
         <Text styles={styles.screenTitle}>Score:</Text>
         <TextInput
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
        <Text>=</Text>
         <TextInput
          style={styles.ansholder}
          placeholder="ANS"
          value={this.state.inputAnswer}
          onChangeText={(ans) => this.setState({inputAnswer:ans})}
        />
       <TouchableOpacity onPress={this.handlePressUpdateQuestion}>
        <Text style={styles.screenTitle}>Update Question</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.handlePressSubmitAnswer}>
        <Text style={styles.screenTitle}>Submit Answer</Text>
      </TouchableOpacity>
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
