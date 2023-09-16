import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import StatusBarComponent from "../../../components/StatusBar/StatusBarComponent"
import { baseUrl, colors, getData } from "../../../utils"
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator } from 'react-native'

const TransaksiDokter = () => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [cekOption, setCekOption] = useState(1);
    const [transaksiBuatJanji, setTransaksiBuatJanji] = useState(null);

    useEffect(() => {
        getDataUserLocal();
        getTransaksiBuatJanji();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getTransaksiBuatJanji = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/ahli/transaksi_buat_janji`,
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

    const konsultasi = () => {
        setCekOption(1);
    }

    const buatJanji = () => {
        setCekOption(2);
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.heading}>
                <Text style={styles.textHeading}>
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
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {cekOption == 1 ? (
                    <View style={styles.contentnotfound}>
                        <Icon name="call" style={{ fontSize: 100, color: '#051f84' }} />
                        <Text style={styles.iconNotFound}>Belum Ada Transaksi</Text>
                        <Text style={{ color: 'black', fontSize: 14 }}>Anda Belum Mendapatkan Konsultasi</Text>
                    </View>
                ) : (
                    cekOption == 2 ? (
                        transaksiBuatJanji == null ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={"large"} color={colors.primary} />
                            </View>
                        ) : (
                            transaksiBuatJanji.length > 0 ? (
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {transaksiBuatJanji.map((item) => {
                                        return (
                                            <View key={item.id_transaksi_buat_janji} style={styles.content}>
                                                <Text style={styles.title}>
                                                    Detail Transaksi :
                                                </Text>
                                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <Text style={styles.textcontent}>
                                                        ID Transaksi
                                                    </Text>
                                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                                        <Text style={styles.textcontent}>
                                                            {item.id_transaksi_buat_janji}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <Text style={styles.textcontent}>
                                                        Biaya Praktek
                                                    </Text>
                                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                                        <Text style={styles.textcontent}>
                                                            {item.detail.biaya}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <Text style={styles.textcontent}>
                                                        Lokasi
                                                    </Text>
                                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                                        <Text style={styles.textcontent}>
                                                            {item.detail.nama_rs}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <Text style={styles.textcontent}>
                                                        Tanggal Transaksi
                                                    </Text>
                                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                                        <Text style={styles.textcontent}>
                                                            {item.tanggal_transaksi}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <Text style={styles.title}>
                                                    Detail Konsumen :
                                                </Text>
                                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <Text style={styles.textcontent}>
                                                        Nama
                                                    </Text>
                                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                                        <Text style={styles.textcontent}>
                                                            {item.konsumen.nama}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <Text style={styles.textcontent}>
                                                        Nomor Handphone
                                                    </Text>
                                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                                        <Text style={styles.textcontent}>
                                                            {item.konsumen.nomor_hp}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </ScrollView>
                            ) : (
                                <View style={styles.contentnotfound}>
                                    <Icon name="book" style={{ fontSize: 100, color: '#051f84' }} />
                                    <Text style={styles.iconNotFound}>Belum Ada Transaksi</Text>
                                    <Text style={{ color: 'black', fontSize: 14 }}>Belum Ada Janji Temu Dengan Anda</Text>
                                </View>
                            )
                        )
                    ) : (
                        <View />
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
        height: 50,
        elevation: 5,
        backgroundColor: '#051f84',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textHeading: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase'
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
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },

    textcontent: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Poppins-Medium'
    },

    title: {
        color: 'green',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold'
    }
})

export default TransaksiDokter