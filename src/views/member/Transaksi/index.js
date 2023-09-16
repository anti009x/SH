import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import { baseUrl, colors, getData } from '../../../utils'
import axios from 'axios'
import Navigasi from '../../../partials/navigasi'

const Transaksi = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [transaksi, setTransaksi] = useState(null);
    const [cekOption, setCekOption] = useState(1);
    const [transaksiBuatJanji, setTransaksiBuatJanji] = useState(null);
    const [transaksiProduk, setTransaksiProduk] = useState(null);

    useEffect(() => {
        getDataUserLocal();
        getTransaksi();
        getTransaksiBuatJanji();
        getProduk();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getTransaksiBuatJanji = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/konsumen/riwayat_transaksi_buat_janji`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            })

            setTransaksiBuatJanji(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getTransaksi = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/pembelian/transaksi`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            });

            setTransaksi(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    const getProduk = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/transaksi/produk`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            });

            setTransaksiProduk(response.data.data);

            console.log(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    const konsultasi = () => {
        setCekOption(1);
    }

    const buatJanji = () => {
        setCekOption(2);
    }

    const produk = () => {
        setCekOption(3);
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.heading}>
                <Text style={styles.textheading}>
                    Riwayat Transaksi
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    konsultasi();
                }} style={[styles.option, cekOption == 1 ? styles.active : styles.nonActive]}>
                    <Text style={cekOption == 1 ? styles.textActive : styles.textNonActive}>
                        Konsultasi
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    buatJanji();
                }} style={[styles.option, cekOption == 2 ? styles.active : styles.nonActive]}>
                    <Text style={cekOption == 2 ? styles.textActive : styles.textNonActive}>
                        Buat Janji
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    produk();
                }} style={[styles.option, cekOption == 3 ? styles.active : styles.nonActive]}>
                    <Text style={cekOption == 3 ? styles.textActive : styles.textNonActive}>
                        Produk
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {cekOption == 1 ? (
                    transaksi == null ? (
                        <ActivityIndicator size={"large"} color={colors.primary} style={{ marginTop: 200 }} />
                    ) : (
                        transaksi.length > 0 ? (
                            transaksi.map((item) => {
                                return (
                                    <View style={styles.content} key={item.id_pembelian}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                                <Text style={styles.textcontent}>
                                                    {item.id_pembelian}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, backgroundColor: 'orange', marginVertical: 10, marginHorizontal: 10, borderRadius: 5, paddingVertical: 5 }}>
                                                <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>
                                                    {item.status}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.border} />
                                        <View style={{ alignItems: 'flex-end', marginHorizontal: 10, marginVertical: 10 }}>
                                            <Text style={styles.tanggal}>
                                                {item.tanggal_pembelian}
                                            </Text>
                                        </View>
                                        <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                                            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 16 }}>{item.konsumen_id.detail.nama}</Text>
                                            <Text style={{ color: 'black' }}>{item.konsumen_id.detail.nomor_hp}</Text>
                                            <View style={{ alignItems: 'flex-end' }}>
                                                <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold' }}>
                                                    Total Pembelian : {item.total_pembelian}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate(Navigasi.PEMBAYARAN_PRODUK, {
                                                data: item
                                            })
                                        }} style={styles.button}>
                                            <Text style={styles.textbutton}>
                                                Detail
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        ) : (
                            <View style={styles.contentnotfound}>
                                <Icon name="call" style={{ fontSize: 100, color: '#051f84' }} />
                                <Text style={styles.iconNotFound}>Belum Ada Transaksi</Text>
                                <Text style={{ color: 'black', fontSize: 14 }}>Anda Belum Melakukan Konsultasi</Text>
                                <TouchableOpacity style={styles.buttonNotFound} onPress={() => {
                                    navigation.navigate(Navigasi.TOKO_KESEHATAN_PRODUK)
                                }}>
                                    <Text style={styles.textButtonNotFound}>
                                        Lanjutkan Transaksi
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    )
                ) : (
                    cekOption == 2 ? (
                        <ScrollView style={{ marginBottom: 50, marginTop: 10 }} showsVerticalScrollIndicator={false}>
                            {
                                transaksiBuatJanji == null ? (
                                    <ActivityIndicator size={"large"} color={colors.primary} style={{ marginTop: 200 }} />
                                ) : (
                                    transaksiBuatJanji.length > 0 ? (
                                        transaksiBuatJanji.map((item) => {
                                            return (
                                                <View style={{ marginHorizontal: 10, backgroundColor: 'white', elevation: 5, marginTop: 5, marginBottom: 20, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 10 }} key={item.id_transaksi_buat_janji} >
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}> ID Transaksi : </Text>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                                                {item.id_transaksi_buat_janji}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                                                    <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', marginLeft: 2 }}>
                                                        Detail Data Transaksi :
                                                    </Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}> Tanggal Transaksi : </Text>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                                                {item.tanggal_transaksi}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}> Biaya Konsultasi : </Text>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                                                {item.detail.biaya}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', marginLeft: 2, marginTop: 10 }}>
                                                        Detail Data Konsumen :
                                                    </Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}> Nama Konsumen : </Text>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                                                {item.konsumen.nama}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}> Nomor Handphone : </Text>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                                                {item.konsumen.nomor_hp}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity style={{ backgroundColor: 'green', marginLeft: 3, marginVertical: 10, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 7 }} onPress={() => {
                                                        navigation.navigate(Navigasi.DETAIL_TRANSAKSI_BUAT_JANJI, {
                                                            data: item
                                                        })
                                                    }}>
                                                        <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14, textAlign: 'center', fontWeight: 'bold' }}>
                                                            Detail
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    ) : (
                                        <View style={styles.contentnotfound}>
                                            <Icon name="book" style={{ fontSize: 100, color: '#051f84' }} />
                                            <Text style={styles.iconNotFound}>Belum Ada Transaksi</Text>
                                            <Text style={{ color: 'black', fontSize: 14 }}>Anda Belum Melakukan Transaksi Buat Janji</Text>
                                            <TouchableOpacity style={styles.buttonNotFound} onPress={() => {
                                                navigation.navigate(Navigasi.BUAT_JANJI)
                                            }}>
                                                <Text style={styles.textButtonNotFound}>
                                                    Lanjutkan Transaksi
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                )
                            }
                        </ScrollView>
                    ) : (
                        <ScrollView style={{marginBottom: 50, marginTop: 10}} showsVerticalScrollIndicator={false}>
                            {
                                cekOption == 3 ? (
                                    transaksi == null ? (
                                        <ActivityIndicator size={"large"} color={colors.primary} style={{ marginTop: 200 }} />
                                    ) : (
                                        transaksi.length > 0 ? (
                                            transaksi.map((item) => {
                                                return (
                                                    <View style={{ marginHorizontal: 10, backgroundColor: 'white', elevation: 5, marginTop: 5, marginBottom: 20, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 10 }} key={item.id_pembelian} >
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}> ID Pembelian : </Text>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                                                {item.id_pembelian}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                                                    <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', marginLeft: 2 }}>
                                                        Detail Data Transaksi :
                                                    </Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}> Tanggal Transaksi : </Text>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                                                {item.tanggal_pembelian}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}> Total Pembelian : </Text>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                                                {item.total_pembelian}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', marginLeft: 2, marginTop: 10 }}>
                                                        Detail Data Konsumen :
                                                    </Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}> Nama Konsumen : </Text>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                                                {item.konsumen_id.detail.nama}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}> Nomor Handphone : </Text>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                                                {item.konsumen_id.detail.nomor_hp}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}> Status Pembayaran : </Text>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                                                {item.notification.status}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    {/* <TouchableOpacity style={{ backgroundColor: 'green', marginLeft: 3, marginVertical: 10, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 7 }} onPress={() => {
                                                        navigation.navigate(Navigasi.DETAIL_TRANSAKSI_BUAT_JANJI, {
                                                            data: item
                                                        })
                                                    }}>
                                                        <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14, textAlign: 'center', fontWeight: 'bold' }}>
                                                            MOhammad
                                                        </Text>
                                                    </TouchableOpacity> */}
                                                </View>
                                                )
                                            })
                                        ) : (
                                            <View style={styles.contentnotfound}>
                                                <Icon name="cart" style={{ fontSize: 100, color: '#051f84' }} />
                                                <Text style={styles.iconNotFound}>Belum Ada Transaksi</Text>
                                                <Text style={{ color: 'black', fontSize: 14 }}>Anda Belum Melakukan Riwayat Transaksi Produk</Text>
                                                <TouchableOpacity style={styles.buttonNotFound} onPress={() => {
                                                    navigation.navigate(Navigasi.TOKO_KESEHATAN_PRODUK)
                                                }}>
                                                    <Text style={styles.textButtonNotFound}>
                                                        Lanjutkan Transaksi
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    )
                                ) : (
                                    <View />
                                )
                            }
                        </ScrollView>
                    )
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },

    heading: {
        padding: 15,
        height: 50,
        backgroundColor: 'white',
        elevation: 5
    },

    option: {
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },

    active: {
        backgroundColor: 'blue'
    },

    nonActive: {
        borderColor: 'blue',
        borderWidth: 1,
        backgroundColor: 'white'
    },

    textActive: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },

    textNonActive: {
        color: 'blue',
        fontSize: 14,
        fontWeight: 'bold'
    },

    textheading: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        fontSize: 16
    },

    content: {
        backgroundColor: 'white',
        elevation: 5,
        marginHorizontal: 10,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 5
    },

    textcontent: {
        color: 'blue',
        marginHorizontal: 10,
        marginVertical: 10,
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        fontWeight: 'bold'
    },

    border: {
        borderColor: 'gray',
        marginHorizontal: 10,
        borderWidth: 1
    },

    tanggal: {
        color: 'green',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        fontSize: 14
    },

    button: {
        backgroundColor: 'green',
        marginBottom: 15,
        marginHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 7
    },

    textbutton: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
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

    buttonNotFound: {
        backgroundColor: '#051f84',
        width: '90%',
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 10
    },

    textButtonNotFound: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
    }
})

export default Transaksi;
