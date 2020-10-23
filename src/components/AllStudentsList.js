import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Alert,
  ActivityIndicator,
  FlatList,
  Button,
} from "react-native";
import * as firebase from "firebase";
import { styles } from "../../styles/AllStudentsList.Component.style";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.listItemText}>{title}</Text>
  </View>
);

export default class AllStudentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsArr: [],
      userUID: this.props.route.params.userUID,
    };
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.getStudentsList();
  }

  getStudentsList = async () => {
    try {
      const userUID = this.props.route.params.userUID;
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .where("teacherUID", "==", userUID)
        .get();

      if (snapshot.empty) {
        Alert.alert("There are no students on your profile.");
        return;
      }
      let studentsList = [];
      await snapshot.forEach((doc) => {
        const student = doc.data();
        student.id = doc.id;
        studentsList.push(student);
      });

      this.setState({ studentsArr: [...studentsList] });
    } catch (err) {
      Alert.alert("There is an error", err.message);
    }
  };

  handlePress(studentUID) {
    console.log(studentUID);
  }

  render() {
    const studentsArr = this.state.studentsArr;
    const userUID = this.props.route.params.userUID;
    return (
      <ImageBackground
        style={styles.background}
        source={require("../../assets/backgrounds/blue.jpg")}
      >
        <View style={styles.listContainer}>
          <Text style={styles.screenTitle}>Student's List</Text>
          <Text style={styles.screenSubText}>
            Click on student's name to see their progress or make changes
          </Text>
          <ScrollView>
            <FlatList
              data={studentsArr}
              renderItem={({ item }) => {
                return (
                  <View style={styles.listItemContainer}>
                    <TouchableOpacity
                      style={styles.listItemTO}
                      onPress={() =>
                        this.props.navigation.navigate("UserStats_TCH", {
                          studentUID: item.id,
                          userUID: userUID,
                        })
                      }
                    >
                      <Item title={`${item.firstName} ${item.lastName}`} />
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}
