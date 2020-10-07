import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const shapes = ["square", "circle", "triangle", "triangleDown", "trapezoid"];
let rotation = 0;

export default function Shapes() {
  const [answer, setAnswer] = useState(0);
  const [numOne, setNumOne] = useState(getRandomInt(10));
  const [numTwo, setNumTwo] = useState(getRandomInt(10));
  const [correctAns, setCorrectAns] = useState(numOne + numTwo);
  let shape = shapes[rotation];

  const handlePress = () => {
    //
    if (rotation < 4) {
      rotation++;
    } else {
      rotation = 0;
    }
    setAnswer(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={styles.rowContainer}>
          <View style={styles[shape]}>
            <Text style={styles.number}>{numOne}</Text>
          </View>
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
          <View style={styles[shape]}>
            <Text style={styles.number}>{numTwo}</Text>
          </View>
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
          <View style={styles.trapezoid}>
            <Text style={styles.number}>?</Text>
          </View>
        </View>
      </View>
      <ScrollView onBlur={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Your answer here "
            maxLength={20}
            // value={this.state.answer}
            onChangeText={(answer) => setAnswer(answer)}
            defaultValue={answer}
            keyboardType={"numeric"}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
