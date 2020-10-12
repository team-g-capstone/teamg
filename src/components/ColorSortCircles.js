import React, {useState} from 'react'
import X, {View, Animated, PanResponder} from 'react-native'
import {getRandomInt, colors} from './ShapesHelperFuncs'



const ColorSortCircles= (props) => {
    const width = props.width
    console.log(width)
    const pan = useState(new Animated.ValueXY())[0]
    let [color] = useState(colors[getRandomInt(3)]);
    const opacity = useState(new Animated.Value(1))[0]
    let showDraggable = true
     const isDropArea = (gesture) => {
         if(gesture.moveY < 50) {
             if(gesture.moveX < (width / 3)) {
                 return 'rgb(255, 0, 0)'
             } 
             if(gesture.moveX > width/ 3 && gesture.moveX < 2 * (width / 3)) {
                 return 'rgb(0, 0, 255)'
             }
             if(gesture.moveX > 2  * (width / 3)){
                 return 'rgb(0, 255, 0)'
             }
         }
        return null
    }
   
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
            onPanResponderRelease: (e, gesture) => {
                const colorOfDrop = isDropArea(gesture)
              if(colorOfDrop) {
                 if(colorOfDrop === color) {
                    Animated.timing(opacity, {
                        toValue: 0, 
                        duration: 1000, 
                        useNativeDriver: false,
                    }).start(() => {
                      console.log(opacity)
                      showDraggable = false
                     
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
                        },
                            
                            pan.getLayout()
                        ]}
                        {...panResponder.panHandlers}
                    />
                </View>
           
        )
}

export default ColorSortCircles 