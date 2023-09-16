import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import { getData } from '../../../../utils';
import Navigasi from '../../../../partials/navigasi';
import axios from 'axios';
import { baseUrl, colors } from '../../../../utils';
import Geolocation from '@react-native-community/geolocation';
import Heading from '../../../../components/Heading';

const BuatJadwal = ({ navigation, route }) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [rumah_sakit, setRumahSakit] = useState(null);
  const [latitudeMe, setLatitudeMe] = useState(null);
  const [longitudeMe, setLongitudeMe] = useState(null);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      dataLokasi();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const dataLokasi = async () => {
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

          setLatitudeMe(latitude)
          setLongitudeMe(longitude);

          axios
            .get(url)
            .then((response) => {
              axios({
                url: `${baseUrl.url}/master/rumah_sakit/data/find_nearest`,
                headers: {
                  Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "POST",
                data: {
                  latitude: latitude,
                  longitude: longitude
                }
              }).then((response) => {
                setRumahSakit(response.data.data);
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
      <StatusBarComponent />
      <Heading navigasi={() => navigation.navigate(Navigasi.MAIN_APP)} textHeading={"Buat Janji Ketemuan Langsung"} />

      <Text style={styles.textTitle}>
        Rumah Sakit Sekitar Anda
      </Text>
      <Text style={styles.subtextitle}>
        Beberapa Rumah Sakit Yang Bisa Menjadi Pilihan
      </Text>

      {rumah_sakit == null ? (
        <ActivityIndicator size={"large"} color={colors.primary} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 10}} />
          {rumah_sakit.map((item) => {
            return (
              <View key={item.id_rumah_sakit}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate(Navigasi.DETAIL_BUAT_JANJI, {
                    data: item
                  })
                }}>
                  <View style={styles.cardrumahsakit}>
                    <Image source={require("../../../../assets/images/gambar-rs.jpg")} style={{ height: 150, width: '100%', borderRadius: 10 }} />
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
                <TouchableOpacity style={{ backgroundColor: 'green', paddingVertical: 5, borderRadius: 5, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                  const origin = `${latitudeMe},${longitudeMe}`;
                  const destination = `${item.latitude},${item.longitude}`
                  const url = `https://www.google.com/maps/dir/${origin}/${destination}`
                  Linking.openURL(url);
                }} >
                  <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                    <Icon name="ios-location" style={{color: 'white', fontSize: 15}} /> Detail Lokasi
                  </Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
      )}

      {rumah_sakit == null ? (
        <View />
      ) : (
        <TouchableOpacity onPress={() => {
          navigation.navigate(Navigasi.All_DATA_RS)
        }} style={styles.button}>
          <Text style={styles.textButton}>
            Lihat Semua
          </Text>
        </TouchableOpacity>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  button: {
    borderColor: 'purple',
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins-Medium'
  },
  textTitle: {
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Poppins-Medium'
  },
  subtextitle: {
    color: 'grey',
    fontSize: 12,
    marginHorizontal: 10,
    fontFamily: 'Poppins-Medium'
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

export default BuatJadwal;
