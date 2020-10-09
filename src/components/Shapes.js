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
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function colorDecider(color1, color2) {
  let colorOne = color1.slice(4, color1.length - 1).split(",");
  let colorTwo = color2.slice(4, color2.length - 1).split(",");

  let colorThree = [];

  for (let i = 0; i < colorOne.length; i++) {
    let colorAmount1 = Math.ceil(Number(colorOne[i]) / 2);
    let colorAmount2 = Math.ceil(Number(colorTwo[i]) / 2);

    colorThree.push(colorAmount1 + colorAmount2);
  }

  const newColor = "rgb(" + colorThree.join(", ") + ")";
  return newColor;
}
const shapes = ["square", "circle", "triangle", "square", "circle"];
const colors = [
  "rgb(255, 0, 0)",
  "rgb(0, 0, 255)",
  "rgb(0, 255, 0)",
  "rgb(128, 0, 128)",
  "rgb(0, 128, 128)",
  "rgb(128, 128, 0)",
];

let rotation = 0;

export default function Shapes({ navigation }) {
  const [answer, setAnswer] = useState("");
  const [numOne, setNumOne] = useState(getRandomInt(10));
  const [numTwo, setNumTwo] = useState(getRandomInt(10));
  const [checkAns, setCheckAns] = useState(true);
  const [numQuestions, setNumQuestions] = useState(1);

  let shape = shapes[rotation];
  let color1 = colors[rotation];

  let color2 = colors[rotation + 1];
  let color3 = colorDecider(color1, color2);

  const componentDidMountAudio = async () => {
    Audio.setAudioModeAsync({
      allowRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playsThroughEarpieceAndroid: true,
    });
  };

  componentDidMountAudio();

  const handlePress = async () => {
    let correctAns = numOne + numTwo;
    console.log("correctAnswer", correctAns);
    if (Number(answer) === correctAns) {
      setNumQuestions(numQuestions + 1);
      navigation.navigate("ShapesAnswer", {
        rotation: rotation,
        numOne: numOne,
        numTwo: numTwo,
        correctAns: correctAns,
        shape: shape,
        color1: color1,
        color2: color2,
        color3: color3,
        colorStyle: colorStyle,
        numQuestions: numQuestions,
      });

      setNumOne(getRandomInt(10));
      setNumTwo(getRandomInt(10));
      setAnswer();
      setCheckAns(true);
    } else {
      let sound = new Audio.Sound();
      const status = {
        shouldPlay: false,
      };
      await sound.loadAsync(
        require("../../assets/incorrectAnswer.mp3"),
        status,
        false
      );
      await sound.playAsync();
      Alert.alert("SORRY", "Please click the button to try again", [
        {
          text: "Try again",
          onPress: () => navigation.navigate("Shapes"),
        },
      ]);
      setCheckAns(false);
    }

    if (rotation < 4) {
      rotation++;
    } else {
      rotation = 0;
    }
    setAnswer("");
  };

  let colorStyle;
  if (
    shape === "triangle" ||
    shape === "triangleDown" ||
    shape === "trapezoid"
  ) {
    colorStyle = "borderBottomColor";
  } else {
    colorStyle = "backgroundColor";
  }

  return (
    <View style={styles.container}>
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
            <Text style={styles.questionMark}>?</Text>
          </View>
        </View>
      </View>
      <ScrollView onBlur={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Your answer here "
            maxLength={20}
            value={String(answer)}
            onChangeText={(answer) => setAnswer(answer)}
            // defaultValue={answer}
            keyboardType={"numeric"}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
          {/* <AudioButton onPress={handlePress}/> */}
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      {!checkAns ? (
        <View>
          <LottieView
            source={require("../../assets/check.json")}
            loop
            autoPlay
          />
          <Text>Try Again!</Text>
        </View>
      ) : null}
    </View>
  );
}
let color1 = colors[rotation];
let color2 = colors[rotation + 1];

const styles = StyleSheet.create({
  container: {
    //take up all available space by setting it to flex :1
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: 45,
    backgroundColor: "#FFBF80",
  },
  questionContainer: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
    width: "60%",
    alignItems: "center",
  },

  rowContainer: {
    width: 50,
    height: 50,
  },
  square: {
    //flex: 1,
    flexDirection: "row",
    width: 80,
    height: 80,
    backgroundColor: color1,
    padding: 1,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    // textAlignVertical: "center",
    // textAlign: "center",
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
    paddingTop: 60,
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
  questionMark: {
    position: "absolute",
    textAlign: "center",
    paddingTop: "40%",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
  },
  number: {
    //setting it to absolute would bring it in front of the triangle
    position: "absolute",
    //textAlign: "" ,
    paddingTop: "40%",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",

    //textAlignVertical: ,
    //justifyContent: "center",
    // marginTop: -20,//for square
    // marginTop: -10,//for circle,
    // marginTop: 0, //for triangle,
  },
  circle: {
    flexDirection: "row",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: color2,
    alignItems: "center",
    justifyContent: "center",
  },
  triangle: {
    flexDirection: "row",
    width: 0,
    height: 0,
    // backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
