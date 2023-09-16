import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RingkasanPembayaranKonsultasi = ({navigation}) => {
  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" style={{fontSize: 20, color: 'black'}} />
        </TouchableOpacity>
        <Text style={styles.textHeading}>Ringkasan Pembayaran</Text>
      </View>
      <View style={{flex: 15}}>
        <ScrollView>
          <View style={{backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 10, elevation: 5, marginTop: 5, marginBottom: 5}}>
            <Text style={{color: 'grey', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Medium'}}>Konsultasi Untuk</Text>
            <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium'}}>Mohammad Ilham Teguhriyadi</Text>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: 'green',
          marginHorizontal: 10,
          marginVertical: 10,
          borderRadius: 10,
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
            BAYAR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: 'white',
  },

  heading: {
    height: 50,
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textHeading: {
    color: 'black',
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
  },
});

export default RingkasanPembayaranKonsultasi;
