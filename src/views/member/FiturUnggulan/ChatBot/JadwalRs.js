import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { getData, baseUrl } from '../../../../utils';
import JadwalPoliklinik from './JadwalPoliklinik';

const { width } = Dimensions.get('window');

const JadwalRs = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [dataPribadi, setDataPribadi] = useState({});
  const [specializations, setSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnims, setFadeAnims] = useState([]);
  const [selectedSpecializationData, setSelectedSpecializationData] = useState(null);
  const [showPoliknikList, setShowPoliknikList] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const fadeAnimCard2 = useState(new Animated.Value(0))[0];
  const moveAnimCard2 = useState(new Animated.Value(0))[0];

  const handleCard1Click = () => {
    setShowPoliknikList(!showPoliknikList);
    Animated.timing(fadeAnim, {
      toValue: showPoliknikList ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    getDataUserLocal();
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  useEffect(() => {
    if (selectedCard) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedCard]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url: `${baseUrl.url}/master/rumah_sakit/data`,
          headers: {
            Authorization: 'Bearer ' + dataPribadi.token,
          },
          method: 'GET',
        });
        setSpecializations(response.data.data);
        const newFadeAnims = animateFadeIn(response.data.data.length);
        setFadeAnims(newFadeAnims);
        setIsLoading(false);
      } catch (error) {
        // console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dataPribadi.token]);

  const animateFadeIn = length => {
    const anims = [];
    for (let i = 0; i < length; i++) {
      const fadeAnim = new Animated.Value(0);
      anims.push(fadeAnim);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        delay: 1000 * i,
      }).start();
    }
    return anims;
  };

  const handleCardClick = async specialization => {
    setSelectedCard(specialization.nama_rs);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        specializations.map((specialization, index) => (
          <TouchableOpacity key={index} onPress={() => handleCardClick(specialization)}>
            <Animated.View style={[styles.card, { opacity: fadeAnims[index] }]}>
              <Text>{specialization.nama_rs}</Text>
            </Animated.View>
          </TouchableOpacity>
        ))
      )}
      {selectedCard && (
        <View style={styles.container}>

<TouchableOpacity onPress={handleCard1Click}>
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../../../assets/images/people.png')}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={{ marginLeft: 10 }}>Sule</Text>
            </View>
            <Animated.Text style={{ opacity: fadeAnim }}>
                Apakah Anda Ingin Bertanya Mengenai Jadwal Poliknik ?
            </Animated.Text>
          </Animated.View>
         
        </TouchableOpacity>
        {showPoliknikList && <JadwalPoliklinik />}
        </View>
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

export default JadwalRs;
