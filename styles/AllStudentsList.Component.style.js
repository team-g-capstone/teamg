import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screenTitle: {
    textAlign: "center",
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
    color: "white",
  },
  screenSubText: {
    fontSize: 14,
    color: "white",
    fontStyle: "italic",
  },
  listContainer: {
    margin: "1%",
  },
  listItemTO: {
    width: 450,
    borderColor: "navy",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#b3d9ff",
    padding: "0.5%",
    marginBottom: 8,
  },
  listItemText: {
    color: "#001a33",
    fontSize: 20,
  },
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
  },
  backButtonText: {
    color: "#8FE09B",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#8FE09B",
    borderRadius: 15,
    padding: 1,
    margin: -45,
    marginLeft: -370,
    marginTop: -350,
    width: 110,
    height: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
