import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Alert,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { PieChart, StackedBarChart } from "react-native-chart-kit";

import * as ImagePicker from "expo-image-picker";

const dummyData = {
  name: "DJ",
  subjects: ["Math", "History"],
  levelsMath: ["Level 1", "Level 2", "Level 3"],
  levelsHist: "Level 1",
  score: ["5/10", "10/10", "8/10"],
  progress: "In Progress...",
};

const data = {
  labels: ["Level 1", "Level 2", "Level 3"],
  legend: ["Correct", "Wrong"],
  data: [
    [5, 5],
    [10, 0],
    [8, 2],
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
};

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#9E8FB2",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 1,
  useShadowColorFromDataset: false, // optional
};

export default function UserStats_PT({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const handleGraphPress = () => {
    setSelectedGraph(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.person}>
        <Text style={styles.text}>Name: {dummyData.name}</Text>
        {selectedImage !== null ? (
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: selectedImage.localUri }}
              style={styles.thumbnail}
            />

            <TouchableOpacity
              onPress={openImagePickerAsync}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Change photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imgContainer}>
            <Image
              source={require("../../assets/blank-profile-pic.jpeg")}
              style={styles.thumbnail}
            />
            <TouchableOpacity
              onPress={openImagePickerAsync}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.text}>Subjects:</Text>
        <TouchableOpacity onPress={handleGraphPress} style={styles.button}>
          <Text style={styles.buttonText}>Math</Text>
        </TouchableOpacity>
        {selectedGraph ? (
          <View style={styles.graph}>
            <StackedBarChart
              data={data}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-start",
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
  },
  thumbnail: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#7492EA",
    borderRadius: 5,
    width: "14%",
    height: "7%",
    alignContent: "center",
  },
  buttonText: { fontSize: 15, color: "#fff", alignSelf: "center" },
  progressContainer: {
    flex: 1,
    marginLeft: "-45%",
    marginTop: "5%",
    width: "40%",
  },
  graph: {
    flex: 1,
    justifyContent: "center",
  },
});
