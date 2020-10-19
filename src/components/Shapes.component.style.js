import {StyleSheet} from 'react-native'


export default StyleSheet.create({

    container: {

      flex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: "#4d0000",
      borderStyle: "solid",
      borderColor: 'black',


    },
    levelText:{
      fontSize:20,
      fontWeight:"bold",
      marginLeft:"2%",
      color: "white",
      padding: "2%",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      height: '100%',
      width: "100%",
    },
    questionContainer: {
      flexDirection: "row",
      paddingTop: 1,
      margin: 20,
      justifyContent: "space-around",
      width: "80%",
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
      paddingTop: 60,

    },
    textInput: {
      color: 'white',
      borderColor: "#80471c",
      borderWidth: 4,
      borderRadius: 15,
      marginLeft: 20,
      marginRight: 45,
      height: 60,
      fontSize: 45,
      paddingLeft: 20,
      paddingRight: 0,
      textAlign: 'left',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
    submitButton: {

      borderWidth: 1,
      borderColor: "#007BFF",
      borderRadius: 15,
      backgroundColor: "#74D8D1",
      padding: 12,
      margin: 20,
      width: 250,
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
    questionMark: {
      position: "absolute",
      textAlign: "center",
      paddingTop: "40%",
      fontSize: 25,
      fontWeight: "bold",
      color: "white",
      justifyContent: "center",
    },
    number: {

      position: "absolute",
      paddingTop: "40%",
      fontSize: 25,
      fontWeight: "bold",
      color: "white",
      alignSelf: "center",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,

    },
    circle: {
      flexDirection: "row",
      width: 100,
      height: 100,
      borderRadius: 100 / 2,

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
