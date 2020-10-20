
import React from "react";
import { StyleSheet, Text, View,  ImageBackground, Dimensions, TouchableOpacity, Alert} from "react-native";
import ColorSortCircles from './ColorSortCircles'
import {resetSorted} from '../redux/reducers/colorSortReducer'
import {connect} from 'react-redux'
import {addLogicLevelThunk, resetLevelThunk} from '../redux/reducers/logicLevelReducer'
import {levelChanges} from './ShapesHelperFuncs'
import {useDocument} from "react-firebase-hooks/firestore";
import * as firebase from 'firebase';
import { setLevelThunk } from "../redux/reducers/logicLevelReducer";


let {height, width} = Dimensions.get('window')

height > width ? width = height : width = width



function ColorSortGame(props) {
  let numOfCirlces = [];
  const userUID = props.route.params.userUID
  const [value, loading, error] = useDocument(
    firebase.firestore().collection("users").doc(userUID)
  );

  let level;
  if(value && value.data()){
    let logicScoresArrFB = value.data().logicScores;

    let levelFromFS = logicScoresArrFB.reduce((accum, elem)=>{
      if(elem === true){
        return accum+1;
      }
      return accum;
    },0)

    if(levelFromFS < 10){
      level = levelFromFS + 1;
      props.setLevel(level);
    }

  }

  level = props.level;
  //const level = props.level

  let indexBase;
  let num;

  if(level <= 10) {
    const array = levelChanges(level, indexBase)


  num = array[0]
  indexBase = array[1]
  for (let i = 1; i <= num; i++) {
    numOfCirlces.push(i)
  }
  } else {
    indexBase = 100;
  }







  let image = require('../../assets/backgrounds/blue.jpg')


  const updateLogicScores = async () => {
    let currentUser =  await firebase.auth().currentUser;

    if(!currentUser.isAnonymous){
      let logicScores = value.data().logicScores;
      let levelToFS = level -1;
      let logicScoresNew = logicScores.map((score,idx)=> idx === levelToFS? true:score);

      let userDocument = await firebase.firestore().collection('users').doc(userUID).get();
      userDocument.ref.update({
        logicScores:logicScoresNew
      })
    }

  }
   const handlePress = () => {

   if(level < 10) {
    updateLogicScores();

    props.reset()
    props.addLevel()
    numOfCirlces = []
    Alert.alert(`Congratulations`, `You've made it to level ${level + 1}`, [
      {

        onPress: () => props.navigation.navigate('ColorSortGame', {userUID}),
      },
    ])

   } else if (level >= 10) {
     props.reset()
     console.log('HELLo')
     updateLogicScores();




    Alert.alert(`Congratulations, you beat all ten levels!`, `You're a logic genius!!`, [
      {

        onPress: () => props.navigation.navigate('Subjects', {userUID}),
      },
    ])
    props.addLevel()
   }

  };

  const handleReset = () => {
    props.resetLevel()
  }


  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={image} style={styles.image}>
          <View style={styles.dropZoneContainer}>
          <View style={{...styles.dropZone, backgroundColor: 'rgb(255, 0, 0)'}}>
            <Text style={styles.text}>Drop Here if Red!</Text>
        </View>
        <View style={{...styles.dropZone, backgroundColor: 'rgb(0, 0, 255)'}}>
            <Text style={styles.text}>Drop Here if Blue!</Text>
        </View>
        <View style={{...styles.dropZone, backgroundColor: 'rgb(0, 255, 0)'}}>
            <Text style={styles.text}>Drop Here if Green!</Text>
        </View>
          </View>
          <View>
              {props.colorSort === num ? <View><TouchableOpacity style={{...styles.submitButton, width: 300 * width / 667}} onPress={handlePress}><Text style={styles.submitButtonText}>Go to next Level</Text></TouchableOpacity></View> : null}
          </View>
          <View>
              {level >= 10  ? <View><TouchableOpacity style={{...styles.submitButton, width: 300 * width / 667}} onPress={handleReset}><Text style={styles.submitButtonText}>Play Again?</Text></TouchableOpacity></View> : null}
          </View>
        <View style={styles.ballContainer}/>
        <View style={styles.row}>
            {numOfCirlces.map((number, index) => {

                return <ColorSortCircles key={indexBase + index} width={width}/>
            })}
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  ballContainer: {
      height: 100,

  },

  dropZoneContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  },

  text: {

    color: "white",
    fontSize: 25,
    shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,

  },
  row: {
      flexDirection: "row",
      padding: "5%"
  },

  dropZone: {
      color: 'white',
      padding: 20,
      height: 80,
      borderStyle: 'solid',
      borderWidth: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
    width: "100%"
  },

  submitButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 15,
    backgroundColor: "#74D8D1",
    padding: 12,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});





const mapState = state => {
    return {
        colorSort: state.colorSort.current,
        level: state.logic.currentLevel
    }
}

const mapDispatch = dispatch => {
  return {
    reset: () => {dispatch(resetSorted())},
    addLevel: () => {dispatch(addLogicLevelThunk())},
    resetLevel: () => {dispatch(resetLevelThunk())},
    setLevel: (level)=> {dispatch(setLevelThunk(level))}
  }
}

export default connect (mapState, mapDispatch)(ColorSortGame)
