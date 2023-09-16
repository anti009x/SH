import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent'
import Navigasi from '../../../../../partials/navigasi'
import { baseUrl, colors, getData } from '../../../../../utils'
import axios from 'axios'

const Pembayaran = ({ navigation, route }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [detailKeranjang, setDetaKeranjang] = useState(null);
    const detail = route.params;

    useEffect(() => {
        getDataUserLocal();
        getKeranjangDetail();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getKeranjangDetail = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/pembelian/transaksi/${detail.data.id_pembelian}`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            });

            setDetaKeranjang(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.card}>
                <View style={styles.cardheader}>
                    <Text style={styles.textheader}>
                        RIWAYAT TRANSAKSI ANDA
                    </Text>
                </View>
                <View style={{ backgroundColor: 'white', marginVertical: 10, marginHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 3 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 16 }}> No. Transaksi </Text>
                            <Text style={{ color: 'blue', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 16 }}> {detail.data.id_pembelian} </Text>
                        </View>
                        <View style={{ justifyContent: 'center', backgroundColor: 'orange', height: 30, paddingHorizontal: 10, marginTop: 5, borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>
                                {detail.data.status}
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end', marginVertical: 5 }}>
                        <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                            {detail.data.tanggal_pembelian}
                        </Text>
                    </View>
                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                        Data Konsumen :
                    </Text>
                    <Text style={{ color: 'gray', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                        {detail.data.konsumen_id.detail.nama}
                    </Text>
                    <Text style={{ color: 'gray', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                        {detail.data.konsumen_id.detail.nomor_hp}
                    </Text>
                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14, marginTop: 10 }}>
                        Detail Pengiriman :
                    </Text>
                    <Text style={{ color: 'gray', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                        {detail.data.ongkir.alamat_pengiriman}
                    </Text>
                    <Text style={{ color: 'gray', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                        {detail.data.tarif}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                            No. Resi :
                        </Text>
                        <Text style={{ color: 'blue', marginLeft: 5, fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                            RES-1289128121
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                            Total Belanja :
                        </Text>
                        <Text style={{ color: 'blue', marginLeft: 5, fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                            {detail.data.total_pembelian}
                        </Text>
                    </View>
                    <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                    <Text style={{ color: 'blue', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                        List Data Keranjang Belanja
                    </Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {detailKeranjang == null ? (
                            <ActivityIndicator size={"large"} color={colors.primary} />
                        ) : (
                            detailKeranjang.map((item) => {
                                return (
                                    <View key={item.id_pembelian_barang} style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                                        <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
                                            <Image source={require("../../../../../assets/images/obat.png")} resizeMode='cover' style={{ height: 50, width: 50 }} />
                                        </View>
                                        <View style={{marginHorizontal: 5}}>
                                            <Text style={{color: 'black'}}>
                                                {item.produk.nama_produk}
                                            </Text>
                                            <Text style={{color: 'grey', fontFamily: 'Poppins-Medium', fontSize: 12}}>
                                                Per Strip
                                            </Text>
                                        </View>
                                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                                            <Text style={{color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14}}>
                                                {item.produk.harga}
                                            </Text>
                                            <Text style={{color: 'grey', marginTop: 5, fontFamily: 'Poppins-Medium'}}>
                                                QTY : {item.qty}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                        )}
                    </ScrollView>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate(Navigasi.MAIN_APP)
            }}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                    KE HALAMAN RIWAYAT TRANSAKSI
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },

    card: {
        backgroundColor: 'white',
        elevation: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10
    },

    cardheader: {
        backgroundColor: 'green',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingVertical: 10
    },

    textheader: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },

    button: {
        backgroundColor: 'brown',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5
    }
})

export default Pembayaran;