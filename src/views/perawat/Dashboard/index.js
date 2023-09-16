import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, PermissionsAndroid } from "react-native";
import { colors, getData, baseUrl, showSuccess } from '../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Navigasi from '../../../partials/navigasi';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import Geolocation from '@react-native-community/geolocation';
import { configfirebase } from '../../../firebase/firebaseConfig';

const DashboardPerawat = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const currenttime = new Date().getHours();
    let greeting;
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    if (currenttime < 10) {
        greeting = "Selamat Pagi";
    } else if (currenttime < 15) {
        greeting = "Selamat Siang";
    } else if (currenttime < 18) {
        greeting = "Selamat Sore";
    } else {
        greeting = "Selamat Malam";
    }

    useEffect(() => {
        getDataUserLocal();
        const debounceTimeout = setTimeout(() => {
            requestLocationPermission();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [dataPribadi.token, dataPribadi.uuid_firebase]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const logout = () => {
        Alert.alert(
            'Konfirmasi',
            'Apakah Anda Yakin Untuk Keluar ?',
            [
                {
                    text: 'Tidak',
                    style: 'cancel'
                },
                {
                    text: 'Setuju',
                    onPress: () => {
                        try {
                            AsyncStorage.removeItem("dataUser");
                            AsyncStorage.removeItem("user");
                            AsyncStorage.removeItem('isLoggedIn');

                            axios({
                                url: `${baseUrl.url}/logout`,
                                headers: {
                                    Authorization: 'Bearer ' + dataPribadi.token,
                                },
                                method: 'GET',
                            });

                            showSuccess("Good Job, Logout Sukses", "Anda Berhasil Keluar Aplikasi");
                            navigation.navigate(Navigasi.LOGIN)

                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ]
        )
    }

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app requires access to your location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.watchPosition(async position => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

                    const locationData = {
                        uuid: dataPribadi.uuid_firebase,
                        latitude: latitude,
                        longitude: longitude
                    };

                    const checkFirebase = configfirebase.database().ref(`locations/perawat/${dataPribadi.uuid_firebase}`);

                    checkFirebase.once("value", (snapshot) => {
                        if (snapshot.val()) {
                            configfirebase.database()
                                .ref(`locations/perawat/${dataPribadi.uuid_firebase}`)
                                .update(locationData)
                        } else {
                            configfirebase.database()
                                .ref(`locations/perawat/${dataPribadi.uuid_firebase}`)
                                .set(locationData);
                        }
                    })

                    setLatitude(latitude)
                    setLongitude(longitude);
                });
            } else {
                console.log('Tidak Ditemukan ');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                Hallo, Selamat Datang,
                            </Text>
                            <Text style={{ color: 'white', fontSize: 12 }}>
                                {dataPribadi.nama}
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    logout();
                                }}>
                                <Icon
                                    name="exit-outline"
                                    style={{ fontSize: 30, color: 'white' }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20, backgroundColor: 'white', elevation: 5, borderRadius: 10, paddingVertical: 20, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require("../../../assets/images/people.png")} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 50, borderColor: 'grey', borderWidth: 1 }} />
                        </View>
                        <View style={{ marginHorizontal: 7 }}>
                            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold' }}>{dataPribadi.nama}</Text>
                            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 12 }}>085324237299 </Text>
                            <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10, width: 250 }} />
                            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 12, fontWeight: 'bold' }}>Nomor STRP : 2003077
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={[styles.cardrekap, { marginRight: 10 }]}>
                                <Icon name='checkmark-done-outline' style={{ fontSize: 50, color: '#051f84' }} />
                                <Text style={styles.titlerekap}>
                                    Total Pasien Teratasi
                                </Text>
                                <Text style={styles.totalrekap}>
                                    30
                                </Text>
                            </View>
                            <View style={[styles.cardrekap, { marginLeft: 10 }]}>
                                <Icon name='close' style={{ fontSize: 50, color: '#051f84' }} />
                                <Text style={styles.titlerekap}>
                                    Pasien Belum Teratasi
                                </Text>
                                <Text style={styles.totalrekap}>
                                    100
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={[styles.cardrekap, { marginRight: 10 }]}>
                                <Icon name='eyedrop-outline' style={{ fontSize: 50, color: '#051f84' }} />
                                <Text style={styles.titlerekap}>
                                    Pasien Sedang Diatasi
                                </Text>
                                <Text style={styles.totalrekap}>
                                    100
                                </Text>
                            </View>
                            <View style={[styles.cardrekap, { marginLeft: 10 }]}>
                                <Icon name='book' style={{ fontSize: 50, color: '#051f84' }} />
                                <Text style={styles.titlerekap}>
                                    Jumlah Antrian
                                </Text>
                                <Text style={styles.totalrekap}>
                                    100
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background
    },

    header: {
        backgroundColor: '#051f84',
        height: 150,
        padding: 10,
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30
    },

    headingprofil: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1,
    },

    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        marginLeft: 5,
    },

    content: {
        marginVertical: 10,
        marginHorizontal: 10
    },

    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        paddingVertical: 10,
        paddingHorizontal: 10
    },

    nama: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        color: 'white'
    },

    nomorhp: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
    },

    image: {
        width: 50,
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cardrekap: {
        flex: 1,
        backgroundColor: 'white',
        elevation: 5,
        height: 170,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    titlerekap: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        paddingHorizontal: 2
    },

    totalrekap: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium'
    }
});

export default DashboardPerawat;