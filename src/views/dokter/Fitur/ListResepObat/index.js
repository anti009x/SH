import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent'
import Heading from '../../../../components/Heading'
import { baseUrl, colors, getData } from '../../../../utils'
import axios from 'axios'
import { ActivityIndicator } from 'react-native'
import Navigasi from "../../../../partials/navigasi";
import Icon from 'react-native-vector-icons/Ionicons'

const ListResepObat = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [resep, setResep] = useState(null);

    useEffect(() => {
        getDataUserLocal();
        getResepObat();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getResepObat = async () => {
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

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading textHeading={"List Resep Obat"} navigasi={() => {
                navigation.goBack();
            }} />
            {resep == null ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            ) : (
                resep.length > 0 ? (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: 10 }} />
                        {resep.map((item) => {
                            return (
                                <View key={item.id_resep_obat} style={styles.cardList}>
                                    <Text style={styles.title}>
                                        Detail Data :
                                    </Text>
                                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                            ID Resep Obat :
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                                {item.id_resep_obat}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                            Tanggal :
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                                {item.tanggal}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                            Total Biaya :
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
                                            Nama :
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                                {item.konsumen.nama}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                            Nomor Handphone :
                                        </Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                                                {item.konsumen.nomor_hp}
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate(Navigasi.DETAIL_LIST_RESEP_OBAT, {
                                            data: item
                                        })
                                    }} style={styles.button}>
                                        <Text style={styles.textButton}>
                                            Detail Resep
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </ScrollView>
                ) : (
                    <View style={styles.contentnotfound}>
                        <Icon name="cart" style={{ fontSize: 100, color: '#051f84' }} />
                        <Text style={styles.iconNotFound}>Belum Ada Transaksi</Text>
                        <Text style={{ color: 'black', fontSize: 14 }}>Anda Belum Melakukan Riwayat Transaksi Produk</Text>
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

    button: {
        backgroundColor: 'green',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButton: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        fontWeight: 'bold'
    },

    title: {
        color: 'green', 
        fontWeight: 'bold', 
        fontSize: 16, 
        fontFamily: 'Poppins-Medium'
    }
})

export default ListResepObat;