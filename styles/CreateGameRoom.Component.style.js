 import {StyleSheet} from 'react-native'
 
 export default StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignContent:"center"
  },
  button: {
  
    
    alignSelf: "center",
    margin: "0.8%",
    borderRadius: 5,
    backgroundColor: "#ff9999",
    
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderStyle: 'solid',
    borderWidth: 2,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: "#ffcccc",
    borderRadius: 5,
  },
  container:{
    alignItems:"center"
  },
  screenTitle: {
    fontSize: 30,
    
    fontWeight: "bold",
    color: "#fff192",

    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  steps:{
    fontSize:20,
    fontStyle: 'italic',
    margin: 10,
    fontWeight: "bold",
    color: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  textInput: {
    width: 250,
    borderWidth: 1,
    borderColor:"#6DA171",
    padding: 10,
    margin: "0.2%",
  },
})