import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop:"1%",
  },
  container: {
    flex:1,
    padding:"8%",
    backgroundColor: "#3FC5AB",
    alignItems: "center",
    justifyContent: "center",
  },
  listView:{
    flexDirection:"column",
    alignItems:"center",
  },
  listText:{
    fontSize:25,
    fontWeight:"bold",
    color:"white",
    textAlign:"center"
  },
  playersList:{
    flexDirection:"row",
    fontSize:20,
  },
  subTitleText: {
    textAlign: "center",
    fontSize: 25,
    textDecorationLine:"underline",
    margin: 10,
    fontWeight: "bold",
    color: "#40434E",
  },
  titleText: {
    textAlign: "center",
    fontSize: 30,
    fontStyle:'italic',
    margin: 10,
    fontWeight: "bold",
    color: "#441196",
  },
  touchButton:{
    width: 250,
    padding: 5,
    backgroundColor: "#441196",
    borderWidth: 2,
    borderColor: "#ffcccc",
    borderRadius: 5,
    alignSelf: "center",
    margin: "0.5%",
    marginLeft: "1%",
    marginTop:"2%"
  }
});

