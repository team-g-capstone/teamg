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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "60%",
          alignItems: "center",
        }}
      >
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
          <View style={styles[shape]}>
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
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: 45,
    backgroundColor: "#FFBF80",
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
  },
  addSign: {
    position: "absolute",
    left: 105,
    top: "40%",
  },
  equalSign: {
    position: "absolute",
    left: 230,
    top: "40%",
  },
  inputContainer: {
    paddingTop: 15,
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
    textAlign: "center",
    paddingTop: 30,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "red",
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
    width: 200,
    height: 0,
    borderBottomWidth: 100,
    borderBottomColor: "red",
    borderLeftWidth: 50,
    borderLeftColor: "transparent",
    borderRightWidth: 50,
    borderRightColor: "transparent",
    borderStyle: "solid",
  },
});
