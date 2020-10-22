import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button
  } from 'react-native';

import * as firebase from 'firebase';

export default class EndGameRoom extends Component{
  constructor(props){
    super(props);
    this.state = {
      gameID: this.props.route.params.gameID,
      players:[],
      playersName:[],
      scores:[]
    }
  }

  componentDidMount(){
    this.db = firebase.firestore();
    this.db.collection('games')
          .doc(this.state.gameID)
          .onSnapshot((snapshot)=>{
           let data={};
           data['players'] = snapshot.data().players;
           data['playersName'] = snapshot.data().playersName;
           this.setState(data);

           let scoreArr=[];
           let playersArr = this.state.players;
           playersArr.forEach((playerID)=>{
              scoreArr.push(snapshot.data()[playerID])
              this.setState({scores:scoreArr})
            })
          })
  }

  render(){

    const playerNameLists = this.state.playersName.map((name, idx)=>{
        return (
        <View style={styles.playersList}key={idx}><Text>{name}: {this.state.scores[idx]}</Text></View>
        )
    })



    return (
      <ImageBackground style = {styles.container} source={require("../../assets/backgrounds/green.jpg")}>
      <Text style={styles.text}>The game has ended:</Text>
      <View style={styles.listView}>{playerNameLists}</View>
      <Button title="MAIN MENU" onPress={()=>this.props.navigation.navigate('Menu',{
            screen:"MainMenuNav",
            params:{userUID:this.props.route.params.userUID}
          })}/>
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
  },
  listView:{
    flexDirection:"column",
  },
  scoresLists:{
    flexDirection:"row"
  },
  playersList:{
    flexDirection:"row"
  }
});
