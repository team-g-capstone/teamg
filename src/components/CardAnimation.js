
import React, {useRef} from "react";
import { StyleSheet, View, Animated,Image,
    TouchableOpacity,} from "react-native";


export default function Card  (props) {
    const src = props.src;
    const id = props.id
    let numCorrect = props.numCorrect
    console.log(numCorrect)
    const bounceAnim = useRef(new Animated.Value(1)).current;
    console.log(bounceAnim)
    const handlePress = () => {
        console.log('HELLLO', numCorrect)
        if(numCorrect === 1) {
            console.log('HELLo')
        console.log(bounceAnim)
      
        Animated.spring(bounceAnim, {
            toValue: 0,
            friction: 500,
            useNativeDriver: true,
          }).start();
       
        console.log(bounceAnim[0], 'HELLo')
        }
      };
    


  return (
     
    <Animated.View style={[styles.image, {opacity: bounceAnim}]}>
    <TouchableOpacity onPress={() => handlePress()}>
    <Image source={src} style={[styles.image]}/>
  </TouchableOpacity>
  </Animated.View>
  
  );
};

const styles = StyleSheet.create({
//   animation: {
//     flex: 3,
//     justifyContent: "flex-end",
//     marginLeft: "40%",
//     marginVertical: "-17%",
//     width: "100%",
//     height: "100%",
//     padding: "5%",
//   },

image: {
    height: 120,
    width: 105,
    opacity: 1,
    marginLeft: "1%",
    borderWidth: 1,
    // backgroundColor: `rgb(0, 0, 0)`,
  },
});

// const mapState = (state) => {
//   return {
//     isPlaying: state.audio.isPlaying,
//   };
// };

// {height: bounceAnim}

// export default connect(mapState)(Animations);
