import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LongCard = ({ name, description, image, prepTime }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.foodContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Recipe')}>
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
            <View style={{ right: WP(4), bottom: HP(0.5) }}>
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

export default LongCard;

const styles = StyleSheet.create({
  individualFoodContainer: {
    width: WP(80),
    height: HP(16.29),
    borderRadius: 12,
    marginLeft: WP(2.42),
    justifyContent: "flex-start",
    marginBottom: HP(1.12),
    backgroundColor: "#FAF9F6",
  },
  individualFoodContainerList: {
    width: WP(80),
    height: HP(16.29),
    borderRadius: 12,
    marginLeft: WP(2.42),
    justifyContent: "flex-start",
    marginBottom: HP(1.12),
    backgroundColor: "#fff",
  },
  individualFoodImage: {
    width: WP(80),
    height: HP(10.04),
    alignSelf: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  foodTextContainer: {
    marginLeft: WP(1.93),
    marginTop: HP(1.12),
    paddingLeft: WP(1.2),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeName: {
    fontSize: HP(1.56),
    lineHeight: HP(2),
  },
  foodItem: {
    color: "#aeaeae",
    fontSize: HP(1.45),
    lineHeight: HP(1.9),
    width: WP(65),
  },
});
