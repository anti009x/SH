import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {colors, getData, baseUrl} from '../../../../utils';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../partials/navigasi';
import axios from 'axios';

const LanjutkanPembayaran = ({navigation, route}) => {
  const data = route.params.data.data.user_id;
  const biaya = route.params.data.data.biaya.biaya;
  const [option, chooseOption] = useState(0);

  const [dataPribadi, setDataPribadi] = useState({});
  const [list, setList] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);

  const pilihan = [
    {index: 1, label: 'Gopay', value: 'gopay', status: 0},
    {index: 2, label: 'Shopee', value: 'shopee', status: 0},
  ];

  useEffect(() => {
    getDataUserLocal();
    getList();
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      console.log(res);
      setDataPribadi(res);
    });
  };

  const getList = async () => {
    try {
      await axios({
        url: `${baseUrl.url}/xendit/list`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      })
        .then(response => {
          setList(response.data.data);
          setShowIndicator(true);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const click = index => {
    console.log(index);
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View style={styles.heading}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.CHAT_DOKTER);
            }}>
            <Icon name="arrow-back" style={{fontSize: 20, color: 'black'}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 10,
          }}>
          <Text style={{color: 'black'}}>Detail Riwayat Pembayaran</Text>
        </View>
      </View>
      <View style={{flex: 5}}>
        <View style={[styles.card, {flexDirection: 'row', elevation: 5}]}>
          <View style={styles.viewImage}>
            <Image
              source={require('../../../../assets/images/people.png')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View style={styles.textCard}>
            <Text style={styles.textJudul}>{data.nama}</Text>
            <Text style={styles.subTextJudul}>Dokter Umum</Text>
          </View>
        </View>
        <View style={[styles.card, {elevation: 5}]}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={{color: 'black'}}>Biaya Konsultasi 30 Menit</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text style={{color: 'black'}}>Rp. {biaya}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                Tagihan Anda
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                Rp. {biaya}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.card, {flex: 1}]}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
            Pilih Metode Pembayaran
          </Text>
          {showIndicator ? (
            <FlatList
              data={list}
              renderItem={({item}) => (
                <>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flex: 1,
                      }}>
                      <Text style={{color: 'black', fontSize: 16}}>
                        {item.channel_code}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => click(item.index)}
                        style={{
                          borderColor: 'black',
                          borderWidth: 1,
                          borderRadius: 50,
                          width: 20,
                          height: 20,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      borderColor: 'gray',
                      borderWidth: 1,
                      marginVertical: 10,
                    }}
                  />
                </>
              )}
            />
          ) : (
            <View style={{paddingVertical: 30}}>
              <ActivityIndicator size="large" color="#0000FF" />
            </View>
          )}
        </View>
      </View>
      <View style={styles.cardBawah}>
        <View style={styles.tagihan}>
          <Text style={{color: 'black'}}>Tagihan Anda</Text>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Rp. {biaya}</Text>
          {option == 0 ? (
            <TouchableOpacity style={styles.button}>
              <Text style={{color: 'white'}}>Bayar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'blue'}]}>
              <Text style={{color: 'white'}}>Bayar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    flexDirection: 'row',
    height: 50,
    padding: 15,
    elevation: 5,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 15,
  },
  viewImage: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  textCard: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textJudul: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTextJudul: {
    color: 'gray',
    fontSize: 11,
  },
  cardBawah: {
    flex: 1,
    borderColor: colors.abuMuda,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tagihan: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.abuMuda,
  },
});

export default LanjutkanPembayaran;
