import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Navigasi from '../../../partials/navigasi';
import { getData, baseUrl } from '../../../utils';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(async () => {
      getData('dataUser')
        .then(response => {
          console.log(response);
          if (response == undefined) {
            navigation.navigate(Navigasi.OPTIONS_AUTENTIKASI);
          } else if (response != undefined) {
            if (response.role == 'RO-2003062') {
              navigation.replace(Navigasi.MAIN_DOKTER);
            } else if (response.role == 'RO-2003064') {
              navigation.replace(Navigasi.MAIN_APP);
            } else if (response.role == "RO-2003063") {
              navigation.replace(Navigasi.MAIN_PERAWAT)
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, 3000);
  });

  return (
    <View style={styles.background}>
      <StatusBarComponent />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require("../../../assets/images/group-satu-new.png")} style={{ width: 150, height: 150 }} />
        <Text style={styles.title}>
          Solusi Kesehatan Anda
        </Text>
        <Text style={styles.subtitle}>
          " Melayani Konsultasi dan Reservasi Secara Online "
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#051f84'
  },

  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Poppins-Medium'
  },

  subtitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium'
  }
});

export default Splash;
