import React, {useEffect, useState} from 'react'
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { Provider } from "react-native-paper";
import LoginScreen from "./screens/AuthScreens/LoginScreen";
import PreferencesScreen from "./screens/AuthScreens/PreferencesScreen";
import RegisterScreen from "./screens/AuthScreens/RegisterScreen";
import SplashScreen from "./screens/AuthScreens/SplashScreen";
import DashboardScreen from "./screens/MainScreens/DashboardScreen";
import ProfileScreen from "./screens/MainScreens/ProfileScreen";
import ResultsScreen from "./screens/MainScreens/ResultsScreen";
import RecipeScreen from "./screens/MainScreens/RecipeScreen";
import CameraScreen from "./screens/MainScreens/CameraScreen";
import ResultsScreenDashboard from './screens/MainScreens/ResultsScreenDashboard';
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Firebasekeys from './config'
let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { heightPercentageToDP } from "react-native-responsive-screen";

const Main = createMaterialBottomTabNavigator();
const Auth = createStackNavigator();
const Dashboard = createStackNavigator();
const OCRRecognition = createStackNavigator();
const Profile = createStackNavigator();

const inactiveColor = "#ededed";
const themecolor = "#E35F21";
const tabcolor = "#fff";

const ProfileNavigator = () => {
  return (
    <Profile.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: themecolor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
      initialRouteName="Profile"
    >
      <Profile.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Profile.Navigator>
  );
};

const OCRRecognitionNavigator = () => {
  return (
    <OCRRecognition.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: themecolor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
      initialRouteName="OCR"
    >
      <OCRRecognition.Screen
        name="OCR"
        component={CameraScreen}
        options={{
          title: "Take 5 Pictures Of Your Ingredients",
          headerBackTitleVisible: false,
        }}
      />
      <OCRRecognition.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          title: "Image Results",
          headerBackTitleVisible: false,
        }}
      />
      <OCRRecognition.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{
          title: "Recipe Results",
          headerBackTitleVisible: false,
        }}
      />
    </OCRRecognition.Navigator>
  );
};

const DashboardNavigator = () => {
  return (
    <Dashboard.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: themecolor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
      initialRouteName="Preferences"
    >
      <Dashboard.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
      <Dashboard.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Dashboard.Screen
        name="Results Dashboard"
        component={ResultsScreenDashboard}
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Dashboard.Navigator>
  );
};

function MainNavigator() {
  return (
    <NavigationContainer>
      <Main.Navigator
        initialRouteName="Dashboard Navigator"
        sceneAnimationEnabled="true"
        activeColor={tabcolor}
        inactiveColor={inactiveColor}
        barStyle={{
          backgroundColor: `${themecolor}`,
        }}
        shifting={true}
      >
        <Main.Screen
          name="Dashboard Navigator"
          component={DashboardNavigator}
          options={{
            title: "Dashboard",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="view-dashboard-variant"
                size={26}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
        />
        <Main.Screen
          name="Camera"
          component={OCRRecognitionNavigator}
          options={{
            title: "Camera",
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="camera"
                size={24}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
        />
        <Main.Screen
          name="Profile Navigator"
          component={ProfileNavigator}
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="settings"
                size={26}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
        />
      </Main.Navigator>
    </NavigationContainer>
  );
}

function AuthNavigator() {
  return (
    <NavigationContainer>
      <Auth.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Auth.Screen name="Splash" component={SplashScreen} options={{}} />
        <Auth.Screen name="Login" component={LoginScreen} options={{}} />
        <Auth.Screen name="Register" component={RegisterScreen} options={{}} />
      </Auth.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(); // Handle user state changes

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <AuthNavigator />;
  }

  return <MainNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
console.log.disableYellowBox = true