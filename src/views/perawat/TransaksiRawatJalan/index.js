import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent'
import { baseUrl, colors, getData, showSuccess } from '../../../utils';
import axios from 'axios';

const TransaksiRawatJalan = () => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [rawat, setRawat] = useState(null);

    useEffect(() => {
        getDataUserLocal();
        getRawat();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getRawat = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/perawat/pesan_perawat`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            })

            setRawat(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    const selesaikan = async (id_pesan_perawat) => {
        Alert.alert(
            'Konfirmasi',
            'Apakah Yakin Sudah Menyelesaikan ?',
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
                                url: `${baseUrl.url}/perawat/pesan_perawat/${id_pesan_perawat}`,
                                headers: {
                                    Authorization: 'Bearer ' + dataPribadi.token
                                },
                                method: "PUT"
                            })
                
                            showSuccess("Berhasil", "Anda Sudah Menyelesaikan Tugas");
                
                            getRawat();
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
            <View style={styles.heading}>
                <Text style={styles.textheading}>
                    Data Pasien Rawat Jalan
                </Text>
            </View>
            {rawat == null ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            ) : (
                rawat.length > 0 ? (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: 10 }} />
                        {rawat.map((item) => {
                            return (
                                <View key={item.id_pesan_perawat} style={styles.content}>
                                    <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold' }}>
                                        Detail Transaksi :
                                    </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={styles.textcontent}>
                                            ID Pesan
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <Text style={styles.textcontent}>
                                                {item.id_pesan_perawat}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={styles.textcontent}>
                                            Alamat
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <Text style={styles.textcontent}>
                                                {item.alamat}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={styles.textcontent}>
                                            Tanggal
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <Text style={styles.textcontent}>
                                                {item.created_at}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>
                                        Detail Konsumen :
                                    </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={styles.textcontent}>
                                            Nama
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <Text style={styles.textcontent}>
                                                {item.konsumen.nama}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={styles.textcontent}>
                                            Nomor Handphone
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <Text style={styles.textcontent}>
                                                {item.konsumen.nomor_hp}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={styles.textcontent}>
                                            Status Transaksi
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <Text style={[styles.textcontent, {color: item.status == "0" ? 'red' : 'green' } ]}>
                                                {item.status == "0" ? "Belum Selesai" : "Sudah Selesai" }
                                            </Text>
                                        </View>
                                    </View>
                                    {item.status == "0" ? (
                                        <TouchableOpacity onPress={() => {
                                            selesaikan(item.id_pesan_perawat)
                                        }} style={styles.button}>
                                            <Text style={styles.textbutton}>
                                                Selesaikan
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={styles.button}>
                                            <Text style={styles.textbutton}>
                                                Rawat Jalan Sudah Selesai
                                            </Text>
                                        </View>
                                    ) }
                                </View>
                            )
                        })}
                    </ScrollView>
                ) : (
                    <View style={styles.contentnotfound}>
                        <Icon name="cart" style={{ fontSize: 100, color: '#051f84' }} />
                        <Text style={styles.iconNotFound}>Belum Ada Transaksi</Text>
                        <Text style={{ color: 'black', fontSize: 14 }}>Anda Belum Mendapatkan Data Pasien Rawat Jalan</Text>
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

    heading: {
        backgroundColor: '#051f84',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },

    textheading: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        textTransform: 'uppercase'
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

    content: {
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    },

    textcontent: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Poppins-Medium'
    },

    button: {
        backgroundColor: 'green',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textbutton: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        fontSize: 14
    }
})

export default TransaksiRawatJalan;