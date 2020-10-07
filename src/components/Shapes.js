import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export default function Shapes() {
  const [answer, setAnswer] = useState(0);
  const [numOne, setNumOne] = useState(getRandomInt(10));
  const [numTwo, setNumTwo] = useState(getRandomInt(10));
  const [correctAns, setCorrectAns] = useState(numOne + numTwo);
  // constructor() {
  //   super();
  //   this.state = {
  //     answer: 0,
  //     numOne: getRandomInt(10),
  //     numTwo: getRandomInt(10),
  //     correctAns: this.state.numOne + this.state.numTwo,
  //   };
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }
  // handleChange(answerEntered) {
  //   this.setState({ answer: answerEntered });
  // }
  // handleSubmit() {
  //   // this.props.navigation.navigate(`Minion’s response`, {
  //   //   height: this.state.height,
  //   //   weight: this.state.weight,
  //   // });
  //   this.setState({
  //     answer: 0,
  //   });
  // }

  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <Text style={styles.number}>{numOne}</Text>
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
        <TouchableOpacity
          style={styles.submitButton}
          onPress={(answer) => setAnswer(0)}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: "#FFBF80",
  },
  square: {
    width: 80,
    height: 80,
    backgroundColor: "red",
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
    padding: 15,
    margin: 20,
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
  },
});
