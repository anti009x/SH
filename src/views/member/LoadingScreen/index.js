import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from "react-native";
import { baseUrl, getData } from '../../../utils';
import axios from 'axios';


const LoadingScreen = () => {
    
    const [dataPribadi, setDataPribadi] = useState({});
    const [map, setMap] = useState(null);
    const [kategori, setKategori] = useState({});
    
    useEffect(() => {
        getDataUserLocal();
        getRole();  
    }, []);
    
    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };
    
    const getRole = async () => {
        try {
            await axios({
              url: `${baseUrl.url}/master/kategori_artikel`,
              headers: {
                Authorization: 'Bearer ' + dataPribadi.token,
              },
              method: 'GET',
            })
              .then(response => {
                console.log("-----------------");
                setKategori(response.data.data);
                console.log(response.data.data);
              })
              .catch(error => {
                console.log(error);
              });
          } catch (error) {
            console.log(error);
          }
    }
    
    return (
        <View style={{flex: 1,backgroundColor: '#F5FCFF'}}>
        <View style={{backgroundColor: 'blue', height: 50, padding: 10}}>
        <Text style={{color: 'white'}}>Hadman</Text>
        </View>
        </View>
        );
    }
    
    const styles = StyleSheet.create({
        lottie: {
            width: 100,
            height: 100
        }
    })
    
    export default LoadingScreen;