
  import {Audio} from 'expo-av'

export const shapes = ["square", "circle", "triangle", "square", "circle"];
export const colors = [
  "rgb(255, 0, 0)",
  "rgb(0, 0, 255)",
  "rgb(0, 255, 0)",
  "rgb(128, 0, 128)",
  "rgb(0, 128, 128)",
  "rgb(128, 128, 0)",
];

  export const componentDidMountAudio = async () => {
    Audio.setAudioModeAsync({
      allowRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playsThroughEarpieceAndroid: true,
    });
  };


export function colorDecider(color1, color2) {
    let colorOne = color1.slice(4, color1.length - 1).split(",");
    let colorTwo = color2.slice(4, color2.length - 1).split(",");
  
    let colorThree = [];
  
    for (let i = 0; i < colorOne.length; i++) {
      let colorAmount1 = Math.ceil(Number(colorOne[i]) / 2);
      let colorAmount2 = Math.ceil(Number(colorTwo[i]) / 2);
  
      colorThree.push(colorAmount1 + colorAmount2);
    }
  
    const newColor = "rgb(" + colorThree.join(", ") + ")";
    return newColor;
  }

  export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }