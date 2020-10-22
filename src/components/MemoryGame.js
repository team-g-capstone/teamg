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
import {Audio} from 'expo-av'
import styles from '../../styles/MemoryGame.Component.style';
import * as firebase from 'firebase'
import {componentDidMountAudio, cards, shuffle, levelChanges, audioPlayMatch, shufflePrep} from './ShapesHelperFuncs'

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
      scores: [],
    
    };
    this.image = require("../../assets/backgrounds/green.jpg");
    this.handleClick = this.handleClick.bind(this);
    this.renderImg = this.renderImg.bind(this);
    this.renderAllCards = this.renderAllCards.bind(this);
    this.resetNewLevel = this.resetNewLevel.bind(this);
    this.getUserLevel = this.getUserLevel.bind(this)
    this.updateMemoryScores = this.updateMemoryScores.bind(this)
  }

  async componentDidMount() {
    componentDidMountAudio()
   
    this.getUserLevel()

    let cardsToMount = cards.slice(0, 4)
    const cardsToMountIndices = Object.keys(cardsToMount)
    
    const indicesToRandomize = cardsToMountIndices.map((key) => {
      return Number(cardsToMountIndices[key])
    })
    let shuffledCards = shuffle(indicesToRandomize)
    
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

  getUserLevel = async () => {
    try {
      let currentUser = await firebase.auth().currentUser;
      
      
      if(!currentUser.isAnonymous) {
      const email = currentUser.email
     
      const snapshot = await firebase.firestore()
      .collection('users')
      .where('email', '==', email)
      .get();
      let student
      
      await snapshot.forEach(doc=> {
        student = doc.data()
      })
     
      this.setState({
        scores: student.memoryScores
      })
     
      
      let levelFromFS = student.memoryScores.reduce((accum, elem)=> {
        if(elem === true) {
          return accum + 1
        }
        return accum
      }, 0)

      if (levelFromFS < 10) {
         this.setState({
        level: levelFromFS
      })
      } else {
        Alert.alert(
        "You've already completed all the levels! Playing again will not affect your stars!",
        `Play Again?`,
        [{ text: "OK", onPress: () => {this.setState(); this.setState({level: 1,})} }],
        { cancelable: false }
      );
      
      }
     
     
      }
 
    } catch (error) {
      console.log(error)
    }
  }

  updateMemoryScores = async () => {
    let currentUser = await firebase.auth().currentUser;
   
    const userUID = currentUser.uid
   
    if(!currentUser.isAnonymous) {
    let scores = this.state.scores.slice()
    let memoryScoresNew = scores.map((score, idx)=> idx === this.state.level? true: score)
    this.setState({
      scores: memoryScoresNew
    })
    let userDocument = await firebase.firestore().collection('users').doc(userUID).get();
    userDocument.ref.update({
    memoryScores: memoryScoresNew
  });
    }
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
        
        audioPlayMatch()

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
      if(this.state.level < 10) {
         Alert.alert(
        "Congrats! You found all the pairs!",
        `Continue to Level ${this.state.level + 1}`,
        [{ text: "OK", onPress: () => this.resetNewLevel() }],
        { cancelable: false }
      );

      this.updateMemoryScores()
      } else if (this.state.level === 10) {
         Alert.alert(
        "Congrats! You found all the pairs!",
        `Continue`,
        [{ text: "OK", onPress: () => this.resetNewLevel() }],
        { cancelable: false }
      );
      }
     
    }
  };

  async resetNewLevel() {
    const newLevel = this.state.level + 1

    if(newLevel === 11) {
        await this.setState({
        level: 1,
        cards: []
      })
      const {navigation} = this.props.navigation
      let userUID = this.props.route.params.userUID

      Alert.alert(`You've passed all 10 levels!`, `You have the memory of a dolphin !`, [
          {

            onPress: () => this.props.navigation.navigate("Subjects",{userUID}),
          },
        ])
    
    } else {
      
      let array = shufflePrep(newLevel)
      let newCards = array[0]
      let shuffledCards = array[1]
  
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
    }


   
    

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


