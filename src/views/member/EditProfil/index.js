import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import Navigasi from '../../../partials/navigasi';

const EditProfil = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBarComponent />
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          height: 50,
          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.MAIN_APP);
            }}>
            <Icon
              name="ios-arrow-back"
              style={{color: 'black', fontSize: 20}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 10,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Edit Profil</Text>
        </View>
      </View>
      <ScrollView>
        <Text
          style={{
            color: 'black',
            paddingLeft: 15,
            fontSize: 12,
            paddingTop: 10,
          }}>
          Informasi Umum
        </Text>
        <View
          style={{
            height: 250,
            backgroundColor: 'white',
            marginVertical: 10,
          }}>
          <View style={{marginVertical: 5, marginHorizontal: 15}}>
            <Text style={{color: 'gray'}}>Nama Lengkap</Text>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor="gray"
                style={{
                  color: 'black',
                  fontSize: 12,
                  paddingHorizontal: 10,
                  height: 40,
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 5, marginHorizontal: 15}}>
            <Text style={{color: 'gray'}}>Tanggal Lahir</Text>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor="gray"
                style={{
                  color: 'black',
                  fontSize: 12,
                  paddingHorizontal: 10,
                  height: 40,
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 5, marginHorizontal: 15}}>
            <Text style={{color: 'gray'}}>Jenis Kelamin</Text>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor="gray"
                style={{
                  color: 'black',
                  fontSize: 12,
                  paddingHorizontal: 10,
                  height: 40,
                }}
              />
            </View>
          </View>
        </View>
        <Text style={{color: 'black', paddingLeft: 15, fontSize: 12}}>
          Informasi Kontak
        </Text>
        <View
          style={{
            height: 250,
            backgroundColor: 'white',
            marginVertical: 10,
          }}>
          <View style={{marginVertical: 5, marginHorizontal: 15}}>
            <Text style={{color: 'gray'}}>Nama Lengkap</Text>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor="gray"
                style={{
                  color: 'black',
                  fontSize: 12,
                  paddingHorizontal: 10,
                  height: 40,
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 5, marginHorizontal: 15}}>
            <Text style={{color: 'gray'}}>Tanggal Lahir</Text>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor="gray"
                style={{
                  color: 'black',
                  fontSize: 12,
                  paddingHorizontal: 10,
                  height: 40,
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 5, marginHorizontal: 15}}>
            <Text style={{color: 'gray'}}>Jenis Kelamin</Text>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor="gray"
                style={{
                  color: 'black',
                  fontSize: 12,
                  paddingHorizontal: 10,
                  height: 40,
                }}
              />
            </View>
          </View>
        </View>
        <Text style={{color: 'black', paddingLeft: 15, fontSize: 12}}>
          Informasi Kontak
        </Text>
        <View
          style={{
            height: 250,
            backgroundColor: 'white',
            marginVertical: 10,
          }}>
          <View style={{marginVertical: 5, marginHorizontal: 15}}>
            <Text style={{color: 'gray'}}>Nama Lengkap</Text>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor="gray"
                style={{
                  color: 'black',
                  fontSize: 12,
                  paddingHorizontal: 10,
                  height: 40,
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 5, marginHorizontal: 15}}>
            <Text style={{color: 'gray'}}>Tanggal Lahir</Text>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor="gray"
                style={{
                  color: 'black',
                  fontSize: 12,
                  paddingHorizontal: 10,
                  height: 40,
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 5, marginHorizontal: 15}}>
            <Text style={{color: 'gray'}}>Jenis Kelamin</Text>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor="gray"
                style={{
                  color: 'black',
                  fontSize: 12,
                  paddingHorizontal: 10,
                  height: 40,
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.backgroundButton}>
        <TouchableOpacity style={styles.buttonSimpan}>
          <Text style={styles.textButton}>Simpan Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundButton: {
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  buttonSimpan: {
    backgroundColor: 'blue',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfil;
