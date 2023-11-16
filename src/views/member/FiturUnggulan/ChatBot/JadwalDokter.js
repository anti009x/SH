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
  selectedCard: {
    padding: 16,
    width: (width - 40) / 3.2,
    borderRadius: 10,

    width: width, // Set the width to the full width of the screen
    alignSelf: 'stretch', // Ensure it stretches to the full width if it's inside another container
    marginBottom: 10,
    marginTop: 10, // Adjust as needed
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  sendButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,

  },

  
  botText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 8,
  },
});

export default JadwalDokter;