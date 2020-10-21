import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from 'react-native';

const db = firebase.firestore();

// function getRandomIntArr(min, max) {
//   let arr=[];
// for(let i =0; i<10; i++){
//   let num1 = Math.floor(Math.random() * (max - min) + min);
//   let num2 = Math.floor(Math.random() * (max - min) + min);
//   arr.push(num1, num2, num1+num2)
// }
//   return arr;
// }

export async function createNewGame(gameID,userUID,min, max) {
  try {
    db.collection("games")
      .doc(gameID)
      .set({
        creator:userUID,
        date: Date.now(),
        status: false,
        waiting:true,
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
    updates['numOne'] = '';
    updates['numTwo'] = '';
    updates['answer'] = '';


    db.collection("games")
      .doc(gameID)
      .update(updates);
  } catch (err) {
    console.log(err.message);
  }
}

export async function addPlayer(gameID,playerID) {
  try {
    let updates={};
    updates['players'] = firebase.firestore.FieldValue.arrayUnion(playerID);
    updates[playerID]=0;

    db.collection("games")
      .doc(gameID)
      .update(updates);
  } catch (err) {
   return Alert.alert("Error", err.message)
  }
}
