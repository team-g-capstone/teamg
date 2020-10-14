import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground, Dimensions, TouchableOpacity} from "react-native";
import ColorSortCircles from './ColorSortCircles'
import {connect} from 'react-redux'
import * as firebase from "firebase";
import {
  useCollection,
  useDocument,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";

let {height, width} = Dimensions.get('window')

height > width ? width = height : width = width

const numOfCirlces = [1, 2, 3, 4, 5, 6, 7];

function ColorSortGame(props) {
  let image = require('../../assets/backgrounds/blue.jpg')
  const userUID = props.route.params.userUID
  const [value, loading, error] = useDocument(
    firebase.firestore().collection("users").doc(userUID)
  );

  const updateMathScores = async () => {
    let mathScores = value.data().mathScores;
    let mathScoresNew = mathScores.map((score,idx)=> idx === 1? true:score);
    let userDocument = await firebase.firestore().collection('users').doc(userUID).get();
    userDocument.ref.update({
      mathScores:mathScoresNew
    })
  }
   const handlePress = () => {

    updateMathScores();
    props.navigation.navigate('Subjects')
  };



  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={image} style={styles.image}>
          <View style={styles.dropZoneContainer}>
          <View style={{...styles.dropZone, backgroundColor: 'rgb(255, 0, 0)'}}>
            <Text style={styles.text}>Drop Here if Red!</Text>
        </View>
        <View style={{...styles.dropZone, backgroundColor: 'rgb(0, 0, 255)'}}>
            <Text style={styles.text}>Drop Here if Blue!</Text>
        </View>
        <View style={{...styles.dropZone, backgroundColor: 'rgb(0, 255, 0)'}}>
            <Text style={styles.text}>Drop Here if Green!</Text>
        </View>
          </View>
          <View>
              {props.colorSort >= 7 ? <View><TouchableOpacity style={{...styles.submitButton, width: 300 * width / 667}} onPress={handlePress}><Text style={styles.submitButtonText}>Go to next Level</Text></TouchableOpacity></View> : null}
          </View>
        <View style={styles.ballContainer}/>
        <View style={styles.row}>
            {numOfCirlces.map((number) => {
                return <ColorSortCircles key={number} id={number} width={width}/>
            })}
            {/* <ColorSortCircles width={width}/>
            <ColorSortCircles width={width}/>
            <ColorSortCircles width={width}/>
            <ColorSortCircles width={width}/>
            <ColorSortCircles width={width}/>
            <ColorSortCircles width={width}/>
           <ColorSortCircles width={width}/> */}
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  ballContainer: {
      height: 100
  },

  dropZoneContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  },

  text: {
    // marginTop: 25,
    // marginLeft: 5,
    // marginRight: 5,
    // textAlign: "center",
    color: "white",
    fontSize: 25,
    shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    // fontWeight: "bold"
  },
  row: {
      flexDirection: "row"
  },

  dropZone: {
      color: 'white',
      padding: 20,
      height: 80,
      borderStyle: 'solid',
      borderWidth: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
    width: "100%"
  },

  submitButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 15,
    backgroundColor: "#74D8D1",
    padding: 12,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});


const mapState = state => {
    return {
        colorSort: state.colorSort.current
    }
}

export default connect (mapState, null)(ColorSortGame)
