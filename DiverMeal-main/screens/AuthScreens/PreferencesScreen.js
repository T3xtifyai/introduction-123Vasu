import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import { Provider as PaperProvider } from 'react-native-paper';
import { PaperSelect } from "react-native-paper-select";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Firebasekeys from "./../../config";
let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const user = firebase.auth().currentUser;

const PreferencesScreen = ({navigation}) => {
  const [allergies, setAllergies] = useState({
    value: "",
    list: [
      { _id: "1", value: "Peanut" },
      { _id: "2", value: "Shellfish" },
      { _id: "3", value: "Wheat" },
      { _id: "4", value: "Gluten" },
      { _id: "5", value: "Sesame" },
      { _id: "6", value: "Eggs" },
      { _id: "7", value: "Dairy" },
      { _id: "8", value: "Tree Nuts" },
    ],
    selectedList: [],
    error: "",
  });
  const [diets, setDiets] = useState({
    value: "",
    list: [
      { _id: "1", value: "Vegan" },
      { _id: "2", value: "Vegetarian" },
      { _id: "3", value: "Halal" },
      { _id: "4", value: "Kosher" },
      { _id: "5", value: "Keto" },
      { _id: "6", value: "Low-Carb" },
      { _id: "7", value: "Paleo" },
      { _id: "8", value: "Dukan" },
    ],
    selectedList: [],
    error: "",
  });


  const uploadText = async() => {
    firebase.firestore()
    .collection('Preferences').doc(`${user.uid}`)
    .set({
      name: `${user.displayName}`,
      diets: diets.selectedList,
      allergies: allergies.selectedList,
      uid: `${user.uid}`
    })
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <PaperProvider>
      <View style={styles.alignment}>
        <Text style={styles.heading}>Preferences</Text>
      </View>

      <Text style={styles.subheading}>
        Enter any preferences you have with your diet
      </Text>
      <Text
        style={{
          fontWeight: "600",
          fontSize: HP(2.3),
          marginVertical: HP(1),
          bottom: HP(3),
        }}
      >
        Allergies
      </Text>

      <PaperSelect
        label="Select Allergies"
        value={allergies.value}
        onSelection={(value) => {
          setAllergies({
            ...allergies,
            value: value.text,
            selectedList: value.selectedList,
            error: "",
          });
        }}
        arrayList={[...allergies.list]}
        selectedArrayList={allergies.selectedList}
        errorText={allergies.error}
        multiEnable={true}
        textInputMode="flat"
        checkboxColor="#E35F21"
        searchStyle={{ iconColor: "#E35F21" }}
        containerStyle={{ width: WP(85), bottom: HP(3) }}
        dialogButtonLabelStyle={{ color: "#E35F21" }}
      />
      <Text style={styles.category}>Diets</Text>
      <PaperSelect
        containerStyle={{ width: WP(85) }}
        label="Select Diets"
        value={diets.value}
        onSelection={(value) => {
          setDiets({
            ...diets,
            value: value.text,
            selectedList: value.selectedList,
            error: "",
          });
        }}
        arrayList={[...diets.list]}
        selectedArrayList={diets.selectedList}
        errorText={diets.error}
        multiEnable={true}
        textInputMode="flat"
        checkboxColor="#E35F21"
        searchStyle={{ iconColor: "#E35F21" }}
        dialogButtonLabelStyle={{ color: "#E35F21" }}
      />
      
      {/* TODO: push all of the user's preferences to firestore */}
      <TouchableOpacity activeOpacity={1} onPress={() => {
        uploadText()
        navigation.navigate("Dashboard")
        }}>
        <View style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Continue</Text>
        </View>
      </TouchableOpacity>
      </PaperProvider>
    </View>
  );
};

export default PreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: WP(35)
  },
  alignment: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: WP(80),
    bottom: HP(8),
  },
  heading: {
    fontWeight: "bold",
    fontSize: HP(3),
  },
  subheading: {
    fontSize: HP(1.7),
    bottom: HP(8),
    color: "#E35F21",
    width: WP(80),
  },
  category: {
    fontWeight: "600",
    fontSize: HP(2.3),
    marginVertical: HP(1),
  },
  select: {
    width: WP(85),
  },
  submitButton: {
    borderRadius: 12,
    backgroundColor: "#E35F21",
    height: HP(7),
    shadowOffset: { width: WP(0), height: HP(0.24) },
    shadowColor: "black",
    shadowOpacity: 0.25,
    width: WP(80),
    alignItems: "center",
    top: HP(12),
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: HP(2.2),
    color: "#fff",
    fontWeight: "bold",
  },
});
