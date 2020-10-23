import * as firebase from "firebase";
import "firebase/firestore";

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

export async function updateQuestion(gameID,numOne,numTwo,answer,players) {

  const playerOneUID = players[0];
  const playerTwoUID = players[1];
  try {
    let updates={};
    updates['numOne'] = numOne;
    updates['numTwo'] = numTwo;
    updates['answer'] = answer;
    updates['waiting'] = false;
    updates['received'] = 0;
    updates['question'] = firebase.firestore.FieldValue.increment(1);
    updates[`answered${playerOneUID}`] = false;
    updates[`answered${playerTwoUID}`] = false;

    db.collection("games")
      .doc(gameID)
      .update(updates);
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateScore(gameID,key,score) {
  try {
    let updates={};
    updates[key] = firebase.firestore.FieldValue.increment(score);
    updates[`answered${key}`] = true;
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
    updates[`answered${playerID}`] = false;

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

