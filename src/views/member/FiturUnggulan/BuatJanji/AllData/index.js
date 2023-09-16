import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  ScrollView,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { colors, baseUrl, getData } from '../../../../../utils';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Navigasi from '../../../../../partials/navigasi';
import Heading from '../../../../../components/Heading';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent';

const AllData = ({ navigation }) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [rumah_sakit, setRumahSakit] = useState(null);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      getRumahSakit();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const getRumahSakit = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izinkan Mengambil Data Lokasi',
          message: 'Izinkan Mengambil Data Lokasi Untuk Pengiriman',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          axios
            .get(url)
            .then((response) => {
              axios({
                url: `${baseUrl.url}/master/rumah_sakit/data/find_nearest/all`,
                headers: {
                  Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "POST",
                data: {
                  latitude: latitude,
                  longitude: longitude
                }
              }).then((response) => {
                setRumahSakit(response.data);
              }).catch((error) => {
                console.log(error);
              })
            }).catch((error) => {
              console.log(error);
            })
        });
      } else {
        console.log('Tidak Ditemukan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent/>
      <Heading navigasi={() => navigation.goBack()} textHeading={"RS & Klinik Terdekat"} />
      <View style={styles.cardSearch}>
        <View style={styles.viewIcon}>
          <Icon
            name="search"
            style={{ color: 'gray', fontSize: 20, fontWeight: 'bold' }}
          />
        </View>
        <View style={styles.contentSearch}>
          <TextInput
            placeholder="Ex: RS. Plumbon Cirebon"
            placeholderTextColor="gray"
            style={{
              height: 40,
              fontSize: 12,
              color: 'gray',
            }}
          />
        </View>
      </View>
      {rumah_sakit == null ? (
        <ActivityIndicator size={"large"} color={colors.primary} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {rumah_sakit.map((item) => {
            return (
              <TouchableOpacity onPress={() => {
                navigation.navigate(Navigasi.DETAIL_BUAT_JANJI, {
                  data: item
                })
              }} key={item.id_rumah_sakit}>
                <View style={styles.cardrumahsakit}>
                  <Image source={require("../../../../../assets/images/gambar-rs.jpg")} style={{ height: 150, width: '100%', borderRadius: 10 }} />
                  <Text style={styles.judulrs} numberOfLines={1} ellipsizeMode={'tail'}>
                    {item.nama_rs}
                  </Text>
                  <Text style={styles.deskripsi} numberOfLines={1} ellipsizeMode={'tail'}>
                    {item.deskripsi_rs}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <View style={styles.rated}>
                        <Icon name="thumbs-up" style={{ fontSize: 15, color: 'blue', marginRight: 5 }} />
                        <Text style={{ color: 'blue', fontSize: 12, fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>
                          100%
                        </Text>
                      </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                      <View style={styles.jarak}>
                        <Icon name="ios-location" style={{ fontSize: 15, color: 'blue', marginRight: 5 }} />
                        <Text style={{ color: 'blue', fontSize: 12, fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>
                          {item.jarak} KM
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    marginVertical: 15,
    marginHorizontal: 15,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
  },
  jarakHorizontal: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  cardSearch: {
    marginHorizontal: 10,
    backgroundColor: '#f4f0f0',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  viewIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  contentSearch: {
    flex: 8,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardrumahsakit: {
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10
  },
  judulrs: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  deskripsi: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'justify',
    fontFamily: "Poppins-Medium",
  },
  rated: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    width: 80
  },
  jarak: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    width: 100
  }
});

export default AllData;
