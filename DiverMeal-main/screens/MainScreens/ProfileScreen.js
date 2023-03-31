import React, {useState, useEffect} from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Firebasekeys from "./../../config";
let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const user = firebase.auth().currentUser; 

const ProfileScreen = () => {
  const [displayName, setDisplayName] = useState("Vasu Arora");
  // TODO: replace all hard-coded information with user information
  return (
    <View style={styles.container}>
      <View style={styles.personalInfoContainer}>
        <Image
          source={{
            uri: "https://www.croptecshow.com/wp-content/uploads/2017/04/guest-avatar-250x250px.png",
          }}
          style={styles.userProfilePhoto}
        />
        <View style={styles.textContainer}>
        <Text style={styles.username}>Vasu Arora</Text>
          <Text style={styles.username}></Text>
        <Text style={styles.username}>shrisw2002@gmail.com</Text>
        </View>
      </View>
      <View>
        <View style={styles.profileSection}>
          <TouchableOpacity activeOpacity={1} onPress={() => {
            firebase.auth().signOut().then(() => {
              // Sign-out successful.
            }).catch((error) => {
              // An error happened.
            });
          }}>
            <View style={styles.leftProfileSection}>
              <AntDesign name="logout" size={23} style={styles.icon} />
              <Text style={styles.profileSectionText}>Sign out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginLeft: WP(4.83),
  },
  personalInfoContainer: {
    backgroundColor: "#E35F21",
    borderRadius: 16,
    width: WP(93),
    height: HP(11.12),

    flexDirection: "row",
    marginTop: HP(3.58),
  },
  userProfilePhoto: {
    width: WP(14.49),
    height: HP(6.69),
    borderRadius: 100,
    alignSelf: "center",
    marginLeft: WP(3.62),
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: WP(4.83),
  },
  username: {
    fontSize: HP(2),
    color: "#fff",
  },
  personalInfoText: {
    fontSize: HP(1.56),
    color: "#fff",
  },
  editButton: {
    backgroundColor: "#fff",
    borderRadius: 13,
    height: HP(2.79),
    width: WP(13.29),
    alignItems: "center",
    justifyContent: "center",
    left: WP(13.91),
    marginTop: HP(1.67),
  },
  editText: {
    color: "#E35F21",
    fontSize: HP(1.56),
  },
  profileSection: {
    marginLeft: HP(2.42),
    marginTop: HP(5.6),
    marginRight: WP(6.04),
    justifyContent: "space-between",
    flexDirection: "row",
  },
  icon: {
    color: "#E35F21",
  },
  leftProfileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileSectionText: {
    fontSize: HP(1.9),
    marginLeft: WP(4.83),
  },
  arrowIcon: {
    color: "#5A5A5A",
  },
});
