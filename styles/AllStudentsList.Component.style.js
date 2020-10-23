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
});
