import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import ColorSort from './ColorSort'

export default function ColorSortGame({ navigation }) {
  let image = require('../../assets/backgrounds/blue.jpg')
  
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={image} style={styles.image}>
          <View style={styles.dropZoneContainer}>
          <View style={{...styles.dropZone, backgroundColor: 'red'}}>
            <Text style={styles.text}>Drop Here if Red!</Text>
        </View>
        <View style={{...styles.dropZone, backgroundColor: 'blue'}}>
            <Text style={styles.text}>Drop Here if Blue!</Text>
        </View>
        <View style={{...styles.dropZone, backgroundColor: 'green'}}>
            <Text style={styles.text}>Drop Here if Green!</Text>
        </View>
          </View>
        <View style={styles.ballContainer}/>
        <View style={styles.row}>
            <ColorSort/>
            <ColorSort/>
            <ColorSort/>
            <ColorSort/>
            <ColorSort/>
            <ColorSort/>
            <ColorSort/>
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
  },

  image: {
    flex: 1, 
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
    width: "100%"
  }
});
