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
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const lvlsCompletedData = {
  math: [
    "Level 1",
    "Level 2",
    "Level 3",
    "Level 4",
    "Level 5",
    false,
    false,
    false,
    false,
    false,
  ],
  history: [
    "Level 1",
    "Level 2",
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
};

export default function testingStudentDashboard(props) {
  //S1: const navigation , need to import
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  //S2: get the mathScores prop
  const mathScores = props.route.params.mathScores;
  console.log("from testing Student dash", mathScores);
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

  return (
    <View style={styles.container}>
      <View style={styles.person}>
        <Text style={styles.text}>Name: </Text>
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
        <Text style={styles.text}>Math</Text>
        <View style={styles.animationContainer}>
          {mathScores.map((level) => {
            if (level !== false) {
              return (
                <LottieView
                  style={styles.animationStar}
                  source={require(`../../assets/gold_star.json`)}
                  loop
                  autoPlay
                />
              );
            } else {
              return (
                <LottieView
                  style={styles.animationCircle}
                  source={require(`../../assets/x_circle.json`)}
                  loop
                  autoPlay
                />
              );
            }
          })}
        </View>

        <Text style={styles.text}>History</Text>
        <View style={styles.animationContainer}>
          {lvlsCompletedData.history.map((level) => {
            if (level !== false) {
              return (
                <LottieView
                  style={styles.animationStar}
                  source={require(`../../assets/gold_star.json`)}
                  loop
                  autoPlay
                />
              );
            } else {
              return (
                <LottieView
                  style={styles.animationCircle}
                  source={require(`../../assets/x_circle.json`)}
                  autoPlay
                />
              );
            }
          })}
        </View>
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
    marginLeft: "-55%",
    marginTop: "5%",
    marginBottom: "18%",
    width: "40%",
  },
  graph: {
    flex: 1,
    justifyContent: "center",
  },
  animationContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "15%",
    marginTop: "2%",
    width: "20%",
    height: "20%",
    //padding: "5%",
  },
  animationStar: {
    marginLeft: "-30%",
    //marginTop: "-10%",
    marginRight: "-25%",
    marginVertical: "-10%",
    //marginHorizontal: "100%",
    width: "100%",
    height: "100%",
    // padding: "5%",
  },
  animationCircle: {
    marginLeft: "-30%",
    //marginTop: "-10%",
    marginRight: "-50%",
    marginVertical: "-10%",
    width: "120%",
    height: "120%",
  },
});
