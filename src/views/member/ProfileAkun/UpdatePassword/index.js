import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import {colors, baseUrl, getData, useForm} from '../../../../utils';
import axios from 'axios';

const UpdatePassword = ({navigation}) => {
  const [dataPribadi, setDataPribadi] = useState({});

  const [form, setForm] = useForm({
    password: '',
    konfirmasi_pass: '',
  });

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
    });

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const simpanPassword = async () => {
    try {
      await axios({
        url: `${baseUrl.url}/akun/change_password`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'PUT',
        data: {
          password: form.password,
          konfirmasi_pass: form.konfirmasi_pass,
        },
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View style={styles.heading}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name="ios-arrow-back"
              style={{fontSize: 20, color: 'black'}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textHeading}>
          <Text style={{color: 'black'}}>Ubah Password</Text>
        </View>
      </View>
      <View style={{marginHorizontal: 10, marginVertical: 10}}>
        <Text style={{color: 'black', fontSize: 16}}>
          Isikan password baru dengan benar
        </Text>
        <View style={styles.cardContent}>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <View style={{marginVertical: 5}}>
              <Text style={{color: 'gray', fontSize: 16}}> Password Baru </Text>
              <View style={styles.viewTextInput}>
                <TextInput
                  placeholder="Masukkan Password Baru"
                  placeholderTextColor="gray"
                  secureTextEntry={true}
                  value={form.password}
                  onChangeText={value => setForm('password', value)}
                  style={{fontSize: 12, color: 'gray', paddingHorizontal: 10}}
                />
              </View>
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={{color: 'gray', fontSize: 16}}>
                Konfirmasi Password
              </Text>
              <View style={styles.viewTextInput}>
                <TextInput
                  placeholder="Masukkan Konfirmasi Password"
                  placeholderTextColor="gray"
                  secureTextEntry={true}
                  value={form.konfirmasi_pass}
                  onChangeText={value => setForm('konfirmasi_pass', value)}
                  style={{fontSize: 12, color: 'gray', paddingHorizontal: 10}}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.designButton}
            onPress={() => {
              simpanPassword();
            }}>
            <Text style={styles.textButton}>Simpan Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    backgroundColor: 'white',
    padding: 15,
    height: 50,
    elevation: 5,
    flexDirection: 'row',
  },
  textHeading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  cardContent: {
    backgroundColor: 'white',
    elevation: 5,
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
  viewTextInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    marginVertical: 5,
  },
  textButton: {
    color: 'black',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  designButton: {
    backgroundColor: colors.primary,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
});

export default UpdatePassword;
