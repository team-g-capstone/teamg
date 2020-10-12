import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
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

const dataLevel1 = [
  {
    correct: 5,
  },
  {
    wrong: 5,
  },
];
const dataLevel2 = [
  {
    correct: 10,
  },
  {
    wrong: 0,
  },
];
const dataLevel3 = [
  {
    correct: 8,
  },
  {
    wrong: 2,
  },
];
// {
//   level: "Level 2",
//   score: "10/10"
// },
// {
//   level: "Level 3",
//   score: "8/10"
// }

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
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default function UserStats({ navigation }) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedGraph, setSelectedGraph] = React.useState(null);

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

  const getGraph = () => {
    return (
      <View style={styles.graph}>
        <StackedBarChart
          style={styles.graphStyle}
          data={data}
          width={screenWidth - 400}
          height={150}
          chartConfig={chartConfig}
        />
      </View>
    );
  };
  const handleGraphPress = () => {
    setSelectedGraph(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.person}>
        <Text style={styles.text}>Name: {dummyData.name}</Text>
        {selectedImage !== null ? (
          <View style={styles.container}>
            <Image
              source={{ uri: selectedImage.localUri }}
              style={styles.thumbnail}
            />
          </View>
        ) : (
          <Image
            source={require("../../assets/blank-profile-pic.jpeg")}
            style={styles.thumbnail}
          />
        )}
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Subjects:</Text>
      <TouchableOpacity onPress={handleGraphPress} style={styles.button}>
        <Text style={styles.buttonText}>Math</Text>
      </TouchableOpacity>
      {selectedGraph ? (
        <View style={styles.graph}>
          <StackedBarChart
            style={styles.graphStyle}
            data={data}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
          />
        </View>
      ) : (
        <Text style={styles.text}>In Progress...</Text>
      )}

      {/* <Text style={styles.text}>Levels: {dummyData.levelsMath}</Text>
        <Text style={styles.text}>Score: {dummyData.score}</Text> */}
      {/* {dummyData.score.forEach((score) => {
          <Text style={styles.text}>{score}</Text>;
        })} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "red",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    justifyContent: "space-evenly", //ehh??
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
  buttonText: { fontSize: 15, color: "#fff" },
  person: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  graphStyle: {
    alignSelf: "flex-end",
    alignItems: "flex-start",
  },
});
