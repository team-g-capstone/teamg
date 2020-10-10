import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  Dimensions,
  SafeAreaView,
  ImageBackground
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { set } from "react-native-reanimated";
import Animations from "./Animations";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const shapes = ["square", "circle", "triangle", "triangleDown", "trapezoid"];

const windowWidth = Dimensions.get("window").width;
const widthConstant = windowWidth / 667;
const windowHeight = Dimensions.get("window").height;

export default function Shapes2Answer(props) {
  const correctAns = props.route.params.correctAns;
  const numOne = props.route.params.numOne;
  const numTwo = props.route.params.numTwo;
  let shape = props.route.params.shape;
  const color1 = props.route.params.color1;
  const color2 = props.route.params.color2;
  const color3 = props.route.params.color3;
  const colorStyle = props.route.params.colorStyle;
  let rotation = props.route.params.rotation;

  const numQuestions = props.route.params.numQuestions;
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
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      <Text style={{...styles.number, marginVertical: '25%', marginLeft: '5%'}}>
       
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
        <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
          {numQuestions < 10 ? (
            <Text style={styles.submitButtonText}>Go to the next Question</Text>
          ) : (
            <Text style={styles.submitButtonText}>Go to next Level</Text>
          )}
        </TouchableOpacity>
      </View>

      <Animations rotation={rotation} />
         </ImageBackground>   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // animation: {
  //   flex: 3, 
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  //   marginLeft: "22%",
  //   marginTop: "-10%",
  //   width: "80%",
  //   height: "80%",
  // },
  container: {
    //take up all available space by setting it to flex :1
    flex: 1,
    width: "100%",
    height: "100%",
   
    backgroundColor: "#FFBF80",
   
    // flexDirection: "column",
   
    // flexWrap: "wrap",
    // justifyContent: "space-evenly", //center the question block
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    
  },

  questionContainer: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
    width: "60%",
    alignItems: "center",
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },

  rowContainer: {
    width: 50,
    height: 50,
  },
  square: {
    flexDirection: "row",
    width: 80,
    height: 80,
    backgroundColor: "red",
    padding: 1,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  addSign: {
    position: "absolute",
    left: 45,
    top: "100%",
  },
  equalSign: {
    position: "absolute",
    left: 45,
    top: "100%",
  },
  inputContainer: {
    paddingTop: 80,
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  submitButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 15,
    backgroundColor: "#74D8D1",
    padding: 12,
    margin: 20,
    width: 300 * widthConstant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  submitButtonText: {
    color: "#000066",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",

  },
  number: {
    //setting it to absolute would bring it in front of the triangle
    position: "absolute",
    textAlign: "center",
    //paddingTop: "40%",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    // marginTop: -20,//for square
    // marginTop: -10,//for circle,
    // marginTop: 0, //for triangle,
    /******triangleDown need the following THREE */
    // transform: [{ rotate: "180deg" }],
    // marginTop: 40,
    // marginLeft: -5,
    /*********trapezoid */
    // marginTop: -25,
    // marginLeft: 23,
  },
  circle: {
    flexDirection: "row",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  triangle: {
    flexDirection: "row",
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
