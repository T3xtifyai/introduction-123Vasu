import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Card from "../../components/Card";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Firebasekeys from "./../../config";
let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const user = firebase.auth().currentUser;

const DashboardScreen = ({navigation}) => {
  const [recommendations, setRecommendations] = useState();
  const [vegetarian, setVegetarian] = useState(true);
  

  const data = [
    {
      id: "1",
      title: "Recommended For You",
    },
    {
      id: "2",
      title: "Italian",
    },
    {
      id: "3",
      title: "Chinese",
    },
    {
      id: "4",
      title: "Mexican",
    },
    {
      id: "5",
      title: "Indian",
    },
  ];

  useEffect(() => {
    var query = firebase.firestore().collection('Preferences').where("value", "==", "Vegetarian");

      console.log('query value')
      console.log(query)
      if (query.length > 0) {
        setVegetarian(true)
      }else{
        setVegetarian(false)
      }
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'bb7546689emsh7a73aa4a8d1f5aep1dc21bjsn9fe4f6ac5ef2',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
    };
    
    fetch(`https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=${vegetarian}&peanut=false&from=0`, options)
      .then(response => response.json())
      .then((data) => {
        console.log('before')
        setRecommendations(data.results[0].item.compilations)
        console.log('after')
        console.log(data.results[0].item.compilations[0])
      })
      .catch(err => console.error(err));

      
  }, [])
  const Category = ({ title, description, image, country, id }) => (
    <View onPress={() => navigation.navigate("Recipe", {
      recipeData: id,
    })}>
      <Text style={styles.category} onPress={() => navigation.navigate("Results Dashboard", {
      recipeData: id
      })}>{title}</Text> 
      {/* TODO: Make this redirect to recipescreen with the necessary information needed */}
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("Results Dashboard", {
          recipeData: id,
        })}>
        <Card
          name={title}
          description={description}
          image={
            `${image}`
          }
          country={country}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} style={styles.searchIcon} />
        <TextInput placeholder="Search" style={styles.textInput}/>
      </View>
      <FlatList
        data={recommendations}
        renderItem={({ item }) => <Category title={item.name}  image={item.thumbnail_url} data={item} country={item.country} id={item.id}/>} //  description={item.item.compilations[0].description} 
        keyExtractor={(item) => item.show_id}
        style={{ width: WP(96), left: WP(4) }}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    alignSelf: "center",
    alignItems: "center",
    left: WP(8),
  },
  searchContainer: {
    flexDirection: "row",
    width: WP(81),
    height: HP(5.6),
    borderWidth: 1,
    left: WP(-8),
    borderColor: "#aeaeae",
    borderStyle: "solid",
    borderRadius: 12,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: HP(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    color: "#aeaeae",
    marginRight: 10,
    marginLeft: 8,
  },
  textInput: {
    width: WP(63),
  },
  heading: {
    fontWeight: "bold",
    fontSize: HP(3),
    bottom: HP(23),
    right: WP(20),
  },
  category: {
    fontWeight: "600",
    fontSize: HP(2.3),
  },
});
