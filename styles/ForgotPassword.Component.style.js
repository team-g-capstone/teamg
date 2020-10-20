import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: 150,
    padding: 5,
    backgroundColor: "#1070D1",
    borderWidth: 2,
    borderColor: "#79ACDE",
    borderRadius: 15,
    alignSelf: "center",
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex:1,
    padding:"8%",
    alignItems: "center",
    justifyContent: "center",
  },
  emailInput: {
    width: 300,
    borderWidth: 2,
    borderColor:"#39773D",
    padding: 10,
    margin: 5,
  },
  title:{
    textAlign: "center",
    fontSize: 35,
    margin: 10,
    fontWeight: "bold",
    color: "#2E6194",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    margin: 10,
    fontStyle:"italic",
    fontWeight:"bold",
    color: "#1070D1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  }
});
