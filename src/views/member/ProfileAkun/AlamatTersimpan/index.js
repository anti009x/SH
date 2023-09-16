import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { baseUrl, colors, getData, showSuccess } from '../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Heading from '../../../../components/Heading';
import Navigasi from '../../../../partials/navigasi';
import Button from '../../../../components/Button';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const AlamatTersimpan = ({ navigation }) => {

  const [dataPribadi, setDataPribadi] = useState({});
  const [alamat, setalamat] = useState(null);
  const [isdeleting, setisdeleting] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      ambildata();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const ambildata = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/master/alamat_user`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      });

      setalamat(response.data.data);

    } catch (error) {
      console.log(error);
    }
  }

  const hapus = async (id_alamat) => {
    Alert.alert(
      'Konfirmasi',
      'Yakin Untuk Menghapus Data Ini?',
      [
        {
          text: 'Batal',
          style: 'cancel'
        },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              setisdeleting(true);
              const response = await axios({
                url: `${baseUrl.url}/master/alamat_user/${id_alamat}`,
                headers: {
                  Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "DELETE"
              });

              showSuccess("Berhasil", "Data Berhasil di Hapus");

              ambildata();

            } catch (error) {
              console.log(error);
            }
          },
          style: 'destructive'
        }
      ],
      {
        cancelable: true
      }
    )
  }

  return (
    <View style={styles.backgroundBelakang}>
      <Heading navigasi={() => navigation.navigate(Navigasi.MAIN_APP)} textHeading={"Alamat Tersimpan"} />
      <View style={styles.content}>

        {alamat == null ? (
          <ActivityIndicator size={"large"} />
        ) : (
          alamat.length == 0 ? (
            <>
              <View style={styles.contentJikaKosong}>
                <Text style={styles.textContentJikaKosong}>
                  Belum Ada Alamat Tersimpan
                </Text>
                <Text style={styles.textSub}>
                  Simpan Alamat Rumah atau Kantor atau yang lainnya untuk proses
                  transaksi.
                </Text>
              </View>
              <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <Button onpress={() => navigation.navigate(Navigasi.DATA_ALAMAT)} textbutton={"Tambah Alamat"} />
              </View>
            </>
          ) : (
            <View style={{ marginVertical: 10 }}>
              <View style={{ marginHorizontal: 10, marginBottom: 15 }}>
                <Button textbutton={"Tambah Alamat Baru"} onpress={() => {
                  navigation.navigate(Navigasi.DATA_ALAMAT)
                }} />
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {alamat.map((item) => {
                  return (
                    <View style={styles.backgroundcard} key={item.id_alamat}>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Icon name={item.simpan_sebagai == "rumah" ? 'home' : 'key'} style={{ fontSize: 20, color: 'black' }} />
                      </View>
                      <View style={{ flex: 5 }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' }}>
                          {item.simpan_sebagai}
                        </Text>
                        <Text style={[styles.deskripsi, { color: 'black', marginTop: 5 }]}>
                          {item.lokasi}
                        </Text>
                        <Text style={[styles.deskripsi, { color: 'gray', marginTop: 10 }]}>
                          {item.detail}
                        </Text>
                        <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                          <TouchableOpacity onPress={() => {
                            hapus(item.id_alamat)
                          }} style={[styles.buttonaksi, { backgroundColor: 'red' }]}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                              Hapus
                            </Text>
                          </TouchableOpacity>
                          <View style={[styles.buttonaksi, { backgroundColor: 'yellow' }]}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>
                              Edit
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    color: colors.background,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentJikaKosong: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 20,
  },
  textContentJikaKosong: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  textSub: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
  },

  backgroundcard: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
  },

  buttonaksi: {
    width: 70,
    marginRight: 10,
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
    elevation: 5
  },

  deskripsi: {
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Poppins-Medium',
  }
});

export default AlamatTersimpan;
