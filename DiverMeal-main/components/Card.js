import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Card = ({ name, description, image, prepTime }) => {
  return (
    <View style={styles.foodContainer}>
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.individualFoodContainer}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.individualFoodImage}
          />

          <View style={styles.foodTextContainer}>
            <View>
              <Text style={styles.placeName}>{name}</Text>
              <Text numberOfLines={1} style={styles.foodItem}>
                {description}
              </Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="clock-time-eight-outline"
                size={25}
                style={styles.timeIcon}
              />
              <Text>{prepTime}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  individualFoodContainer: {
    width: WP(60),
    height: HP(16),
    borderRadius: 12,
    marginLeft: WP(2.5),
    justifyContent: "flex-start",
    marginBottom: HP(1),
    backgroundColor: "#FAF9F6",
  },
  individualFoodContainerList: {
    width: WP(80),
    height: HP(16),
    borderRadius: 12,
    marginLeft: WP(2.4),
    justifyContent: "flex-start",
    marginBottom: HP(1.1),
    backgroundColor: "#fff",
  },
  individualFoodImage: {
    width: WP(60),
    height: HP(10),
    alignSelf: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  foodTextContainer: {
    marginLeft: WP(2),
    marginTop: HP(1),
    paddingLeft: WP(1.2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeName: {
    fontSize: HP(1.5),
    lineHeight: HP(2),
  },
  foodItem: {
    color: "#aeaeae",
    fontSize: HP(1.5),
    lineHeight: HP(2),
    width: WP(40),
  },
  timeIcon: {
    color: "#000",
    alignSelf: "flex-end",
    marginRight: HP(2),
  },
});
