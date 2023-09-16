import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import { baseUrl, colors, getData, showSuccess } from '../../../../utils'
import axios from 'axios'
import Navigasi from '../../../../partials/navigasi'

const ResepObat = ({ navigation, route }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [produk, setProduk] = useState(null);

    const konsumen = route.params;

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
        try {
            const response = await axios({
                url: `${baseUrl.url}/apotek/produk/data_produk/all`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            })

            setProduk(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const tambahKeranjang = async (id_keranjang) => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/resep/obat`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "POST",
                data: {
                    konsumen_id: konsumen.konsumen.id_konsumen,
                    produk_id: id_keranjang
                }
            })

            showSuccess("Berhasil", "Produk Sudah Masuk Ke Keranjang");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Icon name="arrow-back" style={{ fontSize: 20, color: 'white' }} />
                </TouchableOpacity>
                <Text style={styles.textHeading}>
                    Rekomendasi Produk Kesehatan
                </Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate(Navigasi.KERANJANG_RESEP, {
                        data: konsumen
                    })
                }} style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Icon name="cart" style={{ fontSize: 20, color: 'white' }} />
                </TouchableOpacity>
            </View>
            {produk == null ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {produk.length > 0 ? (
                        <View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 10 }}>
                            {produk.map((item) => {
                                return (
                                    <View style={[styles.cardProduk]} key={item.id}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require("../../../../assets/images/obat.png")} resizeMode='cover' style={{ width: 100, height: 100 }} />
                                        </View>
                                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                                            {item.nama_produk}
                                        </Text>
                                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>{item.harga_produk}</Text>
                                        <TouchableOpacity onPress={() => {
                                            tambahKeranjang(item.id)
                                        }} style={styles.buttonProduk}>
                                            <Text style={{ color: 'purple', padding: 5 }}>
                                                Tambah
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    ) : (
                        <View style={styles.contentnotfound}>
                            <Icon name="call" style={{ fontSize: 100, color: '#051f84' }} />
                            <Text style={styles.iconNotFound}>Belum Ada Transaksi</Text>
                            <Text style={{ color: 'black', fontSize: 14 }}>Anda Belum Melakukan Konsultasi</Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },

    heading: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#051f84',
        elevation: 5,
        flexDirection: 'row',
        height: 50
    },

    textHeading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10
    },

    cardProduk: {
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexBasis: '46%'
    },

    buttonProduk: {
        borderColor: 'purple',
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
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
})

export default ResepObat;