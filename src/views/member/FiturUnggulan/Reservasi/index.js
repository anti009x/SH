import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { baseUrl, colors, getData } from '../../../../utils';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Heading from '../../../../components/Heading';
import Navigasi from '../../../../partials/navigasi';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';

const Reservasi = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [antrian, setAntrian] = useState(null);
    const [semuaAntrian, setSemuaAntrian] = useState(null);

    useEffect(() => {
        getDataUserLocal();
        getAntrian();
        getAllAntrian();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getAntrian = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/ahli/jadwal_antrian`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            });

            if (response.data.data == []) {
                setAntrian(false);
            } else {
                setAntrian(response.data.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getAllAntrian = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/ahli/jadwal_antrian/all`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            })

            setSemuaAntrian(response.data.data)

        } catch (error) {
            console.log(error);
        }
    }

    const countAntrian = semuaAntrian ? semuaAntrian.length : 0

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading navigasi={() => {
                navigation.replace(Navigasi.MAIN_APP)
            }} textHeading={"Antrian Buat Janji Saya"} />
            {antrian == null ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            ) : (
                antrian == false ? (
                    <View style={styles.contentnotfound}>
                        <Icon name="book" style={{ fontSize: 100, color: '#051f84' }} />
                        <Text style={styles.iconNotFound}>Belum Ada Transaksi</Text>
                        <Text style={{ color: 'black', fontSize: 14 }}>Anda Belum Melakukan Transaksi Buat Janji</Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.cardcatatan}>
                            <Text style={styles.textheading}>
                                Catatan :
                            </Text>
                            <View style={{ borderColor: 'white', borderWidth: 1, marginVertical: 10 }} />
                            <Text style={styles.textsubheading}>
                                Usahakan Datang Tepat Waktu Sesuai Dengan Jadwal Yang Sudah Ditetapkan
                            </Text>
                        </View>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ backgroundColor: 'green', marginHorizontal: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, marginTop: 30, paddingVertical: 10 }}>
                                <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>
                                    Data Antrian Saya
                                </Text>
                            </View>
                            <View style={{ backgroundColor: 'white', marginHorizontal: 10, elevation: 5, paddingVertical: 10, paddingHorizontal: 10, marginBottom: 10 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgXml xml={antrian.code} width={150} height={150} />
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={[styles.textantrian, { color: 'black' }]}>
                                        ID Jadwal Antrian :
                                    </Text>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                        <Text style={[styles.textantrian, { color: 'green' }]}>
                                            {antrian.id_jadwal_antrian}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.textantrian, { color: 'black' }]}>
                                        Nomer STR
                                    </Text>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                        <Text style={[styles.textantrian, { color: 'green' }]}>
                                            {antrian.nomor_str}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={[styles.textantrian, { color: 'black' }]}>
                                        Nama Dokter
                                    </Text>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                        <Text style={[styles.textantrian, { color: 'green' }]}>
                                            {antrian.ahli}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={[styles.textantrian, { color: 'black' }]}>
                                        Tanggal Konsultasi Ketemu
                                    </Text>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                        <Text style={[styles.textantrian, { color: 'green' }]}>
                                            {antrian.tanggal}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                                <Text style={{ color: 'green' }}>
                                    Detail Lokasi Ketemu :
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={[styles.textantrian, { color: 'black' }]}>
                                        Nama Tempat
                                    </Text>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                        <Text style={[styles.textantrian, { color: 'green' }]}>
                                            {antrian.lokasi.nama_rs}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={[styles.textantrian, { color: 'black' }]}>
                                        Alamat
                                    </Text>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                        <Text style={[styles.textantrian, { color: 'green' }]}>
                                            {antrian.lokasi.alamat_rs}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        {semuaAntrian == null ? (
                            <ActivityIndicator size={"large"} color={colors.primary} />
                        ) : (
                            countAntrian > 1 ? (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate(Navigasi.ALL_ANTRIAN)
                                }} style={{ backgroundColor: 'gray', marginVertical: 15, marginHorizontal: 10, borderRadius: 5, paddingVertical: 10, alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                        Lihat Jadwal Antrian Yang Lain
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10, backgroundColor: '#D84040', marginHorizontal: 10, borderRadius: 5, paddingVertical: 10 }}>
                                    <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                        Tidak Ada Antrian Yang Lain
                                    </Text>
                                </View>
                            )
                        )}
                    </>
                )
            )}
        </View>
    )
}

export default Reservasi;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    title: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        marginBottom: 10
    },

    contentnotfound: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    iconNotFound: {
        color: '#051f84',
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        fontWeight: 'bold'
    },

    textheading: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    textsubheading: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center'
    },

    cardcatatan: {
        marginHorizontal: 10,
        backgroundColor: '#D84040',
        borderRadius: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    },

    textantrian: {
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        fontSize: 14
    }
})