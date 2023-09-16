import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { baseUrl, colors, getData } from '../../../../../utils'
import axios from 'axios';
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';

const ProdukByKategori = ({ route, navigation }) => {

    const kategori = route.params.data;

    const [dataPribadi, setDataPribadi] = useState({});
    const [produk, setProduk] = useState(null);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            getDataUserLocal();
            getprodukbykategori();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getprodukbykategori = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/apotek/produk/produk_kategori/${kategori.id_kategori_produk}`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            });

            setProduk(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent/>
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Icon name="arrow-back" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.textheading}>
                    {kategori.nama_kategori_produk}
                </Text>
            </View>
            {produk == null ? (
                <ActivityIndicator size={"large"} color={colors.primary} />
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {produk.map((item) => {
                        return (
                            <View style={{marginHorizontal: 10}} key={item.produk.kode_produk}>
                                <Text style={{color: 'black'}}>
                                    {item.produk.kode_produk}
                                </Text>
                            </View>
                        )
                    })}
                </ScrollView>
            ) }
        </View>
    )

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.backgroundPutih
    },
    
    heading: {
        padding: 15,
        backgroundColor: colors.backgroundPutih,
        elevation: 5,
        height: 50,
        flexDirection: 'row'
    },

    icon: {
        fontSize: 20,
        color: 'black'
    },

    textheading: {
        fontSize: 14,
        marginLeft: 10,
        marginRight: 10,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium'
    }
})

export default ProdukByKategori;
