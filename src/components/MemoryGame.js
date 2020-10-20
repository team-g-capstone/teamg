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
import { useNavigation } from "@react-navigation/native";
import Card from "./Card_MemoryGame";
import { render } from "react-dom";

let cards = [
  { src: require("../../assets/icon_fish.png"), isOpen: false, id: 0 },
  { src: require("../../assets/icon_koala.png"), isOpen: false, id: 1 },
  { src: require("../../assets/icon_fish.png"), isOpen: false, id: 2 },
  { src: require("../../assets/icon_koala.png"), isOpen: false, id: 3 },
];
let cards2 = [
  { src: require("../../assets/icon_fish.png"), isOpen: false, id: 0 },
  { src: require("../../assets/icon_koala.png"), isOpen: false, id: 1 },
];

//trying to add a clone to have 2 of each however there will be a duplicate of id's
// var cloneArr = [...cards];
// cards = cards.concat(cloneArr);

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
    this.handleClick = this.handleClick.bind(this);
    this.renderImg = this.renderImg.bind(this);
    this.renderAllCards = this.renderAllCards.bind(this);
    this.resetNewLevel = this.resetNewLevel.bind(this);
  }

  handleClick = async (id) => {
    let currentPair = this.state.currentPair.slice();
    let index = cards.findIndex((card) => {
      return card.id === id;
    });
    cards[index].isOpen = true;
    if (currentPair.length < 2) {
      currentPair.push(cards[index]);
      await this.setState({
        currentPair: currentPair,
      });
    }
    if (currentPair.length === 2) {
      let newNum;
      if (currentPair[0].src === currentPair[1].src) {
        newNum = this.state.numCorrect + 1;
        await this.setState({
          numCorrect: newNum,
        });
        console.log("state:", this.state);
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
      // Alert.alert(
      //   "Congrats! You found all the pairs!"
      //   // [
      //   //   {
      //   //     onPress: () => console.log("HEY"),
      //   //   },
      //   // ]
      // );
      Alert.alert(
        "Alert Title",
        "My Alert Msg", // <- this part is optional, you can pass an empty string
        [{ text: "OK", onPress: () => this.resetNewLevel() }],
        { cancelable: false }
      );
    }
  };

  async resetNewLevel() {
    console.log("In resetNewLevel()");
    await this.setState({
      isChanged: false,
      cards: cards2,
      currentPair: [],
      correctPair: [],
      numCorrect: 0,
    });
    console.log("New State:", this.state);
  }

  renderImg(card) {
    const id = card.id;

    let src = require("../../assets/brain_teez.png");
    if (card.isOpen) {
      src = card.src;
    }
    return (
      <View key={id}>
        <TouchableOpacity onPress={() => this.handleClick(id)}>
          <Image source={src} style={styles.image} />
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
        {/* <Card /> */}
        {this.renderAllCards(this.state.cards)}
        {/* <View style={styles.containerRow}>
        {renderImg("koala")}
        {renderImg("fish")}
      </View> */}
        {/* <View style={styles.containerRow}>
        {renderImg("koala")}
        {renderImg("fish")}
      </View> */}
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
    flexDirection: "column",
  },
  image: {
    height: 100,
    width: 100,
    opacity: 1,
  },
});
