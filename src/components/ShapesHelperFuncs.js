
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

  export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  export function getIndexForRandom(level) {
    if (level < 3) {
      return [0, level + 3]
    } else if (level >= 3 && level < 6) {
      return [2, level + 4]
    } else if (level >= 6 && level < 8) {
      return [4, 10]
    } else {
      return [6, 15]
    }
  }

 export function levelChanges (level, indexBase)  {
    if (level <= 1) {
      indexBase = 0;
      return [5, indexBase]
    } else if (level === 2 ) {
      indexBase = 6; 
      return [6, indexBase]
    } else if (level === 3) {
      indexBase = 13;
      return [7, indexBase]
    } else if (level === 4) {
      indexBase = 21;
      return [8, indexBase]
    } else if (level === 5) {
      indexBase = 30;
      return [9, indexBase]
    } else if (level === 6) {
      indexBase = 40;
      return [10, indexBase]
    } else if (level === 7) {
      indexBase = 51;
      return [11, indexBase]
    } else if (level === 8) {
      indexBase = 63;
      return [12, indexBase]
    } else if (level === 9) {
      indexBase = 76;
      return [13, indexBase]
    } else if (level <= 10) {
      indexBase = 90;
      return [14, indexBase]
    }
} 

export const cards = [
  { src: require("../../assets/memoryicons/icon_fish.png"), isOpen: false, id: 0, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_fish.png"), isOpen: false, id: 1, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_koala.png"), isOpen: false, id: 2, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_koala.png"), isOpen: false, id: 3, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_duck.png"), isOpen: false, id: 4, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_duck.png"), isOpen: false, id: 5, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_shark.png"), isOpen: false, id: 6, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_shark.png"), isOpen: false, id: 7, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_turtle.png"), isOpen: false, id: 8, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_turtle.png"), isOpen: false, id: 9, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_lion.png"), isOpen: false, id: 10, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_lion.png"), isOpen: false, id: 11, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_penguin.png"), isOpen: false, id: 12, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_penguin.png"), isOpen: false, id: 13, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_eleph.png"), isOpen: false, id: 14, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_eleph.png"), isOpen: false, id: 15, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_whale.png"), isOpen: false, id: 16, opacity: 1 },
  { src: require("../../assets/memoryicons/icon_whale.png"), isOpen: false, id: 17, opacity: 1 },
  { src: require("../../assets/memoryicons/rhino.png"), isOpen: false, id: 18, opacity: 1 },
  { src: require("../../assets/memoryicons/rhino.png"), isOpen: false, id: 19, opacity: 1 },
  { src: require("../../assets/memoryicons/leopard.png"), isOpen: false, id: 20, opacity: 1 },
  { src: require("../../assets/memoryicons/leopard.png"), isOpen: false, id: 21, opacity: 1 },
  
];

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array 
}
