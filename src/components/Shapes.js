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
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function colorDecider(color1, color2) {
  let colorOne = color1.slice(4, color1.length - 1).split(',')
  let colorTwo = color2.slice(4, color2.length - 1).split(',')
  

  let colorThree = []; 

  for (let i = 0; i < colorOne.length; i++) {
    
    let colorAmount1 = Math.ceil(Number(colorOne[i]) / 2) 
    let colorAmount2 = Math.ceil(Number(colorTwo[i]) / 2)
   
    colorThree.push(colorAmount1 + colorAmount2)

  }

  const newColor = 'rgb(' + colorThree.join(', ') + ')'
  return newColor
}
const shapes = ["square", "circle", "triangle", "triangleDown", "trapezoid"];
const colors = ['rgb(255, 0, 0)', 'rgb(0, 0, 255)', 'rgb(0, 255, 0)', 'rgb(128, 0, 128)', 'rgb(0, 128, 128)', 'rgb(128, 128, 0)']
let rotation = 0;

export default function Shapes() {
  const [answer, setAnswer] = useState(0);
  const [numOne, setNumOne] = useState(getRandomInt(10));
  const [numTwo, setNumTwo] = useState(getRandomInt(10));
  const [correctAns, setCorrectAns] = useState(numOne + numTwo);

  let shape = shapes[rotation];
  let color1 = colors[rotation];
 
  let color2 = colors[rotation + 1];
  let color3 = colorDecider(color1, color2)
  
  const handlePress = () => {
  
    if (rotation < 4) {
      rotation++;
    } else {
      rotation = 0;
    }
    setAnswer(0);
  };

  let colorStyle; 
  if (shape === 'triangle' || shape === 'triangleDown' || shape === 'trapezoid') {
    colorStyle = 'borderBottomColor'
  } else {
    colorStyle = 'backgroundColor'
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={styles.rowContainer}>
          <Animatable.View
            animation="zoomInUp"
            iterationCount={3}
            direction="alternate"
            style={{...styles[shape], [colorStyle]: color1}}
            
            
            
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
            style={{...styles[shape], [colorStyle]: color2}}
            
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
          <View style={{...styles[shape], [colorStyle]: color3}}>
            <Text style={styles.number}>?</Text>
          </View>
        </View>

        {/* <LottieView source={require("../../assets/check.json")} loop autoPlay /> */}
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

let color1 = colors[rotation]
let color2 = colors[rotation + 1]

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
    alignItems: 'center',
  },
  square: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    textAlignVertical: 'center',
    backgroundColor: color1,
    padding: '50%',
    margin: '20%',
    alignItems: "center",
    borderRadius: 10,
   
  },
  addSign: {
    position: "relative",
    
    top: "100%",
  },
  equalSign: {
    position: "relative",
    justifyContent: 'center',
    
    top: "100%",
  },
  inputContainer: {
    paddingTop: "10%",
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: '50%',
    fontSize: 25,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  submitButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 15,
    backgroundColor: "#74D8D1",
    padding: '2%',
    margin: '2%',
    width: '50%',
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
    justifyContent: 'center',
    paddingTop: '30%',
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
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 100 / 2,
    backgroundColor: color2,
    alignItems: "center",
  },
  triangle: {
    flex: 1, 
    justifyContent: 'center',
    textAlign: 'center',
    width: 0,
    height: 0,
    alignItems: "center",
    // backgroundColor: "transparent",
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
    justifyContent: 'center',
    // backgroundColor: "transparent",
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
    
    width: 80,
    height: 0,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    
    // textAlignVertical: 'center',
    borderColor: 'transparent',
    borderBottomWidth: 60,
    borderBottomColor: "red",
    borderTopWidth: 0,
    borderLeftWidth: 20,
    borderTopColor: 'transparent',
    borderLeftColor: "transparent",
    borderRightWidth: 20,
    borderRightColor: "transparent",
    borderStyle: "solid",
    padding: '20%',
    margin: "20%",
  },
});
