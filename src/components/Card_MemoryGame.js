import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // 6.2.2

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.handleClick);
    // let CardSource = FontAwesome;
    // let icon_name = "question-circle";
    // let icon_color = "#393939";
    let source = require("../../assets/brain_teez.png");

    if (this.props.is_open) {
      source = this.props.src;
      //   CardSource = this.props.src;
      //   icon_name = this.props.name;
      //   icon_color = this.props.color;
    }

    return (
      <>
        <TouchableOpacity onPress={this.props.handleClick}>
          <Image source={source} style={styles.image} />
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 110,
    width: 100,
    opacity: 1,
  },
});
