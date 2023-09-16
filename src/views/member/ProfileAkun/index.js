import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import { colors, showSuccess } from '../../../utils';
import { getData } from '../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../partials/navigasi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../../utils';

const ProfileAkun = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [dataPribadi, setDataPribadi] = useState({});
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.nama, dataPribadi.token, dataPribadi.nomor_hp]);

  const getDataUserLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
    getData('dataUser').then(res => {
      setDataPribadi(res);
      setShowIndicator(false);
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
            await AsyncStorage.removeItem("dataUser");
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("isLoggedIn");

            await axios({
              url: `${baseUrl.url}/logout`,
              headers: {
                Authorization: 'Bearer ' + dataPribadi.token,
              },
              method: "GET"
            })

            showSuccess("Good Job, Logout Sukses", "Anda Berhasil Keluar Aplikasi");
            navigation.navigate(Navigasi.LOGIN);
          }
        }
      ]
    )
  };

  return (
    <>
      <View style={styles.background}>
        <StatusBarComponent />
        <View style={styles.heading}>
          <Text style={styles.textHeading}>
            {showIndicator
              ? 'Tunggu Sebentar'
              : dataPribadi.nama == null
                ? ''
                : dataPribadi.nama}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.viewFoundLogin}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 15,
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#ff0080',
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: '#ff0080',
                  width: 100,
                  height: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../../assets/images/people.png')}
                  resizeMode="cover"
                  style={{ width: 60, height: 60 }}
                />
              </View>
              <View style={{ paddingHorizontal: 15, flex: 2 }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  {dataPribadi.nama}
                </Text>
                <Text style={{ color: 'black', fontSize: 14 }}>{dataPribadi.nomor_hp}</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.replace(Navigasi.EDIT_PROFILE);
                  }}
                  style={{
                    backgroundColor: 'green',
                    marginTop: 10,
                    borderRadius: 10,
                    paddingVertical: 7,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}>
                    Edit Profil
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="home" style={{ fontSize: 20, color: 'black' }} />
                <Text style={{ color: 'black', fontWeight: 'bold' }}>55 KG</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="home" style={{ fontSize: 20, color: 'black' }} />
                <Text style={{ color: 'black', fontWeight: 'bold' }}>170 CM</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="home" style={{ fontSize: 20, color: 'black' }} />
                <Text style={{ color: 'black', fontWeight: 'bold' }}>
                  20 Tahun
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.UPDATE_PASSWORD_MEMBER);
            }}>
            <View style={styles.buttonListMenu}>
              <View style={styles.viewButtonListMenu}>
                <Text style={{ color: 'black' }}>Ubah Password</Text>
              </View>
              <View style={styles.iconButtonListMenu}>
                <Icon
                  name="arrow-forward"
                  style={{ fontSize: 20, color: 'black' }}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.buttonListMenu}>
              <View style={styles.viewButtonListMenu}>
                <Text style={{ color: 'black' }}>Riwayat Transaksi</Text>
              </View>
              <View style={styles.iconButtonListMenu}>
                <Icon
                  name="arrow-forward"
                  style={{ fontSize: 20, color: 'black' }}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.buttonListMenu}>
              <View style={styles.viewButtonListMenu}>
                <Text style={{ color: 'black' }}>Pusat Bantuan</Text>
              </View>
              <View style={styles.iconButtonListMenu}>
                <Icon
                  name="arrow-forward"
                  style={{ fontSize: 20, color: 'black' }}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.ALAMAT_TERSIMPAN);
            }}>
            <View style={styles.buttonListMenu}>
              <View style={styles.viewButtonListMenu}>
                <Text style={{ color: 'black' }}>Alamat Tersimpan</Text>
              </View>
              <View style={styles.iconButtonListMenu}>
                <Icon
                  name="arrow-forward"
                  style={{ fontSize: 20, color: 'black' }}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              logout();
            }}
            style={styles.buttonLogout}>
            <Text style={styles.textButtonLogout}>Keluar</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 5 }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Versi Aplikasi : 1.0
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    backgroundColor: '#051f84',
    padding: 15,
    height: 50,
  },
  textHeading: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: colors.textHeading,
  },
  backgroundViewNotLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewNotLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textNotLogin: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subTextNotLogin: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  viewFoundLogin: {
    backgroundColor: colors.background,
    elevation: 5,
    margin: 15,
    height: 200,
    borderRadius: 10,
  },
  buttonLogout: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginHorizontal: 15,
    marginTop: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  textButtonLogout: {
    fontSize: 14,
    color: colors.textHeading,
    fontWeight: 'bold',
  },
  buttonListMenu: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  viewButtonListMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconButtonListMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default ProfileAkun;
