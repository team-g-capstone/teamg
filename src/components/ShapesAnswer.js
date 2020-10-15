import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Alert,
  
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as firebase from "firebase"
import {connect} from 'react-redux'
import {stopAudioThunk} from '../redux/reducers/audioReducer'
import Animations from "./Animations";
import styles from './ShapesAnswer.component.style.js';
import {
  useDocument,
 
} from "react-firebase-hooks/firestore";
import {addLevelThunk} from '../redux/reducers/levelReducer'



const windowWidth = Dimensions.get("window").width;

const widthConstant = windowWidth / 667;

const ShapesAnswer = (props) => {
  const {correctAns, numOne, numTwo, color1, color2, color3, colorStyle, numQuestions, userUID, level} = props.route.params;
  const [value] = useDocument(
    firebase.firestore().collection("users").doc(userUID)
  );
  let {shape, rotation} = props.route.params;

  let image = require('../../assets/backgrounds/orange.jpg')

  const updateMathScores = async () => {

    let currentUser =  await firebase.auth().currentUser;

    if(!currentUser.isAnonymous){
      let mathScores = value.data().mathScores;
      let mathScoresNew = mathScores.map((score,idx)=> idx === 0? true:score);

      let userDocument = await firebase.firestore().collection('users').doc(userUID).get();
      userDocument.ref.update({
        mathScores:mathScoresNew
      })
    }

   }

  const handlePress = () => {
    
    if (numQuestions < 10) {
      props.stopAudio()
      props.navigation.navigate("Shapes",{userUID});
    }
    if (numQuestions === 10) {
      if (level < 10) {
        props.addLevel()
        Alert.alert(`Congratulations`, `You've made it to level ${level + 1}`, [
          {
  
            onPress: () => props.navigation.navigate("Shapes",{userUID}),
          },
        ]) 
        updateMathScores();
      } else {
        Alert.alert(`You've passed all 10 levels!`, `You are a Math Genius !`, [
          {
  
            onPress: () => props.navigation.navigate("Subjects",{userUID}),
          },
        ])
      }
      
      
    }
  }
  

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      <Text style={{...styles.number, marginVertical: '25%', marginLeft: '3%', textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1}}>

        Questions: {numQuestions} / 10

      </Text>
      <View style={styles.questionContainer}>
        <View style={styles.rowContainer}>
          <Animatable.View
            animation="zoomInUp"
            iterationCount={3}
            direction="alternate"
            style={{ ...styles[shape], [colorStyle]: color1 }}
          >
            <Text style={styles.number}>{numOne}</Text>
          </Animatable.View>
        </View>
       
      
        <View style={styles.rowContainer}>
          <FontAwesome
            style={styles.addSign}
            name="plus"
            size={24}
            color="black"
          />
        </View>
        <View style={styles.rowContainer}>
          <Animatable.View
            animation="slideInDown"
            iterationCount={3}
            direction="alternate"
            style={{ ...styles[shape], [colorStyle]: color2 }}
          >
            <Text style={styles.number}>{numTwo}</Text>
          </Animatable.View>
        </View>
        <View style={styles.rowContainer}>
          <FontAwesome5
            style={styles.equalSign}
            name="equals"
            size={24}
            color="black"
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={{ ...styles[shape], [colorStyle]: color3 }}>
            <Text style={styles.number}>{correctAns}</Text>
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={{...styles.submitButton, width: 300 * widthConstant,}} onPress={handlePress}>
          {numQuestions < 10 ? (
            <Text style={styles.submitButtonText}>Go to the next Question</Text>
          ) : (
            <View>
           
            <Text style={styles.submitButtonText}>Go to next Level</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Animations rotation={rotation} />
         </ImageBackground>
    </View>
  );
}

const mapDispatch = dispatch => {
  return {
    stopAudio: () => {dispatch(stopAudioThunk())},
    addLevel: () => {dispatch(addLevelThunk())}
  }
}

export default connect (null, mapDispatch)(ShapesAnswer)
