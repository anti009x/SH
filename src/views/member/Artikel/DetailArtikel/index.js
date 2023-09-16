import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Heading from '../../../../components/Heading';
import { baseUrl, getData } from '../../../../utils';
import axios from 'axios';
import Navigasi from '../../../../partials/navigasi';

const Detail = ({ navigation, route }) => {

  const getArtikel = route.params;

  const [dataPribadi, setDataPribadi] = useState({});
  const [kategori, setkategori] = useState(null);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      getkategori();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const getkategori = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/master/grouping_artikel/${getArtikel.data.id_artikel}/get`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      })

      setkategori(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />
      <Heading navigasi={() => {
        navigation.navigate(Navigasi.MAIN_APP);
      }} textHeading={getArtikel.data.judul_artikel} />
      <ScrollView>
        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={styles.judul}>
            {getArtikel.data.judul_artikel}
          </Text>
          {kategori == null ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <ScrollView ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {kategori.length  > 0 ? (
                kategori.map((item) => {
                  return (
                    <View key={item.id_grouping_artikel} style={styles.cardkategori}>
                      <Text style={styles.textkategori}>
                        {item.nama_kategori.toUpperCase()}
                      </Text>
                    </View>
                  )
                })
              ) : (
                <View style={{marginTop: 5, borderColor: 'red', borderWidth: 1, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10}}>
                  <Text style={{color: 'red', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14}}>
                    # Belum Ada Kategori
                  </Text>
                </View>
              ) }
            </ScrollView>
          ) }
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <Text style={styles.user}>
              {getArtikel.data.get_user.nama} :
            </Text>
            <Text style={styles.user}>
              {getArtikel.data.tanggal}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            {getArtikel.data.foto == null ? (
              <Image
                source={require('../../../../assets/images/gambar-rs.jpg')}
                resizeMode="cover"
                style={{ width: '100%', borderRadius: 10, height: 200 }}
              />
            ) : (
              <Image
                source={{ uri: getArtikel.data.foto }}
                resizeMode="cover"
                style={{ width: 300, height: 200 }}
              />
            )}
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text
              style={{ color: 'black', textAlign: 'justify', lineHeight: 20 }}>
              {getArtikel.data.deskripsi}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  judul: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    color: 'black',
    textAlign: 'justify'
  },
  cardkategori: {
    marginTop: 10,
    borderColor: 'blue',
    borderWidth: 1,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  textkategori: {
    color: 'blue',
    fontSize: 10,
    fontWeight: 'bold'
  },
  user: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium'
  },
});

export default Detail;
