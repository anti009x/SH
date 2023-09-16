import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent'
import { baseUrl, colors, getData, showSuccess } from '../../../utils';
import axios from 'axios';
import Navigasi from '../../../partials/navigasi';
import Icon from 'react-native-vector-icons/Ionicons';

const ObatResep = ({navigation}) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [resep, setResep] = useState(null);

    useEffect(() => {
        getDataUserLocal();
        getResep();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    }

    const getResep = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/resep/obat`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            })

            setResep(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    const batalkan = async (id_resep_obat) => {
        Alert.alert(
            'Konfirmasi',
            'Apakah Anda Yakin Ingin Menghapus Data Ini ?',
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
                                url: `${baseUrl.url}/resep/obat/${id_resep_obat}`,
                                headers: {
                                    Authorization: 'Bearer ' + dataPribadi.token
                                },
                                method: "DELETE"
                            })
                
                            showSuccess("Berhasil", "Data Berhasil di Hapus");

                            getResep();
                
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ]
        )
    }
    
    const setujui = async (id_resep_obat) => {
        Alert.alert(
            'Konfirmasi',
            'Apakah Anda Sudah Setuju Terkait Resep Yang Diberikan ?',
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
                                url: `${baseUrl.url}/resep/obat/${id_resep_obat}/setuju`,
                                headers: {
                                    Authorization: 'Bearer ' + dataPribadi.token
                                },
                                method: "PUT"
                            })
                
                            showSuccess("Berhasil", "Resep Obat Berhasil di Setujui");

                            getResep();
                
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
                <Text style={styles.textHeading}>
                    Resep Obat Saya
                </Text>
            </View>
            {resep == null ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            ) : (
                resep.length > 0 ? (
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        <View style={{marginTop: 10}} />
                        {resep.map((item) => {
                            return (
                                <View key={item.id_resep_obat} style={styles.cardList}>
                                    <Text style={styles.title}>
                                        Detail Data :
                                    </Text>
                                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                            ID Resep Obat
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                                {item.id_resep_obat}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                            Tanggal
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                                {item.tanggal}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                            Total Biaya
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                                {item.jumlah_harga}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.title}>
                                        Data Konsumen : 
                                    </Text>
                                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                            Nama
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                                {item.konsumen.nama}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                            Nomor Handphone
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                                {item.konsumen.nomor_hp}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.title}>
                                        Rekomendasi Ahli : 
                                    </Text>
                                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                            Nama
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                                {item.ahli.nama}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                            Nomor Handphone
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                                {item.ahli.nomor_hp}
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate(Navigasi.DETAIL_OBAT_RESEP, {
                                            data: item
                                        })
                                    }} style={[styles.button, {backgroundColor: 'green', marginTop: 10}]}>
                                        <Text style={[styles.textButton, {color: 'white'}]}>
                                            Detail Resep
                                        </Text>
                                    </TouchableOpacity>
                                    {item.status == "1" && item.delete == null ? (
                                        <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity onPress={() => {
                                            batalkan(item.id_resep_obat)
                                        }} style={[styles.button, {borderColor: 'red', borderWidth: 1, marginTop: 10}]}>
                                            <Text style={[styles.textButton, {color: 'red'}]}>
                                                Batalkan Resep Obat
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setujui(item.id_resep_obat)
                                        }} style={[styles.button, {borderColor: 'green', borderWidth: 1, marginTop: 10, marginLeft: 10}]}>
                                            <Text style={[styles.textButton, {color: 'green'}]}>
                                                Terima Resep Obat
                                            </Text>
                                        </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View style={[styles.button, {borderColor: 'blue', borderWidth: 1, marginTop: 10}]}>
                                            <Text style={[styles.textButton, {color: 'blue'}]}>
                                                Resep Disetujui
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
                        <Text style={styles.iconNotFound}>Belum Ada Resep Obat</Text>
                        <Text style={{ color: 'black', fontSize: 14 }}>
                            Data Resep Obat Tidak Ditemukan
                        </Text>
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
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textHeading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
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

    cardList: {
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    },

    title: {
        color: 'green', 
        fontWeight: 'bold', 
        fontSize: 16, 
        fontFamily: 'Poppins-Medium'
    },

    button: {
        borderRadius: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    textButton: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        fontWeight: 'bold'
    },
})

export default ObatResep