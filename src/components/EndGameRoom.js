import React, { Component } from "react";
import { Text, View, ImageBackground } from "react-native";
import * as firebase from "firebase";
import { styles } from "../../styles/EndGameRoom.Component.style";
import { TouchableOpacity } from "react-native-gesture-handler";

let unsubscribed;
export default class EndGameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameID: this.props.route.params.gameID,
      players: [],
      playersName: [],
      scores: [],
    };
    this.handlePressMainMenu = this.handlePressMainMenu.bind(this);
  }

  componentDidMount() {
    this.db = firebase.firestore();
    unsubscribed = this.db
      .collection("games")
      .doc(this.state.gameID)
      .onSnapshot((snapshot) => {
        let data = {};
        data["players"] = snapshot.data().players;
        data["playersName"] = snapshot.data().playersName;
        this.setState(data);

        let scoreArr = [];
        let playersArr = this.state.players;
        playersArr.forEach((playerID) => {
          scoreArr.push(snapshot.data()[playerID]);
          this.setState({ scores: scoreArr });
        });
      });

  }
   handlePressMainMenu =()=>{

    this.props.navigation.navigate("Menu", {
      screen: "MainMenuNav",
      params: { userUID: this.props.route.params.userUID },
    })
    unsubscribed();
   }
  render() {
    const playerNameLists = this.state.playersName.map((name, idx) => {
      return (
        <View style={styles.playersList} key={idx}>
          <Text style={styles.listText}>
            {`${name}:  `} {this.state.scores[idx]}
          </Text>
        </View>
      );
    });
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/backgrounds/green.jpg")}
      >
        <Text style={styles.titleText}>The game has ended:</Text>
        <Text style={styles.subTitleText}>SCOREBOARD</Text>
        <View style={styles.listView}>{playerNameLists}</View>
        <TouchableOpacity
          style={styles.touchButton}
          onPress={this.handlePressMainMenu}
        >
          <Text style={styles.button}> MAIN MENU</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
