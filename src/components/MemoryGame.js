import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {componentDidMountAudio} from './ShapesHelperFuncs'
import {Audio} from 'expo-av'
import {cards} from './ShapesHelperFuncs'

// let cards = [
//   { src: require("../../assets/icon_fish.png"), isOpen: false, id: 0, opacity: 1 },
//   { src: require("../../assets/icon_koala.png"), isOpen: false, id: 1, opacity: 1 },
//   { src: require("../../assets/icon_fish.png"), isOpen: false, id: 2, opacity: 1 },

//   { src: require("../../assets/icon_koala.png"), isOpen: false, id: 3, opacity: 1 },
// ];
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let cards2 = [
  { src: require("../../assets/icon_fish.png"), isOpen: false, id: 0, opacity: 1},
  { src: require("../../assets/icon_koala.png"), isOpen: false, id: 1, opacity: 1},
];

export default class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChanged: false,
      cards: cards,
      currentPair: [],
      correctPair: [],
      numCorrect: 0,
    };
    this.image = require("../../assets/backgrounds/green.jpg");
    this.handleClick = this.handleClick.bind(this);
    this.renderImg = this.renderImg.bind(this);
    this.renderAllCards = this.renderAllCards.bind(this);
    this.resetNewLevel = this.resetNewLevel.bind(this);
    this.shuffle = this.shuffle.bind(this)
  }

  async componentDidMount() {
    componentDidMountAudio()
    // console.log(cards, 'yello')
    const arrayOfObjects = Object.keys(cards)
    
    const array2 = arrayOfObjects.map((key) => {
      return Number(arrayOfObjects[key])
    })
    let shuffledCards = this.shuffle(array2)
    let shuffledDeck = cards.map((card, index) => {
      card.id = shuffledCards[index]
      return card
    })
    shuffledDeck.sort((a,b) => a.id - b.id)
    await this.setState({
      cards: shuffledDeck
    })
    
  }

 shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array
  }
  
  handleClick = async (id) => {
    let currentPair = this.state.currentPair.slice();
    let cards = this.state.cards.slice();
    let index = cards.findIndex((card) => {
      return card.id === id;
    });
    cards[index].isOpen = true;
    this.setState({
      cards: cards,
    });
    if(cards[index].opacity === 1) {
      if (currentPair.length < 2) {
        currentPair.push(cards[index]);
        await this.setState({
          currentPair: currentPair,
        });
      }
    }
   
    
    if (currentPair.length === 2) {
      let newNum;
      if (currentPair[0].src === currentPair[1].src && currentPair[0].id !== currentPair[1].id) {
        let sound = new Audio.Sound();
        const status = {
          shouldPlay: false,
        };
  
        await sound.loadAsync(
          require("../../assets/memorymatch.mp3"),
          status,
          false
        );
        await sound.playAsync();

        newNum = this.state.numCorrect + 1;
        await this.setState({
          numCorrect: newNum,
        });
        
        setTimeout(() => {
         
          cards[index].opacity = 0;
          cards[currentPair[0].id].opacity = 0
          this.setState({
            cards: cards,
          });
        }, 100);
      } else {
        setTimeout(() => {
          newNum = 0;
          cards[index].isOpen = false;
          currentPair[0].isOpen = false;
          this.setState({
            cards: cards,
          });
        }, 600);
      }
      this.setState({
        currentPair: [],
        cards: cards,
      });
    }

    if (this.state.numCorrect >= 2) {
      Alert.alert(
        "Congrats! You found all the pairs!",
        "Go to next level!",
        [{ text: "OK", onPress: () => this.resetNewLevel() }],
        { cancelable: false }
      );
    }
  };

  async resetNewLevel() {
    await this.setState({
      isChanged: false,
      cards: cards2,
      currentPair: [],
      correctPair: [],
      numCorrect: 0,
    });
  }

  renderImg(card) {
    const id = card.id;

    let src = require("../../assets/brain_teez.png");
    let opacity = card.opacity
    if (card.isOpen) {
      src = card.src;
      
    }
    return (
      <View key={id}>
        <TouchableOpacity onPress={() => this.handleClick(id)}>
          <Image source={src} style={[styles.image, {opacity: opacity}]} />
        </TouchableOpacity>
      </View>
    );
  }

  renderAllCards(cards) {
    return cards.map((card) => {
      return this.renderImg(card);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={this.image} style={styles.backgroundImage}>
          <Text style={styles.text}>
            Flip over cards to find the Matching Pairs!
          </Text>
          <View style={styles.containerRow}>
            {this.renderAllCards(this.state.cards)}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  containerRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 120,
    width: 105,
    opacity: 1,
    marginLeft: "1%",
    borderWidth: 1,
    borderColor: "#FFC857",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  text: {
    color: "#FFC857",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingTop: "5%",
    marginBottom: "-10%",
  },
});
