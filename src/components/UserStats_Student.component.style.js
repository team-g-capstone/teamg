import { StyleSheet } from "react-native";

export default StyleSheet.create({
  animationCircle: {
    marginLeft: "-20%",
    marginRight: "-50%",
    marginVertical: "-10%",
    width: "120%",
    height: "120%",
  },
  animationContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "15%",
    marginTop: "3%",
    width: "25%",
    height: "20%",
  },
  animationStar: {
    marginLeft: "-20%",
    marginRight: "-25%",
    marginVertical: "-10%",
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#F4B266",
    borderRadius: 5,
    width: "20%",
    height: "7%",
    alignContent: "center",
    margin:"0.5%",
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
    textAlign:"center",
    margin:"2%",
    fontFamily: "Chilanka_400Regular",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-start",

  },
  graph: {
    flex: 1,
    justifyContent: "center",
  },

  image: {
    flex: 1,
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  imgContainer: {
    flex: 1,
    flexDirection: "column",
  },
  person: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
    marginLeft: "5%",
    marginTop: "5%",
    position: "absolute",
  },
  progressContainer: {
    flex: 1,
    marginLeft: "30%",
    marginTop: "5%",
    marginBottom: "18%",
    width: "40%",
  },
  text: {
    fontSize: 24,
    paddingVertical: 3,
    fontFamily: "Chilanka_400Regular",
  },
  thumbnail: {
    width: "20%",
    height: "50%",
    resizeMode: "contain",
  },
});
