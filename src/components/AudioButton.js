import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import {Audio} from 'expo-av'

export default class App extends React.Component {
 
 async componentDidMount() {
   Audio.setAudioModeAsync({
     allowsRecordingIOS: false,
     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
     playsInSilentModeIOS: true,
     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
     shouldDuckAndroid: true,
     staysActiveInBackground: true,
     playsThroughEarpieceAndroid: true,
   })

   this.sound = new Audio.Sound();

   const status = {
     shouldPlay: false
   }
   this.sound.loadAsync(require('../../assets/A1.mp3'), status, false);
 }

 playSound() {
   this.sound.playAsync()
 }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
         <Button 
          title="Submit"
          color="#3CBBB1"
          onPress={this.playSound.bind(this)}
          />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});