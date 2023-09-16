import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';
import { baseUrl, colors, getData, showSuccess } from '../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../../partials/navigasi';
import axios from 'axios';
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent';
import Heading from "../../../../../components/Heading";

const AllDataProduk = ({ navigation }) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [produk, setProduk] = useState(null);

  useEffect(() => {
    getDataUserLocal();
    getProduk();
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const getProduk = async () => {
    await axios({
      url: `${baseUrl.url}/apotek/produk/data_produk/all`,
      headers: {
        Authorization: 'Bearer ' + dataPribadi.token
      },
      method: "GET"
    }).then((response) => {
      const products = response.data.data.map(product => {
        return {
          ...product,
          count: 0
        };
      });

      setProduk(products);
    }).catch((error) => {
      console.log(error);
    })
  };

  const tambahKeranjang = async (id_product) => {
    try {
      const keranjang = await axios({
        url: `${baseUrl.url}/keranjang`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "POST",
        data: {
          produk_id: id_product
        }
      });

      showSuccess("Berhasil", "Data Produk Berhasil Masuk Ke Keranjang");
      getProduk();
    } catch (error) {
      console.log(error);
    }
  }

  const incrementProduct = product => {
    const productIndex = produk.findIndex(p => p.id === product);
    const newProductList = [...produk];
    const qtyProduct = newProductList[productIndex].qty;

    if (newProductList[productIndex].count < qtyProduct) {
      newProductList[productIndex].count += 1;
      setProduk(newProductList);
    }
  };

  const decrementProduct = product => {
    const productIndex = produk.findIndex(p => p.id === product);
    const newProductList = [...produk];
    if (newProductList[productIndex].count > 0) {
      newProductList[productIndex].count -= 1;
    }
    setProduk(newProductList);
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <Heading textHeading={"Semua Data Produk"} navigasi={() => {
        navigation.goBack();
      }} />

      {produk == null ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 10 }}>
            {produk.map((item, index) => {
              return (
                <View style={[styles.cardProduk]} key={item.id}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../../../../../assets/images/obat.png")} resizeMode='cover' style={{ width: 100, height: 100 }} />
                  </View>
                  <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                    {item.nama_produk}
                  </Text>
                  <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>{item.harga_produk}</Text>
                  {item.count == 0 ? (
                    item.qty == 0 ? (
                      <View style={styles.viewQtyTidakTersedia}>
                        <Text style={styles.textQtyTidakTersedia}>
                          Maaf, Produk Tidak Tersedia
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.buttonProduk}>
                        <TouchableOpacity
                          onPress={() => tambahKeranjang(item.id)}
                          style={{ alignItems: 'center' }}>
                          <Text
                            style={{
                              color: 'purple',
                              padding: 5,
                            }}>
                            Tambah
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )
                  ) : (
                    <View style={styles.countKosong}>
                      <TouchableOpacity onPress={() => incrementProduct(item.id)}>
                        <View style={styles.buttonOperator}>
                          <Text style={{ color: 'black', fontSize: 16 }}>+</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.viewTextOperator}>
                        <Text
                          style={{
                            color: 'purple',
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          {item.count}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => decrementProduct(item.id)}>
                        <View style={[styles.buttonOperator, { marginLeft: 10 }]}>
                          <Text style={{ color: 'black', fontSize: 16 }}>-</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )
            })}
          </View>
        </ScrollView>
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
    padding: 15,
    height: 50,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
  },
  icon: {
    fontSize: 20,
    color: 'black',
  },
  textHeading: {
    color: 'black',
    fontSize: 14,
    marginLeft: 10,
  },
  cardProduk: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexBasis: '48%'
  },
  countKosong: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  buttonOperator: {
    flex: 1,
    width: 40,
    borderColor: 'purple',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  buttonProduk: {
    borderColor: 'purple',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 10,
  },
  viewTextOperator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default AllDataProduk;
