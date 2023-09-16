import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect} from 'react'
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent'
import Heading from '../../../../../components/Heading'
import { SvgXml } from 'react-native-svg'
import axios from 'axios'
import { baseUrl, getData, showError, showSuccess } from '../../../../../utils'
import { useState } from 'react'
import Navigasi from '../../../../../partials/navigasi'

const DetailJadwalJanji = ({ navigation, route }) => {

    const [dataPribadi, setDataPribadi] = useState({});

    const detail = route.params;
        
    useEffect(() => {
        getDataUserLocal();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const selesai = async (id_jadwal_antrian) => {
        Alert.alert(
            'Konfirmasi',
            'Apakah Anda Sudah Selesai Konsultasi ?',
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
                                url: `${baseUrl.url}/ahli/jadwal_antrian/${id_jadwal_antrian}`,
                                headers: {
                                    Authorization: 'Bearer ' + dataPribadi.token
                                },
                                method: "PUT"
                            })

                            if (response.data.status == false) {
                                showError("Gagal", "Belum Waktunya Konsultasi");
                            } else {
                                showSuccess("Berhasil", "Konsultasi Konsumen Selesai");
                                
                                navigation.navigate(Navigasi.MAIN_DOKTER)
                            }

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
            <Heading textHeading={"Detail Buat Janji"} navigasi={() => {
                navigation.goBack();
            }} />
            <View style={styles.card}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <SvgXml xml={detail.data.qr} width={150} height={150} />
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
                            {detail.data.id_jadwal_antrian}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Tanggal Antrian
                    </Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            {detail.data.tanggal_antrian}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Biaya Praktek
                    </Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            {detail.data.praktek.ahli.biaya}
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
                            {detail.data.konsumen.user.nama}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Nomor Handphone
                    </Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            {detail.data.konsumen.user.nomor_hp}
                        </Text>
                    </View>
                </View>

                <Text style={{ marginTop: 10, color: 'green', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold' }}>
                    Data Jadwal :
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Tanggal Janjian
                    </Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            {detail.data.praktek.jadwal.tanggal}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Jam Mulai
                    </Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            {detail.data.praktek.jadwal.detail.mulai_jam}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Jam Selesai
                    </Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            {detail.data.praktek.jadwal.detail.selesai_jam}
                        </Text>
                    </View>
                </View>
                
                {detail.data.delete == "false" ? (
                    <TouchableOpacity onPress={() => {
                        selesai(detail.data.id_jadwal_antrian)
                    }} style={{ marginVertical: 10 , backgroundColor: 'green', borderRadius: 10, paddingVertical: 10, alignItems: 'center'}}>
                        <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14}}>
                            Selesai Konsultasi
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View style={{ marginVertical: 10 , backgroundColor: 'brown', borderRadius: 10, paddingVertical: 10, alignItems: 'center'}}>
                        <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14}}>
                            Konsultasi Dibatalkan
                        </Text>
                    </View>
                ) }

            </View>
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
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})

export default DetailJadwalJanji;