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
import {cards, shuffle, levelChanges} from './ShapesHelperFuncs'

export default class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChanged: false,
      cards: cards,
      currentPair: [],
      correctPair: [],
      numCorrect: 0,
      level: 1,
      indexBase: 0,
    };
    this.image = require("../../assets/backgrounds/green.jpg");
    this.handleClick = this.handleClick.bind(this);
    this.renderImg = this.renderImg.bind(this);
    this.renderAllCards = this.renderAllCards.bind(this);
    this.resetNewLevel = this.resetNewLevel.bind(this);
   
    
  }

  async componentDidMount() {
    componentDidMountAudio()
   console.log(this.props)
    
    let cardsToMount = cards.slice(0, 4)
    const arrayOfObjects = Object.keys(cardsToMount)
    
    const array2 = arrayOfObjects.map((key) => {
      return Number(arrayOfObjects[key])
    })
    let shuffledCards = shuffle(array2)
    let shuffledDeck = cardsToMount.map((card, index) => {
      card.id = shuffledCards[index]
      card.isOpen = false, 
      card.opacity = 1
      
      return card
    })
    shuffledDeck.sort((a,b) => a.id - b.id)
    await this.setState({
      cards: shuffledDeck
    })
 
    
  }


  
  handleClick = async (id) => {
    let currentPair = this.state.currentPair.slice();
    let cards = this.state.cards.slice();
    let index = cards.findIndex((card) => {
      return card.id === id;
    });
    console.log('ID', id, "index", index)
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

    if (this.state.numCorrect >= this.state.cards.length / 2) {
      Alert.alert(
        "Congrats! You found all the pairs!",
        `Continue to Level ${this.state.level + 1}`,
        [{ text: "OK", onPress: () => this.resetNewLevel() }],
        { cancelable: false }
      );
    }
  };

  async resetNewLevel() {
    const newLevel = this.state.level + 1
    if(newLevel === 3) {
      const {navigation} = this.props.navigation
      let userUID = this.props.route.params.userUID
      Alert.alert(`You've passed all 10 levels!`, `You have the memory of a dolphin !`, [
          {

            onPress: () => this.props.navigation.navigate("Subjects",{userUID}),
          },
        ])
      this.setState({
        level: 1,
      })
    }
    let levelCards
    newLevel % 2 === 0 ? levelCards = 4 : levelCards = 3
    const newCards =  cards.slice(0, (newLevel + levelCards))
    const arrayOfObjects = Object.keys(newCards)
    const array2 = arrayOfObjects.map((key) => {
      return Number(arrayOfObjects[key])
    })


    let shuffledCards = shuffle(array2)
    let shuffledDeck = newCards.map((card, index) => {
      card.id = shuffledCards[index]
      card.isOpen = false, 
      card.opacity = 1
      return card
    })
    shuffledDeck.sort((a,b) => a.id - b.id)
    await this.setState({
      cards: shuffledDeck
    })
  
    await this.setState({
      isChanged: false,
      currentPair: [],
      correctPair: [],
      numCorrect: 0,
      level: newLevel
    });
    console.log(this.state)
  }

  renderImg(card, index) {
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
     let indexBase;
    const key = levelChanges(this.state.level, indexBase)[0]
    return cards.map((card, index) => {
      return this.renderImg(card, index);
    });
  }
  render() {
    
    return (
      <View style={styles.container}>
        <ImageBackground source={this.image} style={styles.backgroundImage}>
        
       
          {this.state.level <= 2 ? (
         
          <Text style={styles.text}>
            Flip over cards to find the Matching Pairs!
          </Text>
          ) : (<Text style={styles.text}>
          </Text>)}
          

          <View style={styles.containerRow} elevation={5}>
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
    flex: 4,
    height: '50%',
    width: '98%',
    flexDirection: "row",
    flexWrap: 'wrap-reverse',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 10,
  },

  image: {

    height: 125,
    width: 105,
    opacity: 1,
    marginLeft: "10%",
    marginTop: '5%',
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: "#FFC857",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: '#f0ead6',
  
   
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
    marginBottom: "-5%",
  },
});
