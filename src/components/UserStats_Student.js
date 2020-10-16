import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import LottieView from "lottie-react-native";
import { useFonts, Chilanka_400Regular } from "@expo-google-fonts/chilanka";
import { AppLoading } from "expo";
import styles from "./UserStats_Student.component.style.js";

import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

import * as firebase from 'firebase';
import {useDocument} from "react-firebase-hooks/firestore";


export default function UserStats_Student(props) {

  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const {mathScores,logicScores, firstName,userUID} = props.route.params;

  //Getting the image from firebase
  const [value, loading, error] = useDocument(
    firebase.firestore().collection("users").doc(userUID)
  );
  let profilePicture;
  if(value && value.data()){
   profilePicture = value.data().imageUrl;
   }

  //Asking permission and open image picker
  let openImagePickerAsync = async () => {
    let {granted} = await ImagePicker.requestCameraRollPermissionsAsync();

    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect:[1,1],
        quality:0.5
      });
      if (!data.cancelled) {
        let newFile = {uri:data.uri, type:`test/${data.uri.split(".")[1]}`,name:`test/${data.uri.split(".")[1]}`}
        handleUpload(newFile);
      }

    } else{
    alert("Permission to access camera roll is required!");
    return;
    }

  };

  //handle upload to cloudinary
  const handleUpload =(image) =>{
   const data =  new FormData()
   //file from image arg
   data.append('file', image)
   data.append('upload_preset', "brainTeez")
   data.append('cloud_name','dp8rfxspl')
  //fetching to your cloudinary account
   fetch("https://api.cloudinary.com/v1_1/dp8rfxspl/image/upload",{
    method:"post",
    body:data
  }).then(res=>res.json())
  .then(data=>{
    setSelectedImage(data.url);
  })
  .catch(err=>{
    Alert.alert("Error while uploading")
  })
  }

  const handlePressUpdateImageUrl = async()=>{
    let userDocument = await firebase.firestore().collection('users').doc(userUID).get();
    userDocument.ref.update({
      imageUrl: selectedImage
    })
  }
  let image = require("../../assets/backgrounds/green.jpg");
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
          <Text style={styles.text}>Name: {firstName} </Text>

            <View style={styles.imgContainer}>
              <Image
                source={{uri:`${selectedImage? selectedImage:profilePicture}`}}
                style={styles.thumbnail}
              />
              {selectedImage?
              <>
              <TouchableOpacity
              onPress={openImagePickerAsync}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Pick another Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handlePressUpdateImageUrl}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </>
              :<TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Change Photo</Text>
              </TouchableOpacity>}
            </View>

        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.text}>Subjects:</Text>
          <Text style={styles.text}>Math</Text>
          <View style={styles.animationContainer}>
            {mathScores.map((level, index) => {
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

          <Text style={styles.text}>Logic</Text>
          <View style={styles.animationContainer}>
            {logicScores.map((level, index) => {
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
                    autoPlay
                    key={index}
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
