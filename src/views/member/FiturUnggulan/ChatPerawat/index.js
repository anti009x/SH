import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import StatusBarComponent from "../../../../components/StatusBar/StatusBarComponent";
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from "../../../../partials/navigasi"
import { colors } from '../../../../utils/colors';
import { ImageBackground } from 'react-native';
import Button from '../../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatPerawat = ({ navigation, route }) => {
    const getPerawat = route.params;
    console.log(getPerawat.data.user.uuid_firebase)

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <ImageBackground
                source={require('../../../../assets/images/background-doctor.png')}
                style={{ width: '100%', height: 250 }}
                resizeMode="cover"
            />
            <View style={{ position: 'absolute' }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <View style={styles.viewicon}>
                        <Icon name="arrow-back" style={{ fontSize: 20, color: 'black' }} />
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#051f84',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}>
                <Text
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 14,
                        marginTop: 10,
                        fontWeight: 'bold',
                    }}>
                    Detail Data Perawat
                </Text>
                <View
                    style={styles.carddetail}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.nama}>
                            {getPerawat.data.user.nama}
                        </Text>
                        <Text style={{ color: 'black', fontSize: 14 }}>
                            {getPerawat.data.user.kelas == 1
                                ? 'Dokter Spesialis'
                                : 'Dokter Umum'}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View
                                style={{
                                    backgroundColor: colors.backgroundDasarBelakang,
                                    width: 70,
                                    marginRight: 5,
                                    borderRadius: 10,
                                    paddingVertical: 5,
                                }}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontSize: 12,
                                        textAlign: 'center',
                                    }}>
                                    77 %
                                </Text>
                            </View>
                            <View
                                style={{
                                    backgroundColor: colors.backgroundDasarBelakang,
                                    width: 90,
                                    marginRight: 5,
                                    borderRadius: 10,
                                    paddingVertical: 5,
                                }}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontSize: 12,
                                        textAlign: 'center',
                                    }}>
                                    77 Tahun
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon
                                        name="md-school"
                                        style={{ fontSize: 20, color: 'black' }}
                                    />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            fontFamily: 'Poppins-Medium',
                                        }}>
                                        Alumni
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontFamily: 'Poppins-Medium',
                                            fontSize: 12,
                                            textAlign: 'justify',
                                        }}>
                                        SMK Informatika Al - Irsyad Al - Islamiyyah Kota Cirebon
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon
                                        name="business"
                                        style={{ fontSize: 20, color: 'black' }}
                                    />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            fontFamily: 'Poppins-Medium',
                                        }}>
                                        Praktik
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontFamily: 'Poppins-Medium',
                                            fontSize: 12,
                                            textAlign: 'justify',
                                        }}>
                                        RS. Plumbon Indramayu Kota Cirebon
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon
                                        name="create-outline"
                                        style={{ fontSize: 20, color: 'black' }}
                                    />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            fontFamily: 'Poppins-Medium',
                                        }}>
                                        Nomor STRP
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontFamily: 'Poppins-Medium',
                                            fontSize: 12,
                                            textAlign: 'justify',
                                        }}>
                                        2392839283923238
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: 'flex-end',
                            backgroundColor: 'blue',
                            borderRadius: 10,
                        }}>
                        <Button onpress={() => {
                            const detaildataperawat = {
                                uid: getPerawat.data.user.uuid_firebase,
                                nama: getPerawat.data.user.nama,
                                kelas: getPerawat.data.kelas
                            };
                            navigation.navigate(Navigasi.CHATING, {
                                data: detaildataperawat
                            })
                        }} textbutton={"Mulai Konsultasi"} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },

    viewicon: {
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 50,
    },

    carddetail: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#FDFDFD',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

    nama: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'justify',
    }
})

export default ChatPerawat;
