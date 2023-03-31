import { StyleSheet, Text, TouchableOpacity, View, Button} from "react-native";
import React, {useState, useEffect} from "react";
import { Camera, CameraType } from "expo-camera";
import * as Permissions from "expo-permissions";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";

const CameraScreen = ({navigation}) => {
  const [startCamera, setStartCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [permissions, requestPermission] = Camera.useCameraPermissions();
  const [imageCounter, setImageCounter] = useState(0);
  const [imagesCombinedString, setImagesCombinedString] = useState('');
  const [cameraRef, setCameraRef] = useState(null);

  if (!permissions){
    console.log('permissions still loading')
    return <View/>
  }

  if(!permissions.granted){
    console.log('permissions are required')
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  let camera = null;

  const __takePicture = async () => {
    if(imageCounter<1){
      setImagesCombinedString('')
    }
    console.log('entered')
    console.log(cameraRef)
    const photo = await cameraRef.takePictureAsync({ base64: true });
    console.log(photo.base64)
    // each base64 string
    let combinedString = imagesCombinedString +  photo.base64 + "-";
    setImagesCombinedString(combinedString)
    if(imageCounter < 5){
      setImageCounter(imageCounter+1)
    }
  };

  return (
    <View>
      <Camera
        ref={(r) => {
          setCameraRef(r);
        }}
        style={styles.camera}
        type={CameraType.back}
      >
        <TouchableOpacity onPress={__takePicture}>
          <View style={styles.button}>
            <Text></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Results", {
          concatenatedString: {imagesCombinedString}
        })}>
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Images Left: {5-imageCounter}</Text>
          </View>
          
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  camera: {
    width: WP(100),
    height: HP(80),
  },
  button: {
    width: WP(22),
    height: HP(10),
    backgroundColor: "#E35F21",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    left: WP(40),
    top: HP(60),
  },
  submitButton: {
    width: WP(22),
    height: HP(5),
    backgroundColor: "#E35F21",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    left: WP(70),
    top: HP(53),
  },
  submitButtonText: {
    color: "#fff",
  },
});
