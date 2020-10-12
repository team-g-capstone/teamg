import {StyleSheet} from 'react-native'


export default StyleSheet.create({
   
    container: {
        
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#FFBF80",
        borderStyle: "solid",
        borderColor: 'black',
       
    },

    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      
      
    },
   
    
    questionContainer: {
      flexDirection: "row",
      padding: 15,
      justifyContent: "space-around",
      width: "60%",
      alignItems: "center",
    },
  
  
    rowContainer: {
      width: 50,
      height: 50,
    },

    square: {
      flexDirection: "row",
      width: 80,
      height: 80,
      backgroundColor: "red",
      padding: 1,
      margin: 20,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
    addSign: {
      position: "absolute",
      left: 45,
      top: "100%",
    },
    equalSign: {
      position: "absolute",
      left: 45,
      top: "100%",
    },
    inputContainer: {
      paddingTop: 80,
    },
    textInput: {
      borderColor: "#CCCCCC",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      height: 50,
      fontSize: 25,
      paddingLeft: 20,
      paddingRight: 20,
    },
    submitButton: {
      borderWidth: 1,
      borderColor: "#007BFF",
      borderRadius: 15,
      backgroundColor: "#74D8D1",
      padding: 12,
      margin: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
    submitButtonText: {
      color: "#000066",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
  
    },
    number: {
      
      position: "absolute",
      textAlign: "center",
      fontSize: 25,
      fontWeight: "bold",
      color: "white",
    
    },
    circle: {
      flexDirection: "row",
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      backgroundColor: "red",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
    triangle: {
      flexDirection: "row",
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: 50,
      borderRightWidth: 50,
      borderBottomWidth: 100,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "red",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
  });
  