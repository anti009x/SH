import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';

import FormInput from '../../../../components/FormInput';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import { baseUrl, useForm } from '../../../../utils'; 
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { configfirebase } from '../../../../firebase/firebaseConfig';
import React, { useState, useEffect } from 'react';
import Navigasi from '../../../../partials/navigasi';

const DaftarAkun = ({ navigation }) => {
  const [form, setForm] = useForm({
    nik: '',
    nama: '',
    email: '',
    password: '',
    nomor_hp: '',
    verificationCode: '',
  });

  const [showMessage, setShowMessage] = useState(null);
  const [isSuccessSend, setIsSuccessSend] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [countingDown, setCountingDown] = useState(false);

  useEffect(() => {
    let intervalId;
    if (countingDown && countdownTime > 0) {
      intervalId = setInterval(() => {
        setCountdownTime((time) => time - 1);
      }, 1000);
    } else if (countdownTime === 0) {
      setCountingDown(false);
    }
    return () => clearInterval(intervalId);
  }, [countingDown, countdownTime]);

  const sendEmailCode = async () => {
    setShowMessage(null);
    setIsSuccessSend(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      setShowMessage('Masukkan alamat email yang valid');
      return;
    }
    setShowMessage(null);
    try {
      const response = await axios.post(`${baseUrl.url}/send-otp-email`, {
        email: form.email,
      });
      const result = response.data;
      if (result.success == true) {
        setIsSuccessSend(true);
        setCountdownTime(30);
        setCountingDown(true);
      }
      setShowMessage(result.message);
    } catch (error) {
      // Handle error
    }
  };

  const sendCode = async () => {
    setShowMessage(null);
    setIsSuccessSend(false);

    const isNumeric = !isNaN(form.nomor_hp) && !isNaN(parseFloat(form.nomor_hp));
    if (!form.nomor_hp || !isNumeric) {
      setShowMessage('Nomor HP harus numerik');
      return;
    }
    try {
      const response = await axios.post(`${baseUrl.url}/send-otp-wa`, {
        to: form.nomor_hp,
      });
      const result = response.data;
      if (result.success == true) {
        setIsSuccessSend(true);
        setCountdownTime(30);
        setCountingDown(true);
      }
      setShowMessage(result.message);
    } catch (error) {
      // Handle error
    }
  };

  const dispatch = useDispatch();

  const daftarAkun = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.nik) {
      setShowMessage('Masukkan NIK');
      return;
  } else if (form.nik.length !== 16) {
      setShowMessage('NIK harus terdiri dari 16 digit');
      return;
    } else if (!form.nama) {
      setShowMessage('Masukkan Nama');
      return;
    } else if (!form.email || !emailRegex.test(form.email)) {
      setShowMessage('Masukkan Email Yang Valid');
      return;
    } else if (!form.password) {
      setShowMessage('Masukkan Password');
      return;
    } else if (!form.nomor_hp) {
      setShowMessage('Masukkan No.Hp');
      return;
    } else if (!form.verificationCode) {
      setShowMessage('Masukkan Kode Verifikasi Yang Valid');
      return;
    }

    let datas = {
      nik: form.nik,
      email: form.email,
      nama: form.nama,
      password: form.password,
      nomor_hp: form.nomor_hp,
      verification_code: form.verificationCode,
    };

    console.log(datas);
    try {
      const datauser = await axios({
        url: `${baseUrl.url}/akun/konsumen`,
        method: 'POST',
        data: datas,
      });

      console.log('response dari api: ', datauser.data);

      try {
        if (datauser.data.success == true) {
          const datakonsumen = {
            id_konsumen: datauser.data.konsumen_id,
            nik: form.nik,
            nomor_hp: form.nomor_hp,
            email: form.email,
            nama: form.nama,
          };

          configfirebase
            .database()
            .ref(`users/konsumen/`)
            .push(datakonsumen)
            .then((snapshot) => {
              const uid = snapshot.key;

              datakonsumen.uid = uid;

              axios({
                url: `${baseUrl.url}/akun/user/uid`,
                method: 'PUT',
                data: {
                  id: datauser.data.user,
                  uuid_firebase: uid,
                },
              });

              dispatch({ type: 'SET_LOADING', value: false });

              Alert.alert(
                'Sukses',
                'Data berhasil terkirim dan akun berhasil dibuat',
                [
                  { text: 'OK', onPress: () => navigation.navigate(Navigasi.LOGIN) },
                ]
              );

              console.log(uid);
            })
            .catch((error) => {
              console.error('Error pushing data to Firebase:', error.message);

              Alert.alert(
                'Kesalahan',
                'Terjadi kesalahan saat mengirim data ke Firebase.',
                [
                  { text: 'OK', onPress: () => console.log('OK ditekan') },
                ]
              );

              dispatch({ type: 'SET_LOADING', value: false });
            });
        } else {
          dispatch({ type: 'SET_LOADING', value: false });

          Alert.alert(
            'Kesalahan',
            'Terjadi kesalahan saat mengirim data check kode verifikasinya',
            [
              { text: 'OK', onPress: () => console.log('OK ditekan') },
            ]
          );
        }
      } catch (error) {
        console.error('Kesalahan:', error);

        Alert.alert(
          'Kesalahan',
          'Terjadi kesalahan saat mengirim data check kode verifikasinyaa',
          [
            { text: 'OK', onPress: () => console.log('OK ditekan') },
          ]
        );
      }
    } catch (error) {
      console.error('Error:', error);

      Alert.alert(
        'Kesalahan',
        'Terjadi kesalahan saat mengirim data ke server.',
        [
          { text: 'OK', onPress: () => console.log('OK ditekan') },
        ]
      );
    }
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBarComponent />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../../../assets/images/group-satu-new.png')} resizeMode="cover" style={{ height: 150, width: 150 }} />
        </View>
        <Text style={styles.textHeader}>Daftar Akun</Text>
        <Text style={styles.textSubHeader}>
          Silahkan daftarkan akun terlebih dahulu.
        </Text>
        <ScrollView>
          <View style={styles.viewCard}>
            <FormInput icon={'newspaper-sharp'} placeholder="Masukkan NIK" value={form.nik} keyBoardType="numeric" placeholderTextColor={'grey'} onChangeText={(value) => setForm('nik', value)} />
            <FormInput icon={'person'} placeholder="Masukkan Nama Lengkap" value={form.nama} placeholderTextColor={'grey'} onChangeText={(value) => setForm('nama', value)} />
            <FormInput icon={'document-text-sharp'} placeholder="Masukkan E - Mail" keyboardType="email-address" value={form.email} placeholderTextColor={'grey'} onChangeText={(value) => setForm('email', value)} />
            <FormInput icon={'eye'} placeholder="Masukkan Password" value={form.password} placeholderTextColor={'grey'} secureTextEntry={true} onChangeText={(value) => setForm('password', value)} />
            <FormInput icon={'call'} placeholder="Masukkan Nomor HP" value={form.nomor_hp} placeholderTextColor={'grey'} keyBoardType="numeric" onChangeText={(value) => setForm('nomor_hp', value)} />

            <Text style={styles.label}>Kode Verifikasi</Text>
            <FormInput
              style={styles.input}
              value={form.verificationCode}
              keyBoardType="numeric"
              placeholder="Masukkan kode verifikasi"
              onChangeText={(value) => setForm('verificationCode', value)} // Perbaiki typo di sini
            />
            {!countingDown ? (
              <TouchableOpacity onPress={sendCode} style={styles.buttonKirim}>
                <Text style={styles.buttonText}>Kirim</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.countdown}>Kirim Ulang ({countdownTime})</Text>
            )}
            {showMessage && <Text style={isSuccessSend ? styles.messageSuccess : styles.messageError}>{showMessage}</Text>}

            {!countingDown ? (
              <TouchableOpacity onPress={sendEmailCode}>
                <Text style={styles.linkText}>Kirim kode verifikasi ke email? Klik disini</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.countdown}>Kirim Ulang melalui Email ({countdownTime})</Text>
            )}

            <TouchableOpacity
              onPress={() => {
                daftarAkun();
              }}
              style={{
                marginTop: 10,
                paddingVertical: 10,
                backgroundColor: 'green',
                marginHorizontal: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Daftar Akun
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.replace(Navigasi.LOGIN);
            }}
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            <Text
              style={{
                color: 'blue',
                textDecorationLine: 'underline',
                textAlign: 'center',
              }}>
              Kembali Ke Halaman Login
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    marginLeft: 15,
    marginTop: 5,
    borderRadius: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    borderColor: '#7FFFD4',
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: '#ddd',
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  buttonKirim: {
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
  countdown: {
    color: 'grey',
    margin: 10,
  },
  messageSuccess: {
    color: 'green',
    margin: 10,
  },
  messageError: {
    color: 'red',
    margin: 10,
  },
  linkText: {
    color: 'blue',
    margin: 10,
    textDecorationLine: 'underline',
  },
  textHeader: {
    paddingHorizontal: 10,
    paddingTop: 10,
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
  textSubHeader: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Medium',
  },
  viewCard: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 5,
    borderRadius: 10,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default DaftarAkun;
