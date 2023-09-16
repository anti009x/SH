import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent'
import Heading from '../../../../components/Heading';
import axios from 'axios';
import { baseUrl, getData, colors } from '../../../../utils';

const DetailResepObat = ({ navigation, route }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [detailData, setDetailData] = useState(null);
    const detail = route.params;

    useEffect(() => {
        getDataUserLocal();
        getCetakData();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getCetakData = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/resep/obat/${detail.data.id_resep_obat}`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            })

            setDetailData(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading textHeading={`Detail Resep Obat ${detail.data.id_resep_obat}`} navigasi={() => {
                navigation.goBack();
            }} />
            {detailData == null ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            ) : (
                detailData.length > 0 ? (
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        <View style={{ marginTop: 10 }} />
                        {detailData.map((item) => {
                            return (
                                <View key={item.id_resep_obat_detail} style={styles.cardObat}>
                                    <Text style={styles.title}>
                                        Detail Transaksi :
                                    </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={styles.textcontent}>
                                            ID Detail
                                        </Text>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                            <Text style={styles.textcontent}>
                                                {item.id_resep_obat_detail}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                        <Text style={styles.textcontent}>
                                            Total Belanja
                                        </Text>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                            <Text style={styles.textcontent}>
                                                {item.convert}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                        <Text style={styles.textcontent}>
                                            QTY
                                        </Text>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                            <Text style={styles.textcontent}>
                                                {item.qty}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <Text style={styles.title}>
                                        Detail Produk :
                                    </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={styles.textcontent}>
                                            Kode Produk
                                        </Text>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                            <Text style={styles.textcontent}>
                                                {item.produk.kode_produk}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                        <Text style={styles.textcontent}>
                                            Nama Produk
                                        </Text>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                            <Text style={styles.textcontent}>
                                                {item.produk.nama_produk}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                        <Text style={styles.textcontent}>
                                            Harga Produk
                                        </Text>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                            <Text style={styles.textcontent}>
                                                {item.produk.harga_produk}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                ) : (
                    <Text style={{ color: 'black' }}>
                        Mohammad
                    </Text>
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

    cardObat: {
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    },

    title: {
        color: 'green',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        fontSize: 16,
    },

    textcontent: {
        color: 'black', 
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    }
})

export default DetailResepObat;