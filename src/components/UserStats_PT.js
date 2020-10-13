import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { StackedBarChart } from "react-native-chart-kit";

import * as ImagePicker from "expo-image-picker";

const dummyData = {
  name: "DJ",
  subjects: ["Math", "History"],
  levelsMath: ["Level 1", "Level 2", "Level 3"],
  levelsHist: "Level 1",
  score: ["5/10", "10/10", "8/10"],
  progress: "In Progress...",
};

const dataMath = {
  labels: ["Level 1", "Level 2", "Level 3"],
  legend: ["Correct", "Wrong"],
  data: [
    [5, 5],
    [10, 0],
    [8, 2],
  ],
  barColors: ["#82AEB1", "#BC6286"],
};

const dataHistory = {
  labels: ["Level 1", "Level 2", "Level 3"],
  legend: ["Correct", "Wrong"],
  data: [
    [3, 7],
    [6, 4],
    [9, 1],
  ],
  barColors: ["#82AEB1", "#BC6286"],
};

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#F4B266",
  backgroundGradientFrom: "#F4B266",
  backgroundGradientTo: "#F4B266",
  // backgroundGradientFromOpacity: 0,
  // backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(66, 72, 116, ${opacity})`,
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

  const handleGraphPressMath = () => {
    setSelectedGraph("math");
  };
  const handleGraphPressHistory = () => {
    setSelectedGraph("history");
  };

  let image = require("../../assets/backgrounds/green.jpg");

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
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

          <TouchableOpacity
            onPress={handleGraphPressMath}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Math</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleGraphPressHistory}
            style={styles.button}
          >
            <Text style={styles.buttonText}>History</Text>
          </TouchableOpacity>

          {selectedGraph === "math" ? (
            <View style={styles.graph}>
              <StackedBarChart
                data={dataMath}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
              />
            </View>
          ) : (
            <View style={styles.graph}>
              <StackedBarChart
                data={dataHistory}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
              />
            </View>
          )}
          {/*
          {selectedGraph ? (
            <View style={styles.graph}>
              <StackedBarChart
                data={dataHistory}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
              />
            </View>
          ) : null} */}
        </View>
      </ImageBackground>
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
  thumbnail: {
    width: "15%",
    height: "50%",
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#7492EA",
    borderRadius: 5,
    width: "16%",
    height: "7%",
    alignContent: "center",
    marginTop: "1%",
  },
  buttonText: { fontSize: 15, color: "#fff", alignSelf: "center" },
  progressContainer: {
    flex: 1,
    marginLeft: "35%",
    marginTop: "5%",
    width: "40%",
  },
  graph: {
    flex: 1,
    justifyContent: "center",
  },
});
