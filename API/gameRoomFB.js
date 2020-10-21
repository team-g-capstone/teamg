import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from 'react-native';

const db = firebase.firestore();

function getRandomIntArr(min, max) {
  let arr=[];
for(let i =0; i<10; i++){
  let num1 = Math.floor(Math.random() * (max - min) + min);
  let num2 = Math.floor(Math.random() * (max - min) + min);
  arr.push(num1, num2, num1+num2)
}
  return arr;
}

export async function createNewGame(gameID,userUID,min, max) {
  try {
    const questionsArr = getRandomIntArr(min, max)

    db.collection("games")
      .doc(gameID)
      .set({
        creator:userUID,
        date: Date.now(),
        questions: questionsArr,
        status: false,
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
        numTwo:numTwo,
        answer: answer,
      });
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateScore(gameID,key) {
  try {
    let updates={};
    updates[key] = firebase.firestore.FieldValue.increment(1);

    db.collection("games")
      .doc(gameID)
      .update(updates);
  } catch (err) {
    console.log(err.message);
  }
}
