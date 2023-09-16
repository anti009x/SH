import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { colors } from '../../../../utils';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Heading from '../../../../components/Heading';
import { getData, baseUrl } from '../../../../utils';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Navigasi from '../../../../partials/navigasi';

const AllArtikel = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [artikel, setartikel] = useState(null);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            getDataUserLocal();
            allartikel();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const allartikel = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/artikel/ambil_artikel`,
                headers: {
                    Authorization: "Bearer " + dataPribadi.token
                },
                method: "GET"
            });
    
            setartikel(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.backgroundBelakang}>
            <StatusBarComponent />
            <Heading navigasi={() => {
                navigation.goBack();
            }} textHeading={"Semua Data Artikel"} />
            
            {artikel == null ? (
                <ActivityIndicator size={'large'} style={{flex: 1, alignItems: 'center', justifyContent: 'center' }} />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {artikel.map((item) => {
                        return (
                            <TouchableOpacity key={item.id_artikel} onPress={() => {
                                navigation.navigate(Navigasi.DETAIL_ARTIKEL, {
                                    data: item
                                })
                            }}>
                                <View style={styles.cardartikel}>
                                    <Image source={require("../../../../assets/images/gambar-rs.jpg")} resizeMode='cover' style={styles.image} />
                                    <Text style={styles.judulartikel} numberOfLines={1} ellipsizeMode={'tail'}>
                                        {item.judul_artikel}
                                    </Text>
                                    <Text style={styles.deskripsi} numberOfLines={1} ellipsizeMode={'tail'}>
                                        {item.deskripsi}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            ) }
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundBelakang: {
        flex: 1,
        backgroundColor: colors.backgroundDasarBelakang
    },

    cardartikel: {
        backgroundColor: 'white',
        elevation: 5,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    },

    image: {
        width: '100%', 
        height: 150, 
        borderRadius: 10
    },

    judulartikel: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Poppins-Medium',
        marginVertical: 10
    },

    deskripsi: {
        fontSize: 10,
        color: 'grey',
        textAlign: 'justify',
        fontFamily: 'Poppins-Medium',
    }
});

export default AllArtikel;