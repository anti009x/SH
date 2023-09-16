import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {colors, getData, baseUrl} from '../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../partials/navigasi';
import axios from 'axios';

const KeahlianDokter = ({navigation, route}) => {
  const data = route.params;
  const [dataPribadi, setDataPribadi] = useState({});
  const [keahlian, setKeahlian] = useState([]);
  const [loading, cekLoading] = useState(true);

  const getDataUserLocal = useCallback(() => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  }, []);

  const dataKeahlian = useCallback(() => {
    try {
      cekLoading(true);
      axios({
        url: `${baseUrl.url}/master/dokter_keahlian/${data.data.id_keahlian}/ambil_keahlian`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      })
        .then(response => {
          cekLoading(false);
          setKeahlian(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [data.data.id_keahlian, dataPribadi.token]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      dataKeahlian();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const content = loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Tunggu Sebentar ...</Text>
    </View>
  ) : keahlian.length > 0 ? (
    <>
      <View style={styles.content}>
        <FlatList
          data={keahlian}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id_dokter_keahlian}
          renderItem={({item}) => (
            <>
              <View style={styles.card}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Image
                    source={require('../../../../assets/images/people.png')}
                    style={{width: 90, height: 100}}
                  />
                </View>
                <View style={styles.cardProfil}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {item.get_dokter.nama}
                  </Text>
                  <Text style={{color: 'black', fontSize: 12}}>
                    {item.get_keahlian.nama_keahlian}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.backgroundEmpty,
                        padding: 5,
                        borderRadius: 5,
                        marginRight: 10,
                      }}>
                      <Text style={{color: 'black', fontSize: 12}}>
                        77 Tahun
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: colors.backgroundEmpty,
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      <Text style={{color: 'black', fontSize: 12}}>100 %</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center', flex: 1}}>
                      <Text style={{color: 'black', fontSize: 16}}>
                        Rp. 120.000
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: 'purple',
                          paddingHorizontal: 15,
                          paddingVertical: 5,
                          borderRadius: 5,
                        }}
                        onPress={() => {
                          navigation.navigate(Navigasi.RINGKASAN_PEMBAYARAN);
                        }}>
                        <Text style={{color: 'white', fontSize: 12}}>Chat</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginBottom: 10,
                }}
              />
            </>
          )}
        />
      </View>
    </>
  ) : (
    <View style={styles.notFound}>
      <Icon name="search" style={styles.iconNotFound} />
      <Text style={styles.textNotFound}>Data Dokter Tidak Ditemukan</Text>
      <Text style={styles.subTextNotFound}>
        Silahkan Cari Dokter Kebutuhan Lainnya
      </Text>
    </View>
  );
  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-back" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.textHeading}>{data.data.nama_keahlian}</Text>
        </View>
      </View>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    elevation: 5,
    height: 50,
    padding: 15,
    backgroundColor: colors.background,
  },
  icon: {
    fontSize: 20,
    color: 'black',
    marginRight: 10,
  },
  textHeading: {
    color: 'black',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    marginTop: 5,
    marginHorizontal: 15,
  },
  card: {
    height: 120,
    flexDirection: 'row',
    borderRadius: 10,
  },
  cardProfil: {
    marginHorizontal: 10,
    flex: 2,
  },
  text: {
    fontSize: 18,
    color: colors.primary,
    marginTop: 16,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNotFound: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconNotFound: {
    fontSize: 100,
    color: colors.primary,
  },
  subTextNotFound: {
    color: colors.primary,
  },
});

export default KeahlianDokter;
