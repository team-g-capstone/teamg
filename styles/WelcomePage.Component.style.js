import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  anonButtonText: {
    color: "cornflowerblue",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  button: {
    width: 100,
    padding: 5,
    backgroundColor: "#ff9999",
    borderWidth: 2,
    borderColor: "#ffcccc",
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  logo: {
    width: "10%",
    height: "10%",
    marginLeft: "45%",
    paddingBottom: "10%",
    justifyContent: "center",
  },
  signUpText: {
    textAlign: "center",
    fontSize: 15,
    margin: 10,
    fontWeight: "bold",
    color: "white",
  }
});
