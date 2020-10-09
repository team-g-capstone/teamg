import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import {Audio} from 'expo-av'

import LottieView from "lottie-react-native";


  

export default function Shapes2Answer(props) {
    let rotation = props.rotation
    const componentDidMount = async () => {
        Audio.setAudioModeAsync({
          allowRecordingIOS: false, 
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
           playsInSilentModeIOS: true,
           interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
           shouldDuckAndroid: true,
           staysActiveInBackground: true,
           playsThroughEarpieceAndroid: true,
        })
        let sound = new Audio.Sound()
        const status = {
          shouldPlay: false
        }
    
        if(rotation === 0) {
            await sound.loadAsync(require('../../assets/balloondrop.mp3'), status, false);
        } 
        if(rotation === 1) {
            await sound.loadAsync(require('../../assets/clapping.mp3'), status, false);
        }
        if(rotation === 2) {
            await sound.loadAsync(require('../../assets/guitarist.mp3'), status, false);
        }

        if(rotation === 3) {
            await sound.loadAsync(require('../../assets/correctanswerresponse.mp3'), status, false);
        }

        if(rotation === 4) {
            await sound.loadAsync(require('../../assets/pizzaparty.mp3'), status, false);
        }
       await sound.playAsync(); 
      }
    
      componentDidMount(); 
    return (
      <View>
          {rotation === 0 ? (<LottieView
          style={styles.animation}
          source={require(`../../assets/balloonDropping.json`)}
          loop
          autoPlay
        />) : (rotation === 1 ? <LottieView
            style={styles.animation}
            source={require(`../../assets/clap.json`)}
            loop
            autoPlay
          /> : (rotation === 2 ? <LottieView
            style={styles.animation}
            source={require(`../../assets/guitarist.json`)}
            loop
            autoPlay
          /> : (rotation == 3 ? (<LottieView
            style={styles.animation}
            source={require(`../../assets/correctanswerresponse.json`)}
            loop
            autoPlay
          />) : (<LottieView
            style={styles.animation}
            source={require(`../../assets/birthday-party.json`)}
            loop
            autoPlay
          />))))}
        
      </View>
    )
}

const styles = StyleSheet.create({
    animation: {
        marginLeft: "3%",
        marginTop: "-10%",
        marginRight: "-100%",
        marginVertical: "-17%",
        marginHorizontal: "-100%",
        width: "100%",
        height: "100%",
        padding: "5%",
      },
})