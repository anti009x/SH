import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent';
import { baseUrl, colors, getData, showSuccess } from '../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../../partials/navigasi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const Keranjang = ({ navigation, route }) => {

  const [dataPribadi, setDataPribadi] = useState({});
  const [cart, setCart] = useState(null);
  const [totalCart, setTotalCart] = useState(null);
  const [alamat, setAlamat] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);

  const detail = route.params;

  useEffect(() => {
    getDataUserLocal();
    semuakeranjang();

  }, [dataPribadi.token, dataPribadi.idx]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const semuakeranjang = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/keranjang/total/by_konsumen`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      });

      setTotalCart(response.data);

      const keranjang = await axios({
        url: `${baseUrl.url}/keranjang/${response.data.id_keranjang}`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      });

      setCart(keranjang.data.data)

    } catch (error) {
      console.log(error);
    }
  }

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
          Geocoder.init('AIzaSyB2Xd4GJtDxGPUI7nlMV-I99x5EQqYqhGc');
          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(json => {
              setAlamat(json.results[0].formatted_address);
            })
            .catch(error => {
              console.log(error);
            });
        });
      } else {
        console.log('Tidak Ditemukan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeKeranjangProduk = async id_keranjang_detail => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/detail_keranjang/${id_keranjang_detail}`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "DELETE"
      });

      showSuccess("Berhasil", "Data Produk Berhasil di Hapus");
      semuakeranjang();
      keranjangbelanja();
    } catch (error) {
      console.log(error);
    }
  };

  const tambahKeranjang = async (id_keranjang_detail) => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/detail_keranjang/tambah/${id_keranjang_detail}`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "PUT"
      });

      showSuccess("Berhasil", "QTY Berhasil di Tambahkan");
      semuakeranjang();

    } catch (error) {
      console.log(error);
    }
  }

  const kurangKeranjang = async (id_keranjang_detail) => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/detail_keranjang/kurang/${id_keranjang_detail}`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "PUT"
      });

      showSuccess("Berhasil", "QTY Berhasil di Kurangkan");
      semuakeranjang();

    } catch (error) {
      console.log(error);
    }
  }

  const hapusSemuaData = async () => {
    Alert.alert(
      'Konfirmasi',
      'Yakin ? Untuk Menghapus Data Keranjang ?',
      [
        {
          text: 'Batal',
          style: 'cancel'
        },
        {
          text: 'Setuju',
          onPress: async () => {
            try {
              const response = await axios({
                url: `${baseUrl.url}/detail_keranjang/all_data/hapus`,
                headers: {
                  Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "DELETE"
              });

              showSuccess("Berhasil", "Keranjang Belanja Anda Berhasil di Hapus");
              semuakeranjang()
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    )
  };

  const show = () => {
    return (
      <>
        <View style={{ marginTop: 10, marginHorizontal: 10 }}>
          {/* <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
            Tujuan Barang
          </Text>
          <Text style={{ marginTop: 10, color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
            Posisi Anda Sekarang
          </Text>
          <TextInput placeholder='Masukkan Lokasi Anda' placeholderTextColor={"grey"} style={{ borderColor: 'grey', borderWidth: 1, borderRadius: 10, fontSize: 14, color: 'grey', fontFamily: 'Poppins-Medium', fontWeight: 'bold', paddingHorizontal: 10, height: 40 }} /> */}

          <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
            Kontak Penerima
          </Text>

          <View style={{ backgroundColor: '#051f84', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Image source={require("../../../../../assets/images/people.png")} style={{ width: 50, height: 50, borderColor: 'white', borderWidth: 1, borderRadius: 50 }} />
            </View>
            <View style={{ flex: 4 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-Medium', textAlign: 'justify' }}>
                {dataPribadi.nama}
              </Text>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, fontFamily: 'Poppins-Medium', textAlign: 'justify' }}>
                {dataPribadi.nomor_hp}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Navigasi.TOKO_KESEHATAN_PRODUK);
          }}>
          <Icon name="arrow-back" style={{ color: 'white', fontSize: 20 }} />
        </TouchableOpacity>
        <Text style={[styles.textHeading, { paddingLeft: 15 }]}>Keranjang Belanja Anda</Text>
        {cart == null ? (
          <View />
        ) : (
          cart.length > 0 ? (
            <TouchableOpacity
              style={{ flex: 1, alignItems: 'flex-end' }}
              onPress={() => {
                hapusSemuaData();
              }}>
              <Icon name="trash" style={{ color: 'white', fontSize: 20 }} />
            </TouchableOpacity>
          ) : (
            <View />
          )
        )}
      </View>

      {cart == null ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 200 }}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        cart.length > 0 ? (
          <>
            <View style={{ flex: 7 }}>
              {show()}
              {cart.map((item) => {
                return (
                  <View key={item.id_keranjang_detail} style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 10 }}>
                    <View style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 10, marginRight: 10, justifyContent: 'center' }}>
                      <Image source={require('../../../../../assets/images/auth-new.png')} style={{ width: 50, height: 50 }} />
                    </View>
                    <View style={styles.barang}>
                      <Text style={{ color: 'black', fontSize: 16 }}>
                        {item.produk.nama_produk}
                      </Text>
                      <Text style={{ color: 'gray', fontSize: 12 }}>
                        {item.produk.kode_produk}
                      </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={{ color: 'black', fontSize: 16 }}>
                        {item.produk.harga_produk}
                      </Text>
                      <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: colors.backgroundEmpty,
                            padding: 5,
                            borderRadius: 100,
                          }}
                          onPress={() => {
                            removeKeranjangProduk(item.id_keranjang_detail);
                          }}>
                          <Icon
                            name="trash"
                            style={{ color: 'black', fontSize: 20 }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                          tambahKeranjang(item.id_keranjang_detail)
                        }} style={[styles.viewOperator, { marginLeft: 10 }]}>
                          <Text style={styles.textViewOperator}>+</Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={{ color: 'black', fontWeight: 'bold' }}>
                            {item.qty}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                          kurangKeranjang(item.id_keranjang_detail);
                        }} style={[styles.viewOperator, { marginLeft: 10 }]}>
                          <Text style={styles.textViewOperator}>-</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableOpacity
                style={styles.btnKeranjang}
                onPress={() => {
                  navigation.navigate(Navigasi.TOKO_KESEHATAN_PRODUK);
                }}>
                <Text style={styles.textBtnKeranjang}>
                  + Tambah Keranjang Lagi
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                elevation: 5,
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'black', fontSize: 16 }}>
                    Ada
                  </Text>
                  {totalCart == null ? (
                    <ActivityIndicator color={colors.primary} style={{ marginHorizontal: 3 }} />
                  ) : (
                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16, marginHorizontal: 3 }}>
                      {totalCart.total}
                    </Text>
                  )}
                  <Text style={{ color: 'black', fontSize: 16 }}>Keranjang</Text>
                </View>
                <Text style={{ color: 'black' }}>Total Harga :</Text>
                {totalCart == null ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>
                    {totalCart.harga}
                  </Text>
                )}
              </View>
              <View style={{ flex: 1 }}>
                {totalCart == null ? (
                  <ActivityIndicator size={"large"} color={colors.primary} />
                ) : (
                  <TouchableOpacity
                    style={{ backgroundColor: 'white', borderColor: 'purple', borderWidth: 1, borderRadius: 5 }} onPress={() => {
                      navigation.navigate(Navigasi.RINGKASAN_PEMBAYARAN_PRODUK, {
                        data: totalCart
                      })
                    }} >
                    <Text
                      style={{
                        color: 'purple',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        paddingVertical: 10,
                      }}>
                      Lanjutkan Pembayaran
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.contentnotfound}>
            <Icon name="cart" style={{ fontSize: 100, color: '#051f84' }} />
            <Text style={styles.iconNotFound}>Belum Ada Keranjang Belanja</Text>
            <Text style={{ color: 'black', fontSize: 14 }}>Anda Belum Melakukan Pembelanjaan Barang Produk</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.backgroundPutih,
  },
  heading: {
    backgroundColor: '#051f84',
    padding: 10,
    height: 50,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textHeading: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: 'bold'
  },
  content: {
    marginTop: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  textInput: {
    marginVertical: 10,
    borderColor: colors.backgroundEmpty,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    fontSize: 12,
    color: 'gray',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  btnKeranjang: {
    borderColor: 'purple',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  textBtnKeranjang: {
    color: 'purple',
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  garisBorder: {
    borderColor: colors.backgroundDasarBelakang,
    borderWidth: 1,
    width: '100%',
  },
  viewOperator: {
    borderColor: 'purple',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  textViewOperator: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentnotfound: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200
  },

  iconNotFound: {
    color: '#051f84',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default Keranjang;
