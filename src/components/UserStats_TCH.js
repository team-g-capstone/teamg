import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  Alert,
  ActivityIndicator,
  AccessibilityInfo,
} from "react-native";
import { StackedBarChart } from "react-native-chart-kit";

import { useFonts, Chilanka_400Regular } from "@expo-google-fonts/chilanka";
import { AppLoading } from "expo";
import * as ImagePicker from "expo-image-picker";

import styles from "../../styles/UserStats_TCH.component.style";
import * as firebase from "firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#F4B266",
  backgroundGradientFrom: "#F4B266",
  backgroundGradientTo: "#F4B266",
  color: (opacity = 1) => `rgba(66, 72, 116, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 1,
  useShadowColorFromDataset: false, // optional
};

export default function UserStats_TCH(props) {
  const navigation = useNavigation();
  //Teacher ID
  const userUID = props.route.params.userUID;
  //Child ID, DUMMY for now, need to get it from PROPS
  const studentUID = props.route.params.studentUID;

  const [value, loading, error] = useDocument(
    firebase.firestore().collection("users").doc(studentUID)
  );

  const [value1, loading1, error1] = useDocument(
    firebase.firestore().collection("users").doc(userUID)
  );
  let studentProfilePicture;
  let studentName;
  let studentMathScores;
  let studentLogicScores;
  let studentEmail;
  let mixedData = {
    labels: ["Math", "Logic", "Level 3"],
    legend: ["Completed", "Incompleted"],
    data: [
      [0, 10],
      [0, 10],
      [0, 10],
    ],
    barColors: ["#82AEB1", "#BC6286"],
  };

  if (value && value.data()) {
    studentProfilePicture = value.data().imageUrl;
    studentName = value.data().firstName + " " + value.data().lastName;
    studentMathScores = value.data().mathScores;
    studentLogicScores = value.data().logicScores;
    studentEmail = value.data().email;
    let mathTrue = studentMathScores.filter((ele) => ele === true).length;
    let logicTrue = studentLogicScores.filter((ele) => ele === true).length;
    mixedData.data[0] = [mathTrue, 10 - mathTrue];
    mixedData.data[1] = [logicTrue, 10 - logicTrue];
  }

  let [fontsLoaded] = useFonts({
    Chilanka_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const updateStudent = async () => {
    let studentsArr = value1.data().students;
    let studentDeletedArr = studentsArr.reduce((accum, student) => {
      if (student !== studentUID) {
        accum.push(student);
      }
      return accum;
    }, []);

    let teacherDocument = await firebase
      .firestore()
      .collection("users")
      .doc(userUID)
      .get();
    teacherDocument.ref.update({
      students: studentDeletedArr,
    });
    //Empty student teacherUID field DONE, need testing
    let studentDocument = await firebase
      .firestore()
      .collection("users")
      .doc(studentUID)
      .get();
    studentDocument.ref.update({
      teacherUID: "",
    });
  };
  const handleYes = () => {
    updateStudent();
    Alert.alert("A student has been removed from your profile.");
    props.navigation.navigate("TeacherEditStudent", { userUID });
  };

  const handlePressDelete = () => {
    Alert.alert(
      "ALERT",
      "Student will be permanently removed from your profile. Do you want to proceed?",
      [
        { text: "YES", onPress: handleYes },
        {
          text: "NO",
          onPress: () => console.log("NO Presses"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/backgrounds/green.jpg")}
      style={styles.image}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>⇦ Back</Text>
      </TouchableOpacity>
      <View style={styles.person}>
        <Text style={styles.text}>Student Name:</Text>
        <Text style={styles.subText}>{studentName}</Text>
        <Text style={styles.text}>Email:</Text>
        <Text style={styles.subText}>{studentEmail}</Text>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: studentProfilePicture }}
            style={styles.thumbnail}
          />
          <TouchableOpacity
            onPress={handlePressDelete}
            style={styles.deleteButton}
          >
            <Text style={styles.buttonText}>DELETE STUDENT</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.chartTitle}> Statistics by Subject:</Text>
        <View style={styles.graph}>
          <StackedBarChart
            data={mixedData}
            width={400}
            height={200}
            chartConfig={chartConfig}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
