import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Heading from '../../../../components/Heading';

const DetailTransaksiBuatJanji = ({ navigation, route }) => {

    const getTransaksi = route.params;

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading navigasi={() => {
                navigation.goBack()
            }} textHeading={"Transaksi " + getTransaksi.data.id_transaksi_buat_janji} />
            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14, marginHorizontal: 10, marginVertical: 10, textAlign: 'center' }}> DETAIL TRANSAKSI BUAT JANJI </Text>
            <ScrollView>
                <View style={{ backgroundColor: 'green', marginHorizontal: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingVertical: 15, paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                Status Transaksi
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: '#051f84', borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                                Sudah Selesai
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', elevation: 5, paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 10, marginBottom:10 }}>
                    <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Detail :
                    </Text>
                    <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            Nomor Antrian
                        </Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                {getTransaksi.data.nomer_antrian}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            Tanggal Transaksi
                        </Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                {getTransaksi.data.tanggal_transaksi}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            Biaya Transaksi
                        </Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                {getTransaksi.data.detail.biaya}
                            </Text>
                        </View>
                    </View>
                    <Text style={{ marginTop: 10, color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Detail Data Konsumen :
                    </Text>
                    <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            Nama Konsumen
                        </Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                {getTransaksi.data.konsumen.nama}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            Nomor HP Konsumen
                        </Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                {getTransaksi.data.konsumen.nomor_hp}
                            </Text>
                        </View>
                    </View>
                    <Text style={{ marginTop: 10, color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Detail Data Dokter :
                    </Text>
                    <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            Nama Dokter
                        </Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                {getTransaksi.data.ahli.nama}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            Nomor HP Dokter
                        </Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                {getTransaksi.data.ahli.nomor_hp}
                            </Text>
                        </View>
                    </View>
                    <Text style={{ marginTop: 10, color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                        Detail Data Lokasi :
                    </Text>
                    <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            Nama Lokasi
                        </Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'green', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                                {getTransaksi.data.detail.nama_rs}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default DetailTransaksiBuatJanji;