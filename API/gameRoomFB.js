import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from 'react-native';
import { diffClamp } from "react-native-reanimated";

const db = firebase.firestore();

export async function createNewGame(gameID,userUID) {
  try {
    db.collection("games")
      .doc(gameID)
      .set({
        creator:userUID,
        date: Date.now(),
        status: false,
        waiting:true,
        players:[],
        question:0,
        gameEnded: false,
      });
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateQuestion(gameID,numOne,numTwo,answer) {
  try {
    db.collection("games")
      .doc(gameID)
      .update({
        numOne: numOne,
        numTwo: numTwo,
        answer: answer,
        waiting: false,
        received:0,
        question: firebase.firestore.FieldValue.increment(1)
      });
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateScore(gameID,key,score) {
  try {
    let updates={};
    updates[key] = firebase.firestore.FieldValue.increment(score);
    updates['received'] = firebase.firestore.FieldValue.increment(1);
    updates['waiting'] = true;

    db.collection("games")
      .doc(gameID)
      .update(updates);
  } catch (err) {
    console.log(err.message);
  }
}

export async function addPlayer(gameID,playerID, playerFirstName) {
  try {
    let updates={};
    updates['playersName'] =  firebase.firestore.FieldValue.arrayUnion(playerFirstName);
    updates['players'] = firebase.firestore.FieldValue.arrayUnion(playerID);
    updates[playerID]=0;

    db.collection("games")
      .doc(gameID)
      .update(updates);
  } catch (err) {
    console.log(err.message)
  }
}

export async function endGameFS (gameID) {
  try {
    db.collection("games")
      .doc(gameID)
      .update({
        gameEnded:true,
      });
  } catch (err) {
    console.log(err.message);
  }
}

