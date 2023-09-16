import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent'
import Heading from '../../../../../components/Heading';
import { baseUrl, colors, getData, showSuccess } from '../../../../../utils';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from "../../../../../partials/navigasi"

const KeranjangResep = ({ navigation, route }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [keranjangDetail, setKeranjangDetail] = useState(null);
    const [hargaTotal, setTotalHarga] = useState(null);
    const [keranjang, setKeranjang] = useState(null);
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
                url: `${baseUrl.url}/resep/detail_obat/${detail.data.konsumen.id_konsumen}`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            })

            setKeranjangDetail(response.data.data);
            setTotalHarga(response.data.total_harga);
            setKeranjang(response.data.id_keranjang);

        } catch (error) {
            console.log(error);
        }
    }

    const buatResep = async () => {
        Alert.alert(
            'Konfirmasi',
            'Buat Resep Obat Sekarang ?',
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
                                url: `${baseUrl.url}/resep/detail_obat/${keranjang}`,
                                headers: {
                                    Authorization: 'Bearer ' + dataPribadi.token
                                },
                                method: "PUT"
                            })

                            showSuccess("Berhasil", "Data Resep Obat Berhasil di Buat");

                            navigation.navigate(Navigasi.MAIN_DOKTER)

                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading textHeading={`Keranjang Resep ${detail.data.konsumen.nama}`} navigasi={() => {
                navigation.goBack();
            }} />
            <View style={styles.cardKonsumen}>
                <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                    Detail Data Konsumen :
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Nama Lengkap
                    </Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            {detail.data.konsumen.nama}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Nomor Handphone
                    </Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            {detail.data.konsumen.nomor_hp}
                        </Text>
                    </View>
                </View>
            </View>
            {keranjangDetail == null ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            ) : (
                keranjangDetail.length > 0 ? (
                    <>
                        <View style={{ backgroundColor: 'white', marginVertical: 10, paddingVertical: 10, height: 450, elevation: 5 }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {keranjangDetail.map((item) => {
                                    return (
                                        <View key={item.id_resep_obat_detail}>
                                            {/* <View style={styles.garisBorder} /> */}
                                            <View style={styles.cardKeranjang}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={require("../../../../../assets/images/obat.png")} resizeMode='cover' style={{ height: 80, width: 80 }} />
                                                </View>
                                                <View style={{ flex: 2, marginLeft: 10 }}>
                                                    <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 16 }}>
                                                        {item.produk.nama_produk}
                                                    </Text>
                                                    <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 16 }}>
                                                        {item.produk.harga_produk}
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
                                                    <TouchableOpacity style={[styles.operator, { backgroundColor: '#051f84' }]}>
                                                        <Text style={[styles.textOperator, { color: 'white' }]}>
                                                            +
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.qty}>
                                                        {item.qty}
                                                    </Text>
                                                    <TouchableOpacity style={[styles.operator, { backgroundColor: '#051f84' }]}>
                                                        <Text style={[styles.textOperator, { color: 'white' }]}>
                                                            -
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                        <View style={styles.buttonResep}>
                            <View style={{ flex: 2 }}>
                                <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>
                                    Total Harga Resep :
                                </Text>
                                <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>
                                    {hargaTotal === null ? '0' : hargaTotal}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                buatResep();
                            }} style={{ flex: 1, alignItems: 'center', borderColor: 'green', borderWidth: 1, paddingVertical: 10, borderRadius: 10 }}>
                                <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                    <Icon name="create" style={{ fontSize: 15 }} /> Buat Resep
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View style={styles.contentnotfound}>
                        <Icon name="cart" style={{ fontSize: 100, color: '#051f84' }} />
                        <Text style={styles.iconNotFound}>Belum Ada Transaksi</Text>
                        <Text style={{ color: 'black', fontSize: 14 }}>Anda Belum Melakukan Konsultasi</Text>
                    </View>
                )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },

    cardKonsumen: {
        backgroundColor: 'white',
        elevation: 5,
        marginTop: 15,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    },

    cardKeranjang: {
        marginHorizontal: 10,
        flexDirection: 'row'
    },

    garisBorder: {
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: 10,
        marginBottom: 10
    },

    buttonResep: {
        backgroundColor: 'white',
        marginTop: 10,
        elevation: 5,
        paddingVertical: 10,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },

    contentnotfound: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    iconNotFound: {
        color: '#051f84',
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        fontWeight: 'bold'
    },

    operator: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    textOperator: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium'
    },

    qty: {
        paddingHorizontal: 10,
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold'
    }
})

export default KeranjangResep;