import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import * as Linking from 'expo-linking';

const RecipeScreen = ({route, navigation}) => {
  // TODO: Replace all of this information with information from the Tasty API

  // const {recipeData} = route.params;
  
  // console.log(recipeData)


  const retrieveRecipeInformation = () => {
    var myHeaders = new Headers();
    myHeaders.append("X-RapidAPI-Key", "bb7546689emsh7a73aa4a8d1f5aep1dc21bjsn9fe4f6ac5ef2");
    myHeaders.append("X-RapidAPI-Host", "tasty.p.rapidapi.com");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders, 
      redirect: 'follow'
    };

    fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${recipeData}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/228413.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.alignment}>
        <Text style={styles.heading}>Popcorn Snack Bars</Text>
        <Text></Text>
        <Text></Text>
        <Text onPress={() => Linking.openURL("https://vid.tasty.co/output/140665/hls24_1564523855.m3u8")}>Demo Video</Text>
      </View>
      <View style={styles.line} />
      <ScrollView style={styles.scroll}>
        <View style={styles.subcontainer}>
          <Text style={styles.category}>Items</Text>
          <Text style={styles.item}>• 6 Cups Popcorn</Text>
          <Text style={styles.item}>• 1 Cup Raw Almonds</Text>
          <Text style={styles.item}>• 1 Cup Dried Cranberry</Text>
          <Text style={styles.item}>• 1 Tablespoon Cinnamon</Text>
          <Text style={styles.item}>• 3/4 Cup Honey</Text>
        </View>
        
        <View style={styles.subcontainer}>
          <Text style={styles.category}>Directions</Text>
          <Text style={styles.item}>• Boil water for 20 minutes</Text>
          <Text style={styles.item}>• Cool water for 10 minutes</Text>
          <Text style={styles.item}>• Eat and enjoy!</Text>
        </View>
        
      </ScrollView>

      {/* TODO: Redirect to Dashboard */}
      <TouchableOpacity activeOpacity={1} >
        <View style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Done</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  image: {
    width: WP(100),
    height: HP(30),
  },
  alignment: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: WP(80),
    marginBottom: HP(3),
    left: WP(8),
  },
  heading: {
    fontWeight: "bold",
    fontSize: HP(3),
    top: HP(2),
  },
  category: {
    fontWeight: "600",
    fontSize: HP(2.3),
    marginVertical: HP(1),
  },
  subcontainer: {
    justifyContent: "flex-start",
    left: WP(8.3),
  },
  scroll: {
    height: HP(30),
    width: WP(100),
  },
  item: {
    fontWeight: "500",
    fontSize: HP(2),
  },
  line: {
    width: WP(100),
    borderWidth: "1px",
    borderColor: "#aeaeae",
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
    
    justifyContent: "center",
    left: WP(10),
  },
  submitButtonText: {
    fontSize: HP(2.2),
    color: "#fff",
    fontWeight: "bold",
  },
});
