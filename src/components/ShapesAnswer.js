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
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { set } from "react-native-reanimated";
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const shapes = ["square", "circle", "triangle", "triangleDown", "trapezoid"];
let rotation = 0;

const windowWidth = Dimensions.get("window").width;
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
  const numQuestions = props.route.params.numQuestions;

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
      <Text>ANSWER PAGE: numQuestions: {numQuestions} </Text>
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
      <LottieView
        style={styles.animation}
        source={require("../../assets/balloonDropping.json")}
        loop
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    marginLeft: "22%",
    marginTop: "-10%",
    width: "80%",
    height: "80%",
  },
  container: {
    //take up all available space by setting it to flex :1
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingTop: 45,
    backgroundColor: "#FFBF80",
  },
  questionContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-around",
    width: "40%",
    alignItems: "center",
  },

  rowContainer: {
    width: 50,
    height: 50,
  },
  square: {
    width: 80,
    height: 80,
    backgroundColor: "red",
    padding: 1,
    margin: 20,
    alignItems: "center",
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
    width: 250,
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
    paddingTop: 45,
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
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "red",
    alignItems: "center",
  },
  triangle: {
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
  },
  triangleDown: {
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
    transform: [{ rotate: "180deg" }],
  },
  trapezoid: {
    width: 120,
    height: 0,
    borderBottomWidth: 60,
    borderBottomColor: "red",
    borderLeftWidth: 30,
    borderLeftColor: "transparent",
    borderRightWidth: 30,
    borderRightColor: "transparent",
    borderStyle: "solid",
    padding: 1,
    margin: 20,
  },
});
