import React, { Component } from "react";
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
  ActivityIndicator,
} from "react-native";
import { endGameFS, updateQuestion, updateScore } from "../../API/gameRoomFB";
import * as firebase from "firebase";
import styles from "../../styles/GameRoom.Component.style.js";

let unsubscribed;
export default class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameID: this.props.route.params.gameID,
      userUID: this.props.route.params.userUID,
      firstName: this.props.route.params.firstName,
      status: false,
      waiting: "",
      questions: [],
      creator: "",
      received: "",
      players: [],
      numOne: 0,
      numTwo: 0,
      answer: 0,
      numOneFS: 0,
      numTwoFS: 0,
      answerFS: 0,
      inputAnswer: 0,
      score: 0,
      isSubmitted: false,
      gameEnded: "",
    };

    this.handlePressUpdateQuestion = this.handlePressUpdateQuestion.bind(this);
    this.handlePressSubmitAnswer = this.handlePressSubmitAnswer.bind(this);
    this.handleChangeNumOne = this.handleChangeNumOne.bind(this);
    this.handlePressEndGame = this.handlePressEndGame.bind(this);
  }
  //Listen to Host
  componentDidMount() {
    this.db = firebase.firestore();
    unsubscribed = this.db
      .collection("games")
      .doc(this.state.gameID)
      .onSnapshot((snapshot) => {
        let data = {};
        let userUID = this.props.route.params.userUID;
        data["status"] = snapshot.data().status;
        data["score"] = snapshot.data()[userUID];
        data["creator"] = snapshot.data().creator;
        data["numOneFS"] = snapshot.data().numOne;
        data["numTwoFS"] = snapshot.data().numTwo;
        data["answerFS"] = snapshot.data().answer;
        data["waiting"] = snapshot.data().waiting;
        data["received"] = snapshot.data().received;
        data["players"] = snapshot.data().players;
        data["question"] = snapshot.data().question;
        data["gameEnded"] = snapshot.data().gameEnded;
        this.setState(data);
      });
  }

  handlePressUpdateQuestion = () => {
    let { gameID, numOne, numTwo } = this.state;
    let answer = Number(numOne) + Number(numTwo);
    this.setState({
      answer: answer,
      waiting: false,
    });
    updateQuestion(gameID, Number(numOne), Number(numTwo), answer);
  };

  handlePressSubmitAnswer = () => {
    let { gameID, answerFS, inputAnswer, userUID } = this.state;
    let score = 0;
    if (!inputAnswer) {
      return Alert.alert("Please enter your answer");
    }

    if (answerFS === Number(inputAnswer)) {
      score = 1;
      Alert.alert("You got it!");
      this.setState({ isSubmitted: true });
    } else {
      Alert.alert("Sorry, incorrect!");
      this.setState({ isSubmitted: true });
    }
    updateScore(gameID, userUID, score);
    this.setState({ inputAnswer: "" });
  };

  handleChangeNumOne = (num) => {
    if (this.state.creator === this.state.userUID) {
      this.setState({ numOne: num });
    } else {
      Alert.alert("Not authorized");
    }
  };

  handleChangeNumTwo = (num) => {
    if (this.state.creator === this.state.userUID) {
      this.setState({ numTwo: num });
    } else {
      Alert.alert("Not authorized");
    }
  };

  handlePressEndGame = () => {
    const gameID = this.state.gameID;
    const userUID = this.props.route.params.userUID;
    endGameFS(gameID);
    this.props.navigation.navigate("EndGameRoom", { gameID, userUID });
    unsubscribed();
  };
  render() {
    const isHost = this.state.creator === this.state.userUID;
    const waitingRes = this.state.waiting;
    const isSubmitted = this.state.isSubmitted;
    const gameEnded = this.state.gameEnded;
    if (gameEnded) {
      return (
        <ImageBackground
          style={styles.background}
          source={require("../../assets/backgrounds/yellow.jpg")}
        >
          <Text style={styles.endScreenTitle}>
            This Game ID {this.state.gameID} has ENDED.
          </Text>
          <ActivityIndicator />

          <TouchableOpacity
            style={styles.endButton}
            onPress={() =>
              this.props.navigation.navigate("Menu", {
                screen: "MainMenuNav",
                params: { userUID: this.state.userUID },
              })
            }
          >
            <Text style={styles.endButtonText}> MAIN MENU</Text>
          </TouchableOpacity>
        </ImageBackground>
      );
    } else if (this.state.players.length < 2) {
      return (
        <ImageBackground
          style={styles.background}
          source={require("../../assets/backgrounds/yellow.jpg")}
        >
          <Text style={styles.screenTitle}>
            Waiting for players to join GAME ID: {this.state.gameID}
          </Text>
          <ActivityIndicator />
          <Button
            title="EXIT GAME"
            onPress={() =>
              this.props.navigation.navigate("Menu", {
                screen: "MainMenuNav",
                params: { userUID: this.state.userUID },
              })
            }
          />
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          style={styles.background}
          source={require("../../assets/backgrounds/blue.jpg")}
        >
          <Text
            style={styles.title}
          >{`${this.state.firstName}, Welcome to Game Room: ${this.state.gameID}`}</Text>
          {isHost ? (
            <>
              <Text style={styles.subtext}>
                Question Number: {this.state.question}
              </Text>
              <Text style={styles.subtext}>
                Responses received: {this.state.received}
              </Text>
              <View style={styles.qContainer}>
                <TextInput
                  style={styles.holder}
                  placeholder="NUMONE"
                  value={this.state.numOne}
                  onChangeText={(num) => this.handleChangeNumOne(num)}
                />
                <Text style={styles.plus}>+ </Text>
                <TextInput
                  style={styles.holder}
                  placeholder="NUMTWO"
                  value={this.state.numTwo}
                  onChangeText={(num) => this.handleChangeNumTwo(num)}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.subtext}>Score: {this.state.score}</Text>

              <View style={styles.qContainer}>
                <Text style={styles.qAnswerContainer}>
                  {this.state.numOneFS}
                </Text>
                <Text style={styles.plus}>+ </Text>
                <Text style={styles.qAnswerContainer}>
                  {this.state.numTwoFS}
                </Text>
                <Text style={styles.plus}>= </Text>
                <TextInput
                  style={styles.ansholder}
                  placeholder="ANS"
                  value={this.state.inputAnswer}
                  onChangeText={(ans) => this.setState({ inputAnswer: ans })}
                />
              </View>
            </>
          )}

          {isHost ? (
            // <View>
            <TouchableOpacity
              onPress={this.handlePressUpdateQuestion}
              style={styles.updateButton}
            >
              <Text style={styles.updateButtonText}>Update Question</Text>
            </TouchableOpacity>
          ) : (
            //</View>
            //<View>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={this.handlePressSubmitAnswer}
            >
              <Text style={styles.updateButtonText}>SUBMIT</Text>
            </TouchableOpacity>
            // </View>
          )}

          {isHost ? (
            waitingRes ? (
              // <View>
              <Text style={styles.waitingTitle}>Please update Question</Text>
            ) : (
              <Text style={styles.waitingTitle}>Waiting for answer...</Text>
            )
          ) : waitingRes ? (
            isSubmitted ? (
              <Text style={styles.waitingTitle}>
                Waiting for others to answer or new question...{" "}
              </Text>
            ) : (
              <Text style={styles.waitingTitle}>Ready???</Text>
            )
          ) : (
            <Text style={styles.waitingTitle}>Please enter your answer</Text>
          )}

          <View style={styles.endContainer}>
            <TouchableOpacity
              style={styles.buttonExit}
              onPress={() =>
                this.props.navigation.navigate("Menu", {
                  screen: "MainMenuNav",
                  params: { userUID: this.state.userUID },
                })
              }
            >
              <Text style={styles.buttonTextExit}>Leave Game</Text>
            </TouchableOpacity>
            {/* </View> */}

            {isHost ? (
              <TouchableOpacity
                style={styles.buttonExit}
                onPress={this.handlePressEndGame}
              >
                <Text style={styles.buttonTextExit}>End Game</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ImageBackground>
      );
    }
  }
}
