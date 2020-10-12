import React, {useState} from 'react'
import X, {View, Animated, PanResponder} from 'react-native'
import {getRandomInt, colors} from './ShapesHelperFuncs'



const ColorSort = () => {
    const pan = useState(new Animated.ValueXY())[0]
    let [color] = useState(colors[getRandomInt(3)]);
   
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
            onPanResponderRelease: () => {
              
                pan.flattenOffset()
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
                            backgroundColor: color},
                            pan.getLayout()
                        ]}
                        {...panResponder.panHandlers}
                    />
                </View>
           
        )
}

export default ColorSort 