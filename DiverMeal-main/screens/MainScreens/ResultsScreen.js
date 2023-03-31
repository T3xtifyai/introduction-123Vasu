import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Button
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import LongCard from "../../components/LongCard";

const ResultsScreen = ({ name, description, image, prepTime, route, navigation }) => {
  const [data, setData] = useState();
  const {concatenatedString} = route.params;
  console.log('concatenated strings')
  console.log(concatenatedString)

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("user_images", `${concatenatedString}`);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:3001/classifier", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      var myHeaders2 = new Headers();
      myHeaders2.append("X-RapidAPI-Key", "bb7546689emsh7a73aa4a8d1f5aep1dc21bjsn9fe4f6ac5ef2");
      myHeaders2.append("X-RapidAPI-Host", "tasty.p.rapidapi.com");
      
      var requestOptions2 = {
        method: 'GET',
        headers: myHeaders2,
        redirect: 'follow'
      };
      
      fetch("https://tasty.p.rapidapi.com/tags/list?tomato?banana?carrots?orange?apple", requestOptions2)
        .then(response => response.text())
        .then(result => useState(result))
        .catch(error => console.log('error', error))
      
  }, [])

  // const Cards = () => {
  //   return <LongCard
  //       name={"Chicken Soup"}
  //       description={"Noodles with Chicken"}
  //       image={
  //         "https://plus.unsplash.com/premium_photo-1674654419438-3720f0b71087?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  //       }
  //       prepTime={"2 hrs"}
  //     />
  // } 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.alignment}>
        <Text style={styles.heading}>Results</Text>
      </View>
      
      {/* <FlatList
        data={data}
        renderItem={({ item }) => <Cards title={item.name}  image={item.thumbnail_url} data={item} country={item.country} id={item.id}/>} //  description={item.item.compilations[0].description} 
        keyExtractor={(item) => item.show_id}
        style={{ width: WP(96), left: WP(4) }}
      /> */}
      <TouchableOpacity onPress={() => navigation.navigate('Recipe', {
          recipeData: ""
        })}>
        <LongCard
          name={"Moroccan Carrot Salad with Oranges"}
          description={"The Moroccan carrot salad is a delightful side dish complementing many other meals."}
          image={
            "https://www.kitchenfrau.com/wp-content/uploads/2022/10/IMG_6989e-scaled.jpg"
          }
          prepTime={"1 hrs"}
        />
      </TouchableOpacity>
      <LongCard
        name={"Apple Banana Carrot Smoothie"}
        description={"A phenomenal source of potassium and fiber with a low amount of calories."}
        image={
          "https://weekendatthecottage.com/wp-content/uploads/2020/01/ABCSmoothie10.jpg"
        }
        prepTime={"30 min"}
        
      />
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  alignment: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: WP(80),
    marginBottom: HP(12),
  },
  heading: {
    fontWeight: "bold",
    fontSize: HP(3),
    top: HP(10),
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
