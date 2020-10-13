import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import LottieView from "lottie-react-native";
import { useFonts, Chilanka_400Regular } from "@expo-google-fonts/chilanka";
import { AppLoading } from "expo";
import styles from "./UserStats_Student.component.style.js";

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

export default function UserStats_Student({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

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

  let image = require("../../assets/backgrounds/green.jpg");
  //Change font
  let [fontsLoaded] = useFonts({
    Chilanka_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
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
            {lvlsCompletedData.math.map((level, index) => {
              if (level !== false) {
                return (
                  <LottieView
                    style={styles.animationStar}
                    source={require(`../../assets/gold_star.json`)}
                    loop
                    autoPlay
                    key={index}
                  />
                );
              } else {
                return (
                  <LottieView
                    style={styles.animationCircle}
                    source={require(`../../assets/x_circle.json`)}
                    loop
                    autoPlay
                    key={index}
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
      </ImageBackground>
    </View>
  );
}
