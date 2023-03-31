import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Text,
} from "react-native";
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

function LoginScreen({ navigation }) {
  // TODO: add google login
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => console.log(error));
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log("Signed in!");
        } else {
          console.log("Not Signed in!");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#999"
              keyboardType="email-address"
              textContentType="emailAddress"
              style={styles.textColor}
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              style={styles.textColor}
              placeholderTextColor="#999"
              textContentType="password"
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={() => handleSubmit()}>
          <View style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.haveAccountContainer}>
          <Text style={styles.haveAccountText}>Don't have an account?</Text>
          {/* TODO: add navigation register */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    bottom: HP(6),
  },
  text: {
    textAlign: "center",
    fontSize: HP(6.5),
    fontWeight: "bold",
    color: "#000",
  },
  formContainer: {
    paddingHorizontal: WP(8),
  },
  textInput: {
    paddingLeft: WP(4),
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: WP(85),
    height: HP(7),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#aeaeae",
    marginTop: HP(1),
  },
  textColor: {
    color: "#5A5A5A",
    width: WP(80),
    height: HP(5),
  },
  registerButton: {
    borderRadius: 12,
    backgroundColor: "#E35F21",
    height: HP(7),
    shadowOffset: { width: WP(0), height: HP(0.24) },
    shadowColor: "black",
    shadowOpacity: 0.25,
    alignItems: "center",
    top: HP(4),
    justifyContent: "center",
  },
  registerButtonText: {
    fontSize: HP(2.2),
    color: "#fff",
    fontWeight: "bold",
  },
  haveAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: HP(6),
  },
  haveAccountText: {
    color: "#000",
    fontSize: HP(1.7),
  },
  registerText: {
    color: "#E35F21",
    paddingLeft: WP(1),
    fontSize: HP(1.7),
    fontWeight: "bold",
  },
});

export default LoginScreen;
