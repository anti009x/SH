import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import axios from 'axios';
import { getData,baseUrl } from '../../../../utils';
// JadwalDokter.js

const { width } = Dimensions.get('window');

const JadwalDokter = () => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [specializations, setSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnims, setFadeAnims] = useState([]);


  useEffect(() => {
    getDataUserLocal();
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  useEffect(() => {             
    const fetchData = async () => {
      try {
        const response = await axios({
          url: `${baseUrl.url}/akun/dokter/data`,
          headers: {
              Authorization: 'Bearer ' + dataPribadi.token
          },
          method: "GET"
      });
        setSpecializations(response.data.data);
        const newFadeAnims = animateFadeIn(response.data.data.length);
        setFadeAnims(newFadeAnims);
        setIsLoading(false);
      } catch (error) {
        // console.error(error);
  setIsLoading(false);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dataPribadi.token]);

  const animateFadeIn = (length) => {
    const anims = [];
    // Generate fade animations for each specialization
    for (let i = 0; i < length; i++) {
      const fadeAnim = new Animated.Value(0);
      anims.push(fadeAnim);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        delay: 1000 * i
      }).start();
    }
    return anims;
  };


  return (
    <View style={styles.container}>
    {isLoading ? (
      <Text>Loading...</Text>
    ) : (
      specializations.map((specialization, index) => (
        <Animated.View key={index} style={[styles.card, { opacity: fadeAnims[index] }]}>
          <Text>{specialization.user_id && specialization.user_id.nama}  Alamat : {specialization.user_id && specialization.user_id.alamat}</Text>
        </Animated.View>
      ))
    )}
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: (width - 40) / 3.2,
    marginBottom: 10,
  },
});

export default JadwalDokter;
