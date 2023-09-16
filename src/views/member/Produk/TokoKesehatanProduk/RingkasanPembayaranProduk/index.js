import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { baseUrl, colors, getData, showSuccess } from '../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../../partials/navigasi';
import axios from 'axios';
import Heading from '../../../../../components/Heading';
import { useDispatch } from 'react-redux';

const RingkasanPembayaranProduk = ({ navigation, route }) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const layouts = useWindowDimensions();

  const [cart, setcart] = useState(null);

  const getTotal = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      getDetailKeranjang();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const getDetailKeranjang = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/keranjang/${getTotal.data.id_keranjang}`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      });

      setcart(response.data.data);

    } catch (error) {
      console.log(error);
    }
  }

  const bayar = async (id_keranjang) => {
    Alert.alert(
      'Konfirmasi',
      'Lanjutkan ke Pembayaran ?',
      [
        {
          text: 'Batal',
          style: 'cancel'
        },
        {
          text: 'Setuju',
          onPress: async () => {
            try {
              dispatch({ type: "SET_LOADING", value: true });

              const response = await axios({
                url: `${baseUrl.url}/master/pembelian/transaksi`,
                headers: {
                  Authorization: 'Bearer ' + dataPribadi.token
                },
                method: 'POST',
                data: {
                  payment_method: "bank_transfer",
                  bank: "bca",
                  id_keranjang: id_keranjang,
                  id_keranjang_detail: cart.map((item) => item.id_keranjang_detail)
                },
              });

              dispatch({ type: "SET_LOADING", value: false });

              showSuccess("Berhasil", "Pembayaran Anda Sudah Berhasil");
              navigation.navigate(Navigasi.INVOICE, {
                data: response.data
              })

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
      <Heading textHeading={"Ringkasan Pembayaran"} navigasi={() => {
        navigation.goBack();
      }} />
      <View style={{ flex: 7 }}>
        <View style={styles.content}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={{ color: 'black' }}>Nama Pasien :</Text>
              <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
                {dataPribadi.nama}
              </Text>
            </View>
            {/* <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <Text style={{ color: 'purple', fontWeight: 'bold' }}>Ganti</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
        <View style={[styles.content]}>
          <View style={styles.informasiDetail}>
            <View style={styles.viewGrid}>
              <Text style={{ color: 'gray' }}>
                {' '}
                Keranjang ({getTotal.data.total}) Barang{' '}
              </Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>{getTotal.data.harga}</Text>
              </View>
            </View>
            {/* <View style={styles.viewGrid}>
              <Text style={{ color: 'gray' }}> Biaya Pengiriman </Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ color: 'black' }}>Rp. 120.000</Text>
              </View>
            </View> */}
            <View style={styles.viewGrid}>
              <Text style={{ color: 'gray' }}> Pembayaran Anda </Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>{getTotal.data.harga}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: 'white', marginVertical: 3, paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ color: 'gray', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
            List Data Barang Pembelanjaan Anda
          </Text>
          <View style={{ borderColor: 'gray', borderWidth: 1, marginVertical: 10 }} />
          {cart == null ? (
            <ActivityIndicator size={"large"} color={colors.primary} />
          ) : (
            cart.map((item) => {
              return (
                <View key={item.id_keranjang_detail} style={{ flexDirection: 'row', marginVertical: 10 }}>
                  <View style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 10, marginRight: 10, justifyContent: 'center' }}>
                    <Image source={item.produk.foto_produk == null ? (require("../../../../../assets/images/obat.png")) : {uri: item.produk.foto_produk} } style={{ width: 50, height: 50 }} />
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
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 10,
                        }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>
                          Jumlah QTY : {item.qty}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })
          )}
        </View>

      </View>

      <View
        style={{
          flex: 1,
          borderColor: colors.backgroundEmpty,
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: 'white'
        }}>
        <Text style={{ color: 'black' }}>Pembayaran Anda</Text>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>{getTotal.data.harga}</Text>

        <TouchableOpacity
          style={{
            backgroundColor: '#051f84',
            paddingVertical: 10,
            marginVertical: 5,
            borderRadius: 5,
          }}
          onPress={() => {
            bayar(getTotal.data.id_keranjang);
          }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Bayar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.backgroundDasarBelakang,
  },
  icon: {
    fontSize: 20,
    color: 'black',
  },
  content: {
    marginTop: 3,
    backgroundColor: colors.backgroundPutih,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  viewGrid: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

export default RingkasanPembayaranProduk;
