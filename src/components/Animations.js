import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import LottieView from "lottie-react-native";



export default function Shapes2Answer(props) {
    let rotation = props.rotation
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
      marginLeft: "22%",
      marginTop: "-10%",
      width: "80%",
      height: "80%",
    },
})