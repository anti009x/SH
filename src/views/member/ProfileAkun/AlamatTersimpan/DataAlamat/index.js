import React, { useEffect, useRef, useState } from 'react'
import { PermissionsAndroid, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { baseUrl, colors, getData, showSuccess, useForm } from '../../../../../utils';
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent';
import Heading from '../../../../../components/Heading';
import axios from 'axios';
import Button from "../../../../../components/Button";
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import Navigasi from '../../../../../partials/navigasi';

const DataAlamat = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [form, setForm] = useForm({
        lokasi: '',
        detail: '',
        simpan_sebagai: ''
    });

    const dispatch = useDispatch();

    const [option, setoption] = useState("");

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            getDataUserLocal();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, []);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const tambah = async () => {

        dispatch({ type: 'SET_LOADING', value: true });
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/alamat_user`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "POST",
                data: {
                    simpan_sebagai: option,
                    lokasi: form.lokasi,
                    detail: form.detail
                }
            });

            dispatch({ type: 'SET_LOADING', value: false });

            showSuccess('Berhasil', 'Data Berhasil di Tambahkan');
            
            navigation.replace(Navigasi.ALAMAT_TERSIMPAN);

        } catch (error) {
            console.log(error);
        }
    }

    const simpan = async (value) => {
        setoption(value);
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading navigasi={() => navigation.goBack()} textHeading={"Tambah Data Alamat"} />
            <View style={styles.content}>
                <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                    <Text style={styles.label}>
                        Lokasi Alamat
                    </Text>
                    <TextInput placeholder='Masukkan Lokasi Alamat' placeholderTextColor={"grey"} style={styles.textInput} onChangeText={value => setForm("lokasi", value)} />
                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                    <Text style={styles.label}>
                        Detail Alamat
                    </Text>
                    <TextInput placeholder='Masukkan Detail Alamat' placeholderTextColor={"grey"} style={styles.textInput} onChangeText={value => setForm("detail", value)} />
                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                    <Text style={styles.label}>
                        Simpan Sebagai
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => {
                            simpan("kantor")
                        }} style={[styles.opsi, option == "kantor" ? styles.active : styles.non_active, { marginRight: 10 }]}>
                            <Text style={[styles.textsebagai, option == "kantor" ? styles.textactive : styles.textnonactive]}>
                                Kantor
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            simpan("rumah")
                        }} style={[styles.opsi, option == "rumah" ? styles.active : styles.non_active]}>
                            <Text style={[styles.textsebagai, option == "rumah" ? styles.textactive : styles.textnonactive]}>
                                Rumah
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginBottom: 10, marginHorizontal: 10 }}>
                    <Button onpress={() => { tambah() }} textbutton={"Tambah"} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background
    },

    content: {
        marginHorizontal: 10,
        elevation: 5,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingVertical: 10
    },

    label: {
        color: 'gray',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        fontWeight: 'bold'
    },

    opsi: {
        flex: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 5
    },

    active: {
        backgroundColor: 'blue',
    },

    non_active: {
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 1
    },

    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        fontSize: 14,
        color: 'black',
        marginTop: 5,
        paddingHorizontal: 10
    },

    textsebagai: {
        textAlign: 'center',
        fontWeight: 'bold'
    },

    textactive: {
        color: 'white'
    },

    textnonactive: {
        color: 'black',
    }
});

export default DataAlamat;