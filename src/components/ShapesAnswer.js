import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import Animations from "./Animations";
import styles from './ShapesAnswer.component.style.js'


const windowWidth = Dimensions.get("window").width;

const widthConstant = windowWidth / 667;

export default function Shapes2Answer(props) {
  const {correctAns, numOne, numTwo, color1, color2, color3, colorStyle, numQuestions} = props.route.params;
 
  let {shape, rotation} = props.route.params;
  
  let image = require('../../assets/backgrounds/orange.jpg')

  const handlePress = () => {
    if (numQuestions < 10) {
      props.navigation.navigate("Shapes");
    }
    if (numQuestions === 10) {
      props.navigation.navigate("WelcomePage");
    }
  };

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
            <Text style={styles.submitButtonText}>Go to next Level</Text>
          )}
        </TouchableOpacity>
      </View>

      <Animations rotation={rotation} />
         </ImageBackground>   
    </View>
  );
}

