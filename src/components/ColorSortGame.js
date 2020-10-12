import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import ColorSort from './ColorSort'

export default function ColorSortGame({ navigation }) {
  let image = require('../../assets/backgrounds/blue.jpg')
  
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.dropZone}>
            <Text style={styles.text}>Drop Here!</Text>
        </View>
        <View style={styles.ballContainer}/>
        <View style={styles.row}>
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

  row: {
      flexDirection: "row"
  },

  dropZone: {
      height: 200,
  },

  image: {
    flex: 1, 
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
    width: "100%"
  }
});
