import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch, PermissionsAndroid } from 'react-native';
import { baseUrl, colors, getData } from '../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../partials/navigasi';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { configfirebase } from '../../../firebase/firebaseConfig';

const ProfileAkunDokter = ({ navigation }) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [getswitch, setswitch] = useState(false);
  const [getprofil, setprofil] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [alamat, setAlamat] = useState(null);

  useEffect(() => {
    getDataUserLocal();
    const debounceTimeout = setTimeout(() => {
      requestLocationPermission();
      profil();
    }, 300);

    return () => clearTimeout(debounceTimeout);

  }, [dataPribadi.uuid_firebase, dataPribadi.nama, dataPribadi.nomor_hp]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.watchPosition(async position => {
          const { latitude, longitude } = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          await axios
            .get(url)
            .then((response) => {
              setAlamat(response.data.address.village)

            }).catch((error) => {
              console.log(error);
            });

          const locationData = {
            uuid: dataPribadi.uuid_firebase,
            latitude: latitude,
            longitude: longitude
          };

          const checkFirebase = configfirebase.database().ref(`locations/${dataPribadi.uuid_firebase}`);

          checkFirebase.once("value", (snapshot) => {
            if (snapshot.val()) {
              configfirebase.database()
                .ref(`locations/${dataPribadi.uuid_firebase}`)
                .update(locationData)
            } else {
              configfirebase.database()
                .ref(`locations/${dataPribadi.uuid_firebase}`)
                .set(locationData);
            }
          })

          setLatitude(latitude)
          setLongitude(longitude);
        });
      } else {
        console.log('Tidak Ditemukan ');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const profil = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/akun/profil/dokter/profil`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      });

      setprofil(response.data.data.is_online);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleswitch = () => {
    setswitch(previous => !previous);
  }

  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <View style={{ marginRight: 10 }}>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
            PROFIL 3
          </Text>
        </View>
        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={getprofil ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor={"#3e3e3e"}
            onValueChange={toggleswitch}
            value={getprofil}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.cardProfile}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../../assets/images/people.png')}
              style={{
                width: 100,
                height: 100,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 50,
                position: 'relative',
              }}
            />
            <TouchableOpacity
              style={{ position: 'absolute', paddingLeft: 90, paddingTop: 30 }} onPress={() => {
                navigation.navigate(Navigasi.EDIT_PROFILE_DOKTER)
              }}>
              <Icon
                name="create"
                style={{ fontSize: 30, color: 'green', fontWeight: 'bold' }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 10 }}>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                }}>
                {dataPribadi.nama}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  color: 'gray',
                  fontFamily: 'Poppins-Medium',
                }}>
                {dataPribadi.nomor_hp}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: 'white', elevation: 5, borderRadius: 5 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 15, justifyContent: 'flex-start', alignItems: 'center' }}>
            <Icon name='create-outline' style={{ fontSize: 25, color: 'black' }} />
            <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 5 }}>Ubah Password</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
              <Icon name='arrow-forward' style={{ fontSize: 20, color: 'black' }} />
            </View>
          </View>
        </View>
        <Text style={{ color: 'black', fontSize: 14 }}>
          Alamat Saya : {alamat}
        </Text>
        <Text style={{ color: 'black', fontSize: 14 }}>
          {latitude}, {longitude}
        </Text>
        <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 14, textAlign: 'center', marginTop: 10 }}>Versi Aplikasi 1.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    backgroundColor: '#051f84',
    padding: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  cardProfile: {
    backgroundColor: colors.backgroundPutih,
    elevation: 5,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  imageProfile: {
    borderColor: 'black',
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  buttonProfile: {
    backgroundColor: 'blue',
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileAkunDokter;
