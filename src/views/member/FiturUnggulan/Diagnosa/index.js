import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Image } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import { useNavigation } from '@react-navigation/native';
import Heading from '../../../../components/Heading';
import axios from 'axios';
import Navigasi from '../../../../partials/navigasi';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Diagnosa = () => {
  const navigation = useNavigation();
  const [cameraData, setCameraData] = useState(null);
  const [diagnosaResult, setDiagnosaResult] = useState(null);
  const [diagnosaPercentage, setDiagnosaPercentage] = useState(null);
  // const [Navigasi] = useState(null);

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
        openCamera();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const uploadPhoto = async (fileUri) => {
    try {
      let uniquePictureName = generateUniquePictureName();
      let formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        type: 'image/jpeg',
        name: uniquePictureName + '.jpg',
      });

      let response = await axios.post(
        'http://192.168.100.56:8000/api/send-stroke-face',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        console.log('Upload berhasil:', response.data);

        let data = JSON.parse(response.data.response);

        setDiagnosaResult(data.message);
        setDiagnosaPercentage(data.percentage);
      } else {
        console.error('Upload gagal. Status:', response.status, 'Data:', response.data);
      }
    } catch (error) {
      console.error('Kesalahan mengunggah file:', error);
    }
  };

  const generateUniquePictureName = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
     
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('Dibatalkan');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        const data = response.assets;
        console.log(data);
        setCameraData(data);
    
        if (data && data[0] && data[0].uri) {
          uploadPhoto(data[0].uri);
        }
      }
    });
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBarComponent />
      <Heading navigasi={() => navigation.replace(Navigasi.MAIN_APP)} textHeading={'Skrining Penyakit Stroke'} />
      <View style={styles.card}>
        <TouchableOpacity onPress={openCamera}>
        
          <Text style={{marginLeft:30}}>
          <Ionicons name='camera-sharp' size={50} color={"#061D81"} />
         
            </Text >
            <Text style={{marginLeft:1,marginBottom:4}}>   Open Camera</Text>
    
          
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {cameraData && (
          <Image
            source={{ uri: cameraData[0].uri }}
            style={styles.image}
          />
        )}
      </View>
  
        <View style={styles.diagnosaContainer}>
          <Text style={styles.diagnosaText}>Deskripsi: {diagnosaResult}</Text>
          <Text style={styles.diagnosaText}>Kecenderungan: {diagnosaPercentage}%</Text>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({

  

  container: {
    flex: 1,
  },
  card: {
    backgroundColor:'white',
    padding: 4,

    alignItems: 'center',

  },
  imageContainer: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 10,
    elevation: 3,
 marginTop:10,
 paddingTop:10, //asw awas padding jangan dibuat 'center' crash nanti

  
  },
  image: {
    width: 350,
    height: 400,
    marginTop: 20,
  },
  diagnosaContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    marginTop: 10,
  },
  diagnosaText: {
    color: 'black',
  },
});

export default Diagnosa;
