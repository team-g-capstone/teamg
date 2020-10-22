import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: 250,
    padding: 5,
    backgroundColor: "#8F540E",
    borderWidth: 2,
    borderColor: "#AD8557",
    borderRadius: 15,
    alignSelf: "center",
    margin: 8,
    marginTop:"2%"
  },
  buttonText: {
    color: "white",
    fontSize:25,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex:1,
    padding:"8%",
    backgroundColor: "#3FC5AB",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    height:60,
    fontSize:35,
    fontWeight:"bold",
    borderWidth: 3,
    borderColor:"#96C598",
    padding: 10,
    margin: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 35,
    margin: 10,
    fontWeight: "bold",
    color: "#441196",
  },
});
