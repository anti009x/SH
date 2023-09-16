import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import { baseUrl, colors, getData, showSuccess } from '../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Navigasi from '../../../partials/navigasi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListFitur from '../../../components/ListFitur';

const Dashboard = ({ navigation }) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const currenttime = new Date().getHours();
  let greeting;

  if (currenttime < 10) {
    greeting = "Selamat Pagi";
  } else if (currenttime < 15) {
    greeting = "Selamat Siang";
  } else if (currenttime < 18) {
    greeting = "Selamat Sore";
  } else {
    greeting = "Selamat Malam";
  }

  useEffect(() => {
    getDataUserLocal();
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const logout = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda Yakin Untuk Keluar ?',
      [
        {
          text: 'Batal',
          style: 'cancel'
        },
        {
          text: 'Setuju',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("dataUser");
              await AsyncStorage.removeItem("user");
              await AsyncStorage.removeItem("isLoggedIn");

              await axios({
                url: `${baseUrl.url}/logout`,
                headers: {
                  Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
              })

              showSuccess("Good Job, Logout Sukses", "Anda Berhasil Keluar Aplikasi");
              navigation.navigate(Navigasi.LOGIN);
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    )
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Hallo, {greeting},
              </Text>
              <Text style={{ color: 'white', fontSize: 12 }}>
                {dataPribadi.nama}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}>
                <Icon
                  name="exit-outline"
                  style={{ fontSize: 30, color: 'white' }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.textSaldo}>Saldo Anda</Text>
          <Text style={styles.saldo}>Rp. 1.000.000.000.000</Text>
          <View style={styles.cardDashboard}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
              }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require("../../../assets/images/people.png")} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 50, borderColor: 'black', borderWidth: 1 }} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>
                  {dataPribadi.nama}
                </Text>
                <Text style={{ color: 'black', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                  {dataPribadi.nomor_hp}
                </Text>
                <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                <Text style={{ color: 'black', fontSize: 12, fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>
                  Nomor STR : 12345678910
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 2, marginTop: 30 }}>
        <ScrollView>

          <View style={styles.fitur}>
            <ListFitur
              onPress={() => {
                navigation.navigate(Navigasi.LIST_RESEP_OBAT)
              }}
              nameIcon={"cart"}
              textfitur={"Data Resep Obat"}
            />
            <ListFitur
              onPress={() => {
                navigation.navigate(Navigasi.JADWAL_BUAT_JANJI)
              }}
              nameIcon={"book"}
              textfitur={"Jadwal Buat Janji"}
            />
          </View>

          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <View style={[styles.cardRekap, {marginRight: 10}]}>
                <Icon name="checkmark-done-sharp" style={{ fontSize: 50, color: '#051f84' }} />
                <Text style={styles.titlerekap}>
                  Total Pasien Teratasi
                </Text>
                <Text style={styles.totalrekap}>
                  100
                </Text>
              </View>
              <View style={[styles.cardRekap, {marginLeft: 10}]}>
                <Icon name="close" style={{ fontSize: 50, color: '#051f84' }} />
                <Text style={styles.titlerekap}>
                  Pasien Belum Teratasi
                </Text>
                <Text style={styles.totalrekap}>
                  100
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <View style={[styles.cardRekap, {marginRight: 10}]}>
                <Icon name="git-network-sharp" style={{ fontSize: 50, color: '#051f84' }} />
                <Text style={styles.titlerekap}>
                  Pasien Sedang Diatasi
                </Text>
                <Text style={styles.totalrekap}>
                  100
                </Text>
              </View>
              <View style={[styles.cardRekap, {marginLeft: 10}]}>
                <Icon name="book" style={{ fontSize: 50, color: '#051f84' }} />
                <Text style={styles.titlerekap}>
                  Total Antrian
                </Text>
                <Text style={styles.totalrekap}>
                  100
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#051f84',
    height: 170,
    padding: 10,
  },
  headerProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
  cardList: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  identitasImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  imageProfil: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 100,
  },
  content: {
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
    elevation: 5,
  },
  listApotek: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  saldo: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  textSaldo: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
  },
  cardDashboard: {
    backgroundColor: 'white',
    elevation: 5,
    height: 120,
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  cardRekap: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 5,
    height: 170,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titlerekap: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    paddingHorizontal: 2
  },

  totalrekap: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium'
  },

  fitur: {
    paddingVertical: 10,
    backgroundColor: colors.background,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 10
  }
});

export default Dashboard;
