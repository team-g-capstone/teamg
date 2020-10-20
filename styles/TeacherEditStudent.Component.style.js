import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  addAChildContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: "1%",
  },
  button: {
    width: 100,
    padding: 10,
    backgroundColor: "#441196",
    borderWidth: 2,
    borderRadius:5,
    borderColor: "#ffcccc",
    alignSelf: "center",
    margin: "1%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  headerText: {
    color: "#02042e",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom:"2%",
    paddingTop:"5%"
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  textInput: {
    width: 300,
    borderColor:"#de9999",
    borderWidth: 2,
    padding: 10,
    marginLeft: "25%",
  },
  textInputTitle:{
    color:"#fbedeb",
    marginLeft:"25%",
    fontSize: 18,
    fontWeight:"bold"
  },
  signUpText: {
    textAlign: "center",
    fontSize: 15,
    margin: 10,
    fontWeight: "bold",
    color: "white",
  },
  viewAllChildbutton: {
    width: 280,
    padding: 12,
    backgroundColor: "#441196",
    borderWidth: 2,
    borderColor: "#ffcccc",
    borderRadius: 5,
    alignSelf: "center",
    margin: "0.5%",
    marginLeft: "1%",
  }
});
