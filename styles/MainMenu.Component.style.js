import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: 250,
    padding: 1,
    backgroundColor: "#ff9999",
    borderWidth: 2,
    borderColor: "#ffcccc",
    borderRadius: 15,
    alignSelf: "center",
    margin: 5,
    marginTop:"5%",
    marginLeft:"1.7%"
  },
  buttonText: {
    color: "white",
    fontSize:25,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    width: 250,
    padding: 1,
    backgroundColor: "#ff9999",
    borderWidth: 2,
    borderColor: "#ffcccc",
    borderRadius: 15,
    alignSelf: "center",
    margin: 5,
    marginTop:"5%",
    marginLeft:"1.7%"
  },
  deleteText:{
    color: "white",
    fontSize:20,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerText: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  progressButton: {
    alignSelf: "flex-end",
  },
  signUpText: {
    textAlign: "center",
    fontSize: 15,
    margin: 10,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
    color: "white",
  },
  anonButtonText: {
    color: "cornflowerblue",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop:"1%",
  }
});
