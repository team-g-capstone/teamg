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

import styles from "./UserStats_TCH.component.style.js";
import * as firebase from "firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigation } from "@react-navigation/native";

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
  let mixedData={
    labels: ["Math", "Logic", "Level 3"],
    legend: ["Completed", "Incompleted"],
    data: [
      [0, 10],
      [0, 10],
      [0, 10],
    ],
    barColors: ["#82AEB1", "#BC6286"],
  };

   if(value && value.data()){
   studentProfilePicture = value.data().imageUrl;
   studentName = value.data().firstName + " " + value.data().lastName;
   studentMathScores = value.data().mathScores;
   studentLogicScores = value.data().logicScores;
   studentEmail = value.data().email;
   let mathTrue = studentMathScores.filter(ele => ele===true).length;
   let logicTrue = studentLogicScores.filter(ele => ele===true).length;
   mixedData.data[0] = [mathTrue, 10-mathTrue];
   mixedData.data[1] = [logicTrue, 10-logicTrue];
   }


  const [selectedGraph, setSelectedGraph] = useState(null);



  const handleGraphPressMath = () => {
    setSelectedGraph("math");
  };
  const handleGraphPressHistory = () => {
    setSelectedGraph("history");
  };

  let [fontsLoaded] = useFonts({
    Chilanka_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  console.log(selectedGraph);

  const updateStudent = async ()=>{
    // let studentsArr;
    // if(value && value.data()){
      let studentsArr = value1.data().students;
    // }
      let studentDeletedArr = studentsArr.reduce((accum, student)=>{
       if(student !== studentUID){
          accum.push(student);
       }
       return accum;
      },[])

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
          teacherUID:'',
        });
    }

  const handlePressDelete = () => {
    //console.log("Im pressed ")

    updateStudent();
    Alert.alert("A student has been removed from your profile.")
    props.navigation.navigate('TeacherEditStudent', {userUID})

  }
  return (

      <ImageBackground source={require("../../assets/backgrounds/green.jpg")} style={styles.image}>
        <View style={styles.person}>
          <Text style={styles.text}>Student Name:</Text>
          <Text style={styles.text}>{studentName}</Text>
          <Text style={styles.text}>Email:</Text>
          <Text style={styles.text}>{studentEmail}</Text>
            <View style={styles.imgContainer}>
              <Image
                source={{uri:studentProfilePicture}}
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
            <Text style={styles.buttonText}>Mixed</Text>
          </TouchableOpacity>

          {selectedGraph === "math" ? (
            <View style={styles.graph}>
              <StackedBarChart
                data={dataMath}
                width={400}
                height={200}
                chartConfig={chartConfig}
              />
            </View>
          ) : (
            <View style={styles.graph}>
              <StackedBarChart
                data={mixedData}
                width={400}
                height={200}
                chartConfig={chartConfig}
              />
            </View>
          )}

          {/* if (selectedGraph === "math") {
            return (
            <View style={styles.graph}>
            <StackedBarChart
              data={dataMath}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
            />
          </View>)
          } else if (selectedGraph === "history"){
            return (
            <View style={styles.graph}>
            <StackedBarChart
              data={dataHistory}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
            />
          </View>)
          } else {
            return null
          } */}
        </View>
      </ImageBackground>

  );
}
