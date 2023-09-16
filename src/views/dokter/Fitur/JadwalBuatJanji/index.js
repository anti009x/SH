import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { baseUrl, colors, getData } from '../../../../utils';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Heading from '../../../../components/Heading';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';
import Navigasi from '../../../../partials/navigasi';
import Icon from 'react-native-vector-icons/Ionicons';

const JadwalBuatJanji = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [jadwal, setJadwal] = useState(null);

    useEffect(() => {
        getDataUserLocal();
        getJadwal();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getJadwal = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/ahli/jadwal_antrian`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            })

            setJadwal(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading textHeading={"Jadwal Buat Janji Saya"} navigasi={() => {
                navigation.goBack();
            }} />
            {jadwal == null ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            ) : (
                jadwal.length > 0 ? (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {jadwal.map((item) => {
                            return (
                                <View style={{ marginBottom: 10, backgroundColor: 'white', elevation: 5, marginVertical: 10, marginHorizontal: 10, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10 }} key={item.id_jadwal_antrian}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <SvgXml xml={item.qr} width={150} height={150} />
                                    </View>
                                    <Text style={{ marginTop: 10, color: 'green', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold' }}>
                                        Data Antrian : 
                                    </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                            ID Jadwal Antrian
                                        </Text>
                                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                                {item.id_jadwal_antrian}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                            Status Konsultasi
                                        </Text>
                                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                            <Text style={{ color: item.status == 1 ? 'red' : 'green' , fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                                {item.status == 1 ? "Belum Konsultasi" : ("Belum Sudah Konsultasi") }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                            Tanggal Antrian
                                        </Text>
                                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                                {item.tanggal_antrian}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                            Biaya Praktek
                                        </Text>
                                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                                {item.praktek.ahli.biaya}
                                            </Text>
                                        </View>
                                    </View>

                                    <Text style={{ marginTop: 10, color: 'green', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold' }}>
                                        Data Konsumen :
                                    </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                            Nama
                                        </Text>
                                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                                {item.konsumen.user.nama}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                            Nomor Handphone
                                        </Text>
                                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                                {item.konsumen.user.nomor_hp}
                                            </Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate(Navigasi.DETAIL_JADWAL_JANJI, {
                                            data: item
                                        })
                                    }} style={{ backgroundColor: 'green', borderRadius: 10, marginVertical: 10, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                            Detail
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </ScrollView>
                ) : (
                    <View style={styles.contentnotfound}>
                        <Icon name="book" style={{ fontSize: 100, color: '#051f84' }} />
                        <Text style={styles.iconNotFound}>Belum Ada Jadwal Antrian</Text>
                        <Text style={{ color: 'black', fontSize: 14 }}>
                            Sepertinya Belum Ada Data Antrian Dari Para Konsumen
                        </Text>
                        {/* <TouchableOpacity style={styles.buttonNotFound} onPress={() => {
                            navigation.navigate(Navigasi.TOKO_KESEHATAN_PRODUK)
                        }}>
                            <Text style={styles.textButtonNotFound}>
                                Lanjutkan Transaksi
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background
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

export default JadwalBuatJanji;