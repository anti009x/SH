import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import Navigasi from '../../../partials/navigasi';
import { colors } from "../../../utils/colors"

const OptionsAutentikasi = ({ navigation }) => {
  return (
    <View>
      <ImageBackground resizeMode='cover' source={require("../../../assets/images/walpaper.jpg")} style={styles.backgroundimage} />
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Navigasi.LOGIN);
          }}
          style={{
            backgroundColor: 'green',
            marginHorizontal: 20,
            padding: 10,
            width: '80%',
            borderRadius: 10
          }}>
          <Text
            style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
            Masuk
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate(Navigasi.MAIN_APP);
          }}
          style={{
            backgroundColor: 'green',
            marginHorizontal: 20,
            borderColor: 'white',
            borderWidth: 1,
            marginTop: 10,
            padding: 10,
            borderRadius: 10,
            width: '80%'
          }}>
          <Text
            style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
            Login Sebagai Tamu
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundimage: {
    width: '100%',
    height: '100%',
    opacity: 1
  },

  content: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50
  }
});

export default OptionsAutentikasi;
