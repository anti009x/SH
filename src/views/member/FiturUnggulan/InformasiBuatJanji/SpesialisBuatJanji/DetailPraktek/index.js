import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { baseUrl, colors, getData, showError, showSuccess } from '../../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarComponent from '../../../../../../components/StatusBar/StatusBarComponent';
import axios from 'axios';
import Navigasi from '../../../../../../partials/navigasi';

const DetailPraktek = ({ navigation, route }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [jadwal, setjadwal] = useState(null);
    const spesialis = route.params;
    const [status, setStatus] = useState(null);
    const [tanggal, setTanggal] = useState(null);
    const [selectedJadwal, setSelectedJadwal] = useState(null);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            getDataUserLocal();
            jadwalpraktek();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const jadwalpraktek = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/ahli/jadwal_praktek/${spesialis.data.id_dokter}/${spesialis.id_rumah_sakit}`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            });

            setjadwal(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const pilihJadwal = (item) => {
        if (selectedJadwal == item.id_jadwal_praktek) {
            setSelectedJadwal(null);
        } else {
            setSelectedJadwal(item.id_jadwal_praktek)
        }
    }

    const buttonDisabled = () => {
        showError("Gagal", "Anda Perlu Memilih Jadwal Terlebih Dahulu");
    }
    
    const buttonActive = async (selectedJadwal) => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/ahli/jadwal_antrian`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "POST",
                data: {
                    id_jadwal_praktek: selectedJadwal
                }
            })
    
            if (response.data.status == false) {
                showError("Gagal", response.data.pesan);
            } else {
                showSuccess("Berhasil", "Antrian Anda Berhasil di Buat");
    
                navigation.navigate(Navigasi.MAIN_APP)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={{ paddingHorizontal: 10, paddingVertical: 15, flexDirection: 'row', backgroundColor: '#051f84' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <Icon name="arrow-back" style={{ color: 'white', fontSize: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 16, textAlign: 'center' }}>
                        Detail Data Praktek
                    </Text>
                </View>
            </View>
            <View style={{ marginTop: 10, flex: 3 }}>
                <View style={{ backgroundColor: 'white', elevation: 5, paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Image source={require("../../../../../../assets/images/people.png")} resizeMode='cover' style={{ width: 70, height: 70, borderRadius: 100, borderColor: 'blue', borderWidth: 1 }} />
                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                            {spesialis.data.nama_dokter}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                            {spesialis.data.nomor_hp}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{
                                    backgroundColor: colors.backgroundDasarBelakang,
                                    borderRadius: 5,
                                    paddingVertical: 5,
                                    paddingHorizontal: 5,
                                    marginVertical: 5,
                                    width: 100,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 3,
                                    }}>
                                    <Icon name="ios-location" style={{ color: 'black' }} />
                                </View>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 12,
                                        fontFamily: 'Poppins-Medium',
                                        fontWeight: 'bold',
                                    }}>
                                    42 Tahun
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, backgroundColor: 'white', elevation: 5, paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            {spesialis.data.tempat_medis.nama_rs}
                        </Text>
                        <Text style={{ color: 'grey', fontFamily: 'Poppins-Medium', fontSize: 12, fontWeight: 'bold' }}>
                            {/* {spesialis.data.tempat_medis.alamat_rs} */}
                            Jalan Villa Intan 2 Blok i4 No.1
                        </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Image source={require("../../../../../../assets/images/gambar-rs.jpg")} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 10 }} />
                    </View>
                </View>
                <View style={{ marginTop: 10, backgroundColor: 'white', elevation: 5, paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginHorizontal: 5 }}>
                        <Text style={{ color: 'red', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            Bayar Di Rumah Sakit
                        </Text>
                        <Text style={{ color: 'black', marginTop: 5, fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            {spesialis.data.biaya}
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, backgroundColor: '#F2EFEF', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>
                        Pilih Tanggal & Waktu Kunjungan
                    </Text>
                </View>
                {jadwal == null ? (
                    <ActivityIndicator size={"large"} color={"primary"} />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 10}}>
                        {jadwal.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    pilihJadwal(item)
                                }} style={[styles.cardJadwal, selectedJadwal === item.id_jadwal_praktek ? styles.active : styles.non_active ]} key={item.id_jadwal_praktek}>
                                    <Text style={[styles.textJadwal, selectedJadwal === item.id_jadwal_praktek ? styles.textActive : styles.textNonActive ]}>
                                        {item.tanggal}
                                    </Text>
                                    <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                                    <Text style={[styles.textJadwal, selectedJadwal === item.id_jadwal_praktek ? styles.textActive : styles.textNonActive ]}>
                                        Jam : {item.mulai_jam} - {item.selesai_jam}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                        </View>
                    </ScrollView>
                )}
            </View>
            <TouchableOpacity onPress={() => {
                selectedJadwal == null ? buttonDisabled() : buttonActive(selectedJadwal) 
            }} style={[styles.button, selectedJadwal == null ? styles.disabled : styles.active] }>
                <Text style={styles.textButton}>
                    {selectedJadwal == null ? 'Pilih Jadwal Temu Dokter' : 'Buat Janji Temu Dokter' }
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background,
    },
    viewicon: {
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    detailjudul: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    button: {
        backgroundColor: 'purple',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        paddingVertical: 10
    },
    textButton: {
        fontFamily: 'Poppins-Medium', 
        fontSize: 14, 
        fontWeight: 'bold', 
        textAlign: 'center',
        color: 'white'
    },
    disabled: {
        backgroundColor: 'gray'
    },
    cardJadwal: {
        elevation: 5,
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexBasis: '48%',
    },

    active: {
        backgroundColor: "#051f84"
    },

    non_active: {
        backgroundColor: 'white'
    },

    textActive: {
        color: 'white'
    },

    textNonActive: {
        color: 'black'
    },

    textJadwal: {
        fontSize: 14, 
        fontWeight: 'bold', 
        fontFamily: 'Poppins-Medium', 
        textAlign: 'center'
    }
});

export default DetailPraktek;