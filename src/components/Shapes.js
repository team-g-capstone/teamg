import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  ImageBackground
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";
import styles from './Shapes.component.style.js'
import {componentDidMountAudio, colorDecider, colors, shapes, getRandomInt, getIndexForRandom} from './ShapesHelperFuncs'
import { useNavigation } from "@react-navigation/native";
import {startAudioThunk} from '../redux/reducers/audioReducer'
import {connect} from 'react-redux'

let rotation = 0;

const Shapes = (props) => {
  let  level = props.level
  let [index1] = useState(getIndexForRandom(level))
  let [index2] = useState(getIndexForRandom(level))
  
  const navigation = useNavigation();
  const [answer, setAnswer] = useState("");
  const [numOne, setNumOne] = useState(getRandomInt(index1[0], index1[1]));
  const [numTwo, setNumTwo] = useState(getRandomInt(index2[0], index2[1]));
  const [checkAns, setCheckAns] = useState(true);
  const [numQuestions, setNumQuestions] = useState(1);
  const userUID = props.route.params.userUID;
  

  console.log(level)
// let userUID;
//   if(props.route.params.userUID){
//   userUID = props.route.params.userUID
// }

  let shape = shapes[rotation];

  let color1 = colors[rotation];
  let color2 = colors[rotation + 1];
  let color3 = colorDecider(color1, color2);

  let image = require('../../assets/backgrounds/green.jpg')


  componentDidMountAudio();

  const handlePress = async () => {
    
    await Audio.setIsEnabledAsync(true)
    await props.startAudio()
    let correctAns = numOne + numTwo;

    if (Number(answer) === correctAns) {
      if(numQuestions < 10) {
        setNumQuestions(numQuestions + 1);
        
      } else if (numQuestions === 10) {
        setNumQuestions(1);
      }
      
      navigation.navigate("ShapesAnswer", {rotation, numOne, numTwo, correctAns, shape, color1, color2, color3, colorStyle, numQuestions, userUID, level});
      index1 = getIndexForRandom(level)
      index2 = getIndexForRandom(level)
      setNumOne(getRandomInt(index1[0], index1[1] + 1));
      setNumTwo(getRandomInt(index2[0], index2[1] + 1));
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

          onPress: () => navigation.navigate("Shapes",{userUID}),
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
    <ImageBackground source={image} style={styles.image}>
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
            placeholder="Your answer here..."
            maxLength={20}
            value={String(answer)}
            onChangeText={(answer) => setAnswer(answer)}
            keyboardType={"numeric"}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handlePress}>

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
        </View>
      ) : null}
       </ImageBackground>
    </View>


  );
}

const mapState = state => {
  return {
    level: state.level.currentLevel
  }
}
const mapDispatch = dispatch => {
  return {
    startAudio: () => {dispatch(startAudioThunk())}
  }
}

export default connect (mapState, mapDispatch)(Shapes)