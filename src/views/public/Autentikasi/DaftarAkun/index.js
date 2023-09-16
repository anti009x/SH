import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import FormInput from '../../../../components/FormInput';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import { baseUrl, showSuccess, useForm } from '../../../../utils';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { configfirebase } from '../../../../firebase/firebaseConfig';
import Navigasi from '../../../../partials/navigasi';

const DaftarAkun = ({navigation}) => {

    const [form, setForm] = useForm({
        nik: '',
        nama: '',
        email: '',
        password: '',
        nomor_hp: '',
    });

    const dispatch = useDispatch();

    const daftarAkun = async () => {
        try {
            const datauser = await axios({
                url: `${baseUrl.url}/akun/konsumen`,
                method: "POST",
                data: {
                    nik: form.nik,
                    email: form.email,
                    nama: form.nama,
                    password: form.password,
                    nomor_hp: form.nomor_hp
                }
            });

            dispatch({ type: "SET_LOADING", value: true });

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

                    dispatch({ type: "SET_LOADING", value: false });

                    console.log(sukses.user.uid);
                    // showSuccess("Good Job, Daftar Berhasil", "Akun Anda Berhasil di Daftarkan");

                    navigation.navigate(Navigasi.LOGIN)
                })

        } catch (error) {
            console.log(error);
        }
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
                        <FormInput icon={"document-text-sharp"} placeholder="Masukkan E - Mail" value={form.email} placeholderTextColor={"grey"} onChangeText={value => setForm("email", value)} />
                        <FormInput icon={"eye"} placeholder="Masukkan Password" value={form.password} placeholderTextColor={"grey"} secureTextEntry={true} onChangeText={value => setForm("password", value)} />
                        <FormInput icon={"call"} placeholder="Masukkan Nomor HP" value={form.nomor_hp} placeholderTextColor={"grey"} keyBoardType="numeric" onChangeText={value => setForm("nomor_hp", value)} />
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