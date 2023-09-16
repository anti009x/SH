import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {colors} from '../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../partials/navigasi';

const EditProfilDokter = ({navigation}) => {
  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Navigasi.PROFILE_DOKTER);
          }}>
          <Icon name="arrow-back" style={styles.icon} />
        </TouchableOpacity>
        <Text style={{color: 'black'}}>Edit Profil</Text>
      </View>
      <ScrollView>
        <Text
          style={{
            color: 'black',
            fontSize: 12,
            marginHorizontal: 10,
            marginVertical: 5,
          }}>
          Informasi Umum
        </Text>
        <View style={{backgroundColor: 'white', paddingHorizontal: 10}}>
          <View>
            <Text style={styles.textTitle}>NIP</Text>
            <TextInput
              placeholder="Masukkan NIP"
              placeholderTextColor={'gray'}
              style={styles.textInput}
            />
          </View>
          <View>
            <Text style={styles.textTitle}>Nama Lengkap</Text>
            <TextInput
              placeholder="Masukkan Nama Lengkap"
              placeholderTextColor={'gray'}
              style={styles.textInput}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={styles.textTitle}>E - Mail</Text>
            <TextInput
              placeholder="Masukkan E - Mail"
              placeholderTextColor={'gray'}
              style={styles.textInput}
            />
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 12,
            marginHorizontal: 10,
            marginVertical: 5,
          }}>
          Informasi Umum Detail
        </Text>
        <View style={{backgroundColor: 'white', paddingHorizontal: 10}}>
          <View>
            <Text style={styles.textTitle}>Nomor STR</Text>
            <TextInput
              placeholder="Masukkan Nomor STR"
              placeholderTextColor={'gray'}
              style={styles.textInput}
            />
          </View>
          <View>
            <Text style={styles.textTitle}>Nomor Handphone</Text>
            <TextInput
              placeholder="Masukkan Nomor Handphone"
              placeholderTextColor={'gray'}
              style={styles.textInput}
            />
          </View>
          <View>
            <Text style={styles.textTitle}>Jenis Kelamin</Text>
            <TextInput
              placeholder="Masukkan Nama Lengkap"
              placeholderTextColor={'gray'}
              style={styles.textInput}
            />
          </View>
          <View>
            <Text style={styles.textTitle}>Tempat Lahir</Text>
            <TextInput
              placeholder="Masukkan Tempat Lahir"
              placeholderTextColor={'gray'}
              style={styles.textInput}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={styles.textTitle}>Tanggal Lahir</Text>
            <TextInput
              placeholder="Masukkan Tanggal Lahir"
              placeholderTextColor={'gray'}
              style={styles.textInput}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: 'green',
          paddingVertical: 15,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14, textAlign: 'center'}}>
          Simpan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.backgroundCardChildren,
  },
  heading: {
    padding: 10,
    height: 50,
    backgroundColor: colors.backgroundPutih,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: 'black',
    marginRight: 10,
  },
  content: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  textTitle: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    fontSize: 12,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Medium',
    color: 'gray',
  },
});

export default EditProfilDokter;
