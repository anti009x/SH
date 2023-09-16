import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { baseUrl, colors, getData } from '../../../utils';
import { configfirebase } from '../../../firebase/firebaseConfig';
import axios from 'axios';
import Navigasi from '../../../partials/navigasi';
import Icon from 'react-native-vector-icons/Ionicons';

const KonsultasiDokter = ({ navigation }) => {

  const [dokterProfil, setDokterProfil] = useState({});
  const [dataPribadi, setDataPribadi] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    setShowIndicator(true);

    getDataUserLocal();
    const rootDB = configfirebase.database().ref();
    const urlHistory = `messages/${dataPribadi.uuid_firebase}`;
    const messagesDB = rootDB.child(urlHistory);

    messagesDB.on("value", async snapshot => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

        const promises = await Object.keys(oldData).map(async key => {
          const datakonsumen = `users/konsumen/${oldData[key].uidPartner}`;
          const detail_konsumen = await rootDB.child(datakonsumen).once("value");
          console.log(detail_konsumen);
          data.push({
            id: key,
            detail_konsumen: detail_konsumen.val(),
            ...oldData[key]
          });
        });

        await Promise.all(promises);
        setHistoryChat(data);
      } else {
        setHistoryChat([]);
      }

      setShowIndicator(false);
    });
  }, [dataPribadi.nama, dataPribadi.uuid_firebase, dataPribadi.idx, dataPribadi.token]);

  const getDataUserLocal = () => {
    getData("profil_dokter").then((response) => {
      setDokterProfil(response);
    });
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <Text style={styles.textHeading}>Konsultasi Pasien</Text>
      </View>
      <ScrollView>
        {showIndicator ? (
          <View style={{ marginVertical: '80%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : historyChat.length > 0 ? (
          historyChat.map((item) => {
            return (
              <View key={item.id} style={styles.content}>
                <View style={styles.listCard}>
                  <View style={{ flexDirection: 'row', marginVertical: 15, marginHorizontal: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>Tanggal : 12 Juli 2023</Text>
                    </View>
                    <View style={{ borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'flex-end' }}>
                      <Text style={{ color: 'green', fontSize: 12, fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}> Sedang Konsultasi </Text>
                    </View>
                  </View>
                  <View style={{ borderColor: 'black', borderWidth: 1, marginHorizontal: 10 }} />
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      marginVertical: 10,
                    }}>
                    <View style={styles.headerIdentitas}>
                      <View style={{ flexDirection: 'row' }}>
                        <View>
                          <Image source={require("../../../assets/images/people.png")} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 50, borderColor: 'black', borderWidth: 1 }} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 14,
                              fontWeight: 'bold',
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {item.detail_konsumen.nama}
                          </Text>
                          <Text
                            style={{
                              color: 'gray',
                              fontSize: 12,
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {item.detail_konsumen.nomor_hp}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 12,
                      marginHorizontal: 10,
                      textAlign: 'justify',
                    }}>
                      {item.lastContentChat}
                  </Text>
                  <TouchableOpacity
                    style={{
                      borderColor: 'green',
                      borderWidth: 1,
                      marginVertical: 15,
                      marginHorizontal: 10,
                      borderRadius: 10,
                      paddingVertical: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }} onPress={() => {
                      const params = {
                        id: item.id,
                        uidPartner: item.detail_konsumen.uid,
                        nama: item.detail_konsumen.nama,
                        nomor_hp: item.detail_konsumen.nomor_hp
                      }
                      navigation.navigate(Navigasi.DETAIL_KONSULTASI, params)
                    }} >
                    <Text style={{ color: 'green', fontWeight: 'bold' }}>
                      Lanjutkan
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    const params = {
                      konsumen: item.detail_konsumen
                    }
                    navigation.navigate(Navigasi.RESEP_OBAT, params)
                  }} style={{backgroundColor: 'green', marginHorizontal: 10, marginBottom: 10, borderRadius: 5, paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold'}}>
                      <Icon name="book" style={{fontSize: 15}} /> Buatkan Resep Obat
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <View style={{ marginVertical: '80%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.primary, fontSize: 16, fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>
              Maaf, Konsultasi Tidak Ditemukan
            </Text>
            <Text style={{ color: 'grey', fontFamily: 'Poppins-Medium', fontSize: 12 }}>
              Sepertinya Belum Ada Data Konsultasi Untuk Anda
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    padding: 15,
    height: 50,
    backgroundColor: 'white',
    elevation: 5,
  },
  textHeading: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
  content: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  listCard: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
  headerIdentitas: {
    flex: 3,
  },
  status: {
    flex: 1,
    alignItems: 'flex-end',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: 'green',
  },
});

export default KonsultasiDokter;
