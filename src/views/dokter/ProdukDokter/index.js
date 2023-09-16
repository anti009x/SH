import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import Navigasi from '../../../partials/navigasi'
import { configfirebase } from '../../../firebase/firebaseConfig'
import { useEffect } from 'react'
import {getData} from "../../../utils/"

const ProdukDokter = ({ navigation }) => {

    

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.heading}>
                <Icon name="cart" style={{ fontSize: 20, color: 'white' }} />
                <Text style={styles.textHeading}>
                    Produk Yang Disarankan
                </Text>
            </View>
            <View style={styles.content}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 16 }}>
                    Rekomendasi Obat Pasien Kosong
                </Text>
                <Text style={{ color: 'black', fontSize: 14 }}>
                    Sepertinya Anda Belum Mengisi List Rekomendasi Obat
                </Text>
            </View>
            <View style={styles.contentbawah}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.navigate(Navigasi.TAMBAH_REKOMENDASI)
                }}>
                    <Text style={styles.textbutton}>
                        Tambah Rekomendasi Obat
                    </Text>
                </TouchableOpacity>
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
        height: 50,
        padding: 15,
        backgroundColor: '#051f84',
        flexDirection: 'row'
    },

    textHeading: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        marginLeft: 15
    },

    content: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    contentbawah: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    button: {
        backgroundColor: '#051f84',
        width: '90%',
        marginVertical: 20,
        borderRadius: 10
    },

    textbutton: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium'
    }
})

export default ProdukDokter;
