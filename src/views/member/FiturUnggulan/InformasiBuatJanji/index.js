import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { colors } from '../../../../utils';
import axios from 'axios';
import { getData } from '../../../../utils';
import { baseUrl } from '../../../../utils';
import Navigasi from '../../../../partials/navigasi';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const InformasiBuatJanji = ({ route }) => {
  const navigation = useNavigation();
  const [dataPribadi, setDataPribadi] = useState({});
  const [spesialis, setSpesialis] = useState([]);
  const [showIndicator, setShowIndicator] = useState(false);
  const [output, setOutput] = useState(false);

  useEffect(() => {
    getDataUserLocal();
    dataSpesialis();
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const dataSpesialis = async () => {
    try {
      setShowIndicator(true);
      const response = await axios({
        url: `${baseUrl.url}/master/rumah_sakit/spesialis/${route.data.data.id_rumah_sakit}`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      });

      if (response.data.data.length === 0) {
        setTimeout(() => {
          setOutput(true);
          setShowIndicator(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setShowIndicator(false);
          setSpesialis(response.data.data);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.backgroundBelakang}>
      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>
        Cari Dokter Spesialis
      </Text>
      <Text style={{ fontSize: 12, color: 'black' }}>
        Ayo buat janji dengan dokter spesialis yang anda butuhkan.
      </Text>
      <View style={styles.viewcontainer}>
        {spesialis.length ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              marginTop: 5
            }}>
              {spesialis.map((item) => {
                return (
                  <TouchableOpacity onPress={() => {
                    navigation.navigate(Navigasi.SPESIALIS_BUAT_JANJI, {
                      data: item
                    })
                  }} key={item.id_spesialis}>
                    <View style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      paddingVertical: 7,
                      paddingHorizontal: 10,
                      margin: 5,
                      borderColor: 'black',
                      borderWidth: 1
                    }}>
                      <Text style={{ color: 'black' }}>
                        {item.penyakit.nama_spesialis}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
        ) : showIndicator ? (
          <View style={{ marginVertical: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={colors.primary} />
          </View>
        ) : output ? (
          <View
            style={{
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Icon name="search" style={{ fontSize: 50, color: colors.primary }} />
            <Text
              style={{
                color: colors.primary,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                fontFamily: 'Poppins-Medium'
              }}>
              Maaf, Spesialis Tidak Tersedia
            </Text>
            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
              Silahkan Cari Spesialis Di Rumah Sakit Lain.
            </Text>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    marginTop: 5,
    backgroundColor: colors.background,
  },
  textInput: {
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f4f0f0',
    borderRadius: 10,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 16,
  },
  cardBackground: {
    marginRight: 10,
    flex: 1,
    marginBottom: 5,
  },
  cardTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCircle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: 'black',
    marginTop: 5,
    borderWidth: 1,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  viewcontainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default InformasiBuatJanji;
