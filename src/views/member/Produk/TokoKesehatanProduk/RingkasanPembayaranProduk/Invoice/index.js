import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import StatusBarComponent from '../../../../../../components/StatusBar/StatusBarComponent'
import Navigasi from '../../../../../../partials/navigasi'

const Invoice = ({ navigation, route }) => {

    const detail = route.params;

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.heading}>
                <Text style={styles.textheading}>
                    Transaksi Anda
                </Text>
            </View>
            <TouchableOpacity onPress={() => {
                navigation.navigate(Navigasi.MAIN_APP)
            }} style={{ backgroundColor: 'brown', marginHorizontal: 10, marginVertical: 10, borderRadius: 10, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>
                    Kembali Ke Halaman Utama
                </Text>
            </TouchableOpacity>
            <View style={styles.content}>
                {/* <Image source={require("../../../../../../assets/images/group-satu-new.png")} resizeMode='cover' style={{ height: 150, width: 150 }} /> */}
                <Text style={styles.title}>
                    Detail Transaksi :
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.textcontent}>
                            {detail.data.detail.transaksi.tanggal}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={styles.textcontent}>
                        ID Pembelian
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={styles.textcontent}>
                            {detail.data.detail.transaksi.pembelian}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={styles.textcontent}>
                        Total Bayar
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={styles.textcontent}>
                            {detail.data.detail.transaksi.total}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={styles.textcontent}>
                        VA Number
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={styles.textcontent}>
                            {detail.data.detail.transaksi.va_number}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.title, { marginTop: 10 }]}>
                    Detail Konsumen :
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={styles.textcontent}>
                        Nama
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={styles.textcontent}>
                            {detail.data.detail.konsumen.nama}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={styles.textcontent}>
                        Nomor Handphone
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={styles.textcontent}>
                            {detail.data.detail.konsumen.nomor_hp}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.title, { marginTop: 10 }]}>
                    Detail Transaksi Bank :
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={styles.textcontent}>
                        Nama Bank
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={styles.textcontent}>
                            {detail.data.detail.transaksi.bank}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{backgroundColor: 'green', marginHorizontal: 10, marginVertical: 10, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10}}>
                <Text style={{color: 'white', textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 12, fontWeight: 'bold'}}>
                    Silahkan Lakukan Pembayaran Ke Tempat Terdekat
                </Text>
            </View>
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
        elevation: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textheading: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

    content: {
        backgroundColor: 'white',
        elevation: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },

    title: {
        color: 'green',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        fontWeight: 'bold'
    },

    textcontent: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    }
})

export default Invoice;