import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import { useNavigation } from '@react-navigation/native';
import Heading from '../../../../components/Heading';
import Navigasi from '../../../../partials/navigasi';

const Diagnosa = () => {
  const navigation = useNavigation();
  const [cameraData, setCameraData] = useState(null);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        openCamera();  // Open the camera after permission is granted
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('Cancelled');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        const data = response.assets;
        console.log(data);
        setCameraData(data);  // Set camera data to state
      }
    });
  };

  useEffect(() => {
    requestCameraPermission();  // Request camera permission when the component mounts
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBarComponent />
      <Heading navigasi={() => navigation.replace(Navigasi.MAIN_APP)} textHeading={'Diagnosa'} />
      <View style={styles.navigationHeader}>
        <StatusBarComponent />
      </View>
      <View style={styles.card}>
        <TouchableOpacity onPress={openCamera}>
          <Text>
            Tempat untuk membuka kamera
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card1}>
        <Text style = {{color:'white',  padding: 20,borderRadius: 10,elevation: 2,}}>
          Tempat untuk hasil
        </Text>
        {cameraData && (
          <Image
            source={{ uri: cameraData[0].uri }}  // Display the image from camera
            style={{ width: 350, height: 300 , marginTop:20, }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  card1: {
    backgroundColor: '#BDC3C7',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    marginTop:10,
    flex :1,
    
  },
});

export default Diagnosa;
