import React, {useState} from 'react'
import X, {View, Animated, PanResponder} from 'react-native'
import {getRandomInt, colors, componentDidMountAudio, isDropArea} from './ShapesHelperFuncs'
import {Audio} from 'expo-av'
import {sortACircle} from '../redux/reducers/colorSortReducer'
import {connect} from 'react-redux'




const ColorSortCircles= (props) => {
    const width = props.width
    const pan = useState(new Animated.ValueXY())[0]
    let [color] = useState(colors[getRandomInt(0, 3)]);
    const opacity = useState(new Animated.Value(1))[0]
    
    Audio.setIsEnabledAsync(true)
    componentDidMountAudio();

   
    const panResponder = useState(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,

            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value,
                })
            },
            onPanResponderMove: Animated.event([null, {
                dx: pan.x, dy: pan.y
            }], {useNativeDriver: false}),
            
            onPanResponderRelease: async (e, gesture) => {
                const colorOfDrop = isDropArea(gesture, width)
              if(colorOfDrop) {
                 if(colorOfDrop === color) {
                    props.sorted()
                    let sound = new Audio.Sound();
                    const status = {
                      shouldPlay: false,
                    };
              
                    await sound.loadAsync(
                      require("../../assets/correctsort.mp3"),
                      status,
                      false
                    );
                    await sound.playAsync();
                    
                    Animated.timing(opacity, {
                        toValue: 0, 
                        duration: 1000, 
                        useNativeDriver: false,
                    }).start(() => {
                     
                    })
                   
                   
                
                    pan.flattenOffset()
                 } else {
                    Animated.spring(pan, {
                        toValue: {x: 0, y: 0},
                        friction: 5,
                        useNativeDriver: false,
                    }).start();
                    pan.flattenOffset()
                 }
                 
              } else {
                 
                  Animated.spring(pan, {
                      toValue: {x: 0, y: 0},
                      friction: 5,
                      useNativeDriver: false,
                  }).start();
                  pan.flattenOffset()
              }
           
            }
        })
    ) [0]

   
    

        return (
            <View style={{flex: 1}}>
              
                    <Animated.View
                        style={[
                            {width: 50,
                            height: 50,
                            borderRadius: 100/2,
                            backgroundColor: color,
                            opacity: opacity,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,   
                        },
                            
                            pan.getLayout()
                        ]}
                        {...panResponder.panHandlers}
                    />
                </View>
           
        )
}
const mapState = state => {
    return {
        colorSort: state.colorSort.current
    }
}
const mapDispatch = dispatch => {
    return {
        sorted: () => {dispatch(sortACircle())}
    }
}

export default connect (mapState, mapDispatch)(ColorSortCircles)