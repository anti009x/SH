import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image,Alert } from 'react-native'

import FormInput from '../../../../components/FormInput';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import { baseUrl, showSuccess, useForm } from '../../../../utils';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { configfirebase } from '../../../../firebase/firebaseConfig';
import Navigasi from '../../../../partials/navigasi';
import React, { useState, useEffect } from 'react';
const DaftarAkun = ({navigation}) => {

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
        // 07/11/23 - ngerefresh message otp
        setShowMessage(null);
        setIsSuccessSend(false);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email || !emailRegex.test(form.email)) {
          setShowMessage("Masukkan alamat email yang valid");
          return;
        }
        setShowMessage(null);
        try {
          const response = await axios.post(`${baseUrl.url}/send-otp-email`, {
            email: form.email,
          });
          const result = response.data;
          console.log('result send otp email: ', result);
          // console.log(result.success)
          // 07/11/23 - kalo success ngirim otp, font messagenya warna ijo
          if (result.success == true) {
            setIsSuccessSend(true);
      
            // 07/11/23 - skrg countdown jalan cuma pas sukses ngirim otp
            setCountdownTime(30);
            setCountingDown(true);
          }
      
          setShowMessage(result.message);
      
        } catch (error) {
          // Handle error
        }
      };
      
      const sendCode = async () => {
        //07/11/23 - ngerefresh message otp
        setShowMessage(null);
        setIsSuccessSend(false);

        // Pastikan bahwa nomor HP adalah numerik
     const isNumeric = !isNaN(form.nomor_hp) && !isNaN(parseFloat(form.nomor_hp));
     if (!form.nomor_hp || !isNumeric) {
       // Handle error jika nomor HP tidak ada atau bukan numerik
       setShowMessage("Nomor HP harus numerik");
       return;
         }
         try {
           const response = await axios.post(`${baseUrl.url}/send-otp-wa`, {
             to: form.nomor_hp,
             // user_id: 'user_id', // Harus diisi dengan user_id yang sesuai
           });
           const result = response.data;
           console.log('result send otp wa: ',result)
          //  console.log(result.success)

           //07/11/23 - kalo success ngirim otp, font messagenya warna ijo
           if (result.success == true){
            setIsSuccessSend(true);

            // 07/11/23 - skrg countdown jalan cuma pas sukses ngirim otp
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
        setShowMessage("Masukkan NIK");
        return;
      } else if (!form.nama) {
        setShowMessage("Masukkan Nama");
        return;
      }else if (!form.email || !emailRegex.test(form.email)) {
        setShowMessage("Masukan Email Yang Valid");
        return;
      }else if (!form.password) {
        setShowMessage("Masukkan Password");
        return;
      }else if (!form.nomor_hp) {
        setShowMessage("Masukkan No.Hp");
        return;
      }else if (!form.verificationCode) {
        setShowMessage("Masukan Kode Verifikasi Yang Valid");
        return;
      }
   

      let datas = {
        nik: form.nik,
        email: form.email,
        nama: form.nama,
        password: form.password,
        nomor_hp: form.nomor_hp,


        verification_code: form.verificationCode, // ---> biang keroknya di sini: parameter apinya 'verification_code' bukan 'verificationCode', untuk input fieldnya aman
      // ^^^^^^^^^^^^^^^^
    };

    console.log(datas)
    try {
      const datauser = await axios({
        url: `${baseUrl.url}/akun/konsumen`,
        method: "POST",
        data: datas
      });
    
      console.log("response dari api: ", datauser.data);
    
      if (datauser.data.success == true) {
        // Sukses mengirim data ke API
        configfirebase.auth()
          .createUserWithEmailAndPassword(form.email, form.password)
          .then(async (sukses) => {
            const datakonsumen = {
              id_konsumen: datauser.data.konsumen_id,
              nik: form.nik,
              nomor_hp: form.nomor_hp,
              email: form.email,
              nama: form.nama,
              uid: sukses.user.uid
            }
    
            await axios({
              url: `${baseUrl.url}/akun/user/uid`,
              method: "PUT",
              data: {
                id: datauser.data.user,
                uuid_firebase: datakonsumen.uid
              }
            })
    
            configfirebase.database()
              .ref(`users/konsumen/` + sukses.user.uid + "/")
              .set(datakonsumen)
    
            // Matikan loading setelah operasi selesai
            dispatch({ type: "SET_LOADING", value: false });
    
            // Tampilkan alert sukses dengan informasi tambahan
            Alert.alert(
              'Sukses',
              'Data berhasil terkirim dan akun berhasil dibuat',
              [
                { text: 'OK', onPress: () => navigation.navigate(Navigasi.LOGIN) }
              ]
            );
    
            console.log(sukses.user.uid);
          })
          .catch((error) => {
            // Tangkap kesalahan jika ada
            console.error('Kesalahan saat membuat akun Firebase:', error);
            // Tampilkan alert kesalahan jika diperlukan
            Alert.alert(
              'Kesalahan',
              'Terjadi kesalahan saat membuat akun Firebase Emailnya Sudah Terdaftar Sebelumnya',
              [
                { text: 'OK', onPress: () => console.log('OK ditekan') }
              ]
            );
            // Matikan loading jika ada kesalahan
            dispatch({ type: "SET_LOADING", value: false });
          });
      } else {
        // Data tidak berhasil terkirim ke API
        // Matikan loading jika data tidak berhasil terkirim
        dispatch({ type: "SET_LOADING", value: false });
        // Tampilkan alert kesalahan jika data tidak berhasil terkirim
        Alert.alert(
          'Kesalahan',
          'Terjadi kesalahan saat mengirim data check kode verifikasinya',
          [
            { text: 'OK', onPress: () => console.log('OK ditekan') }
          ]
        );
      }
    } catch (error) {
      // Tangkap kesalahan jika ada
      console.error('Kesalahan:', error);
      // Tampilkan alert kesalahan jika diperlukan
      Alert.alert(
        'Kesalahan',
        'Terjadi kesalahan saat mengirim data check kode verifikasinyaa',
        [
          { text: 'OK', onPress: () => console.log('OK ditekan') }
        ]
      );
    };
  }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBarComponent />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require("../../../../assets/images/group-satu-new.png")} resizeMode='cover' style={{height: 150, width: 150}} />
                </View>
                <Text style={styles.textHeader}>Daftar Akun</Text>
                <Text style={styles.textSubHeader}>
                    Silahkan daftarkan akun terlebih dahulu.
                </Text>
                <ScrollView>
                    <View style={styles.viewCard}>
                        <FormInput icon={"newspaper-sharp"} placeholder="Masukkan NIK" value={form.nik} keyBoardType='numeric' placeholderTextColor={"grey"} onChangeText={value => setForm("nik", value)} />
                        <FormInput icon={"person"} placeholder="Masukkan Nama Lengkap" value={form.nama} placeholderTextColor={"grey"} onChangeText={value => setForm("nama", value)} />
                        <FormInput icon={"document-text-sharp"} placeholder="Masukkan E - Mail" keyboardType="email-address" value={form.email} placeholderTextColor={"grey"} onChangeText={value => setForm("email", value)} />
                        <FormInput icon={"eye"} placeholder="Masukkan Password" value={form.password} placeholderTextColor={"grey"} secureTextEntry={true} onChangeText={value => setForm("password", value)} />
                        <FormInput icon={"call"} placeholder="Masukkan Nomor HP" value={form.nomor_hp} placeholderTextColor={"grey"} keyBoardType="numeric" onChangeText={value => setForm("nomor_hp", value)} />
                     
                        <Text style={styles.label}>Kode Verifikasi</Text>
            <FormInput
  style={styles.input}
  value={form.verificationCode}
  keyBoardType="numeric"
  placeholder="Masukkan kode verifikasi"
  onChangeText={value => setForm("verificationCode", value)} // Perbaiki typo di sini
/>
            {!countingDown ? (
              <TouchableOpacity onPress={sendCode} style={styles.buttonKirim}>
                <Text style={styles.buttonText}>Kirim</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.countdown}>Kirim Ulang ({countdownTime})</Text>
            )}
            {showMessage && <Text style={isSuccessSend ? styles.messageSuccess : styles.messageError}>{showMessage}</Text>}

            {/* Link to send verification code to email */}
            
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
        fontSize:15,
        borderColor:'#7FFFD4',
      },
      input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        borderColor: '#ddd',
        fontFamily: 'Poppins-Medium',
        fontSize:13,
       
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
        fontFamily: 'Poppins-Medium'
    },
    textSubHeader: {
        color: 'black',
        textAlign: 'center',
        fontSize: 12,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-Medium'
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