import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';

// JadwalDokter.js

const { width } = Dimensions.get('window');

const JadwalDokter = () => {
  const fadeAnim1 = useState(new Animated.Value(0))[0];
  const fadeAnim2 = useState(new Animated.Value(0))[0];
  const fadeAnim3 = useState(new Animated.Value(0))[0];
  const fadeAnim4 = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.stagger(500, [
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim4, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true
      })
    ]).start();
  }, [fadeAnim1, fadeAnim2, fadeAnim3, fadeAnim4]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { opacity: fadeAnim1, marginBottom: 10 }]}>
        <Text>dr. Ali Shahab Sp.BS (Selasa) 9:30-11:30 WIB</Text>
      </Animated.View>

      <Animated.View style={[styles.card, { opacity: fadeAnim2, marginBottom: 10 }]}>
        <Text>dr. Abdi Kelana, Sp.M (Selasa-Sabtu) 16:00 WIB</Text>
      </Animated.View>

      <Animated.View style={[styles.card, { opacity: fadeAnim3, marginBottom: 10 }]}>
        <Text>dr. Haken Tennizar Toena, Sp.DV (Selasa-Kamis) 12:00 WIB</Text>
      </Animated.View>
      
      <Animated.View style={[styles.card, { opacity: fadeAnim4, marginBottom: 10 }]}>
        <Text>dr. Joko Purnomo Heroanto, Sp.A, CIMI, CBATR(Selasa-Sabtu) 10:00-13:00 WIB</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10, // Padding added to space between cards and screen edge
  },
  card: {
  
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: (width - 40) / 3.2, // Adjusted width for 3 cards in a row with some margin
  },
});

export default JadwalDokter;
