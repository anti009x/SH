import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors, getData } from '../../../utils';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';

const Profile = () => {

    const [dataPribadi, setDataPribadi] = useState({});

    useEffect(() => {
        getDataUserLocal();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    return (
        <View style={styles.background}>
            <View style={{ backgroundColor: '#051f84', height: 50, padding: 15, elevation: 10 }}>
                <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14, textAlign: 'center', textTransform: 'uppercase' }}>Profil Saya</Text>
            </View>
            <StatusBarComponent />
            <View style={styles.content}>
                <Image source={require("../../../assets/images/people.png")} resizeMode='cover' style={{height: 100, width: 100, borderRadius: 50, borderColor: 'black', borderWidth: 1}} />
                <View style={{marginHorizontal: 10}}>
                    <Text style={{color: 'black', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold'}}>{dataPribadi.nama}</Text>
                    <Text style={{color: 'gray', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold'}}>{dataPribadi.email}</Text>
                    <Text style={{color: 'gray', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold'}}>{dataPribadi.nomor_hp}</Text>
                    <TouchableOpacity style={{backgroundColor: 'green', borderRadius: 5, marginVertical: 3, paddingVertical: 5, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white'}}>
                            Edit Profil
                        </Text>
                    </TouchableOpacity>
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

    content: {
        backgroundColor: 'white',
        elevation: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 5,
        flexDirection: 'row'
    }
});

export default Profile;