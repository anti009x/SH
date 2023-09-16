import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { baseUrl, colors, showError, showSuccess, storeData } from '../../../../utils';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import FormInput from '../../../../components/FormInput';
import Navigasi from '../../../../partials/navigasi';
import axios from 'axios';
import { configfirebase } from '../../../../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

    const [form, setForm] = useState({
        nomor_hp: "",
        password: ""
    });

    const [error, setError] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const dispatch = useDispatch();

    const handleInputChange = (value) => {
        setForm({ ...form, nomor_hp: value });
        if (value === "") {
            setError("Nomor HP Tidak Boleh Kosong");
        } else {
            setError("");
        }
    }

    const handleInputPassword = (value) => {
        setForm({ ...form, password: value });
        if (value === "") {
            setErrorPassword("Password Tidak Boleh Kosong");
        } else {
            setErrorPassword("");
        }
    }

    const loginUser = async () => {
        if (form.nomor_hp.trim() === "" && form.password.trim() === "") {
            setError("Nomor HP Tidak Boleh Kosong");
            setErrorPassword("Password Tidak Boleh Kosong");
            return;
        } else {
            if (form.nomor_hp.trim() === "") {
                setError("Nomor HP Tidak Boleh Kosong");
                return;
            } else if (form.password.trim() === "") {
                setErrorPassword("Password Tidak Boleh Kosong");
                return;
            }
        }

        setError("");
        setErrorPassword("");

        dispatch({
            type: 'SET_LOADING',
            value: true
        });

        try {
            const { data } = await axios({
                url: `${baseUrl.url}/autentikasi/login`,
                method: "POST",
                data: {
                    nomor_hp: form.nomor_hp,
                    password: form.password
                }
            });

            const datauser = {
                idx: data.data.id,
                nama: data.data.nama,
                email: data.data.email,
                nomor_hp: data.data.nomor_hp,
                token: data.data.token,
                role: data.data.id_role,
                uuid_firebase: data.data.uuid_firebase
            }

            if (data.message == "Berhasil Login") {

                if (data.data.id_role == "RO-2003062") {

                    const getProfile = async () => {
                        try {
                            const profileDokter = await axios({
                                url: `${baseUrl.url}/akun/profil/dokter/profil`,
                                headers: {
                                    Authorization: 'Bearer ' + datauser.token
                                },
                                method: "GET"
                            });

                            return profileDokter.data;

                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const createFirebaseUser = async (email, password) => {
                        try {
                            const sukses = await configfirebase.auth().createUserWithEmailAndPassword(email, password);
                            return sukses.user.uid;
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const updateFirebaseUid = async (userId, uid) => {
                        try {
                            await axios({
                                url: `${baseUrl.url}/akun/user/uid`,
                                headers: {
                                    Authorization: 'Bearer ' + datauser.token
                                },
                                method: "PUT",
                                data: {
                                    id: userId,
                                    uuid_firebase: uid
                                }
                            });
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const saveDoctorData = async (uid, doctorData) => {
                        try {
                            await configfirebase.database().ref(`users/ahli/${uid}`).set(doctorData);
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const loginFirebase = async (email, password) => {
                        try {
                            const responseberhasil = await configfirebase.auth().signInWithEmailAndPassword(email, password);
                            return responseberhasil.user.uid;
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const getUserData = async (uid) => {
                        try {
                            const responsedatabase = await configfirebase.database().ref(`users/ahli/${uid}`).once('value');
                            return responsedatabase.val();
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const loginSuccess = () => {
                        dispatch({ type: "SET_LOADING", value: false })
                        showSuccess("Good Job, Login Success", "Anda Berhasil Login");
                        storeData("isLoggedIn", "true");
                        setForm("reset");
                        navigation.navigate(Navigasi.MAIN_DOKTER);
                    }

                    if (datauser.uuid_firebase == null) {
                        try {
                            const profildokter = await getProfile();
                            const sukses = await createFirebaseUser(datauser.email, form.password);
                            const dokterdata = {
                                nomor_str: profildokter.data.nomor_str,
                                nomor_hp: profildokter.data.user.nomor_hp,
                                email: profildokter.data.user.email,
                                nama: profildokter.data.user.nama,
                                uid: sukses,
                                akses: "dokter"
                            };
                            await updateFirebaseUid(profildokter.data.user.id, sukses);
                            await saveDoctorData(sukses, dokterdata);
                            const responseberhasil = await loginFirebase(datauser.email, form.password);
                            const userData = await getUserData(responseberhasil);
                            storeData("user", userData);
                            storeData("dataUser", {
                                idx: datauser.idx,
                                nama: datauser.nama,
                                email: datauser.email,
                                nomor_hp: datauser.nomor_hp,
                                token: datauser.token,
                                role: datauser.role,
                                uuid_firebase: sukses
                            });
                            loginSuccess();
                        } catch (error) {
                            throw error;
                        }
                    } else {
                        try {
                            const responseberhasil = await loginFirebase(datauser.email, form.password);
                            const userData = await getUserData(responseberhasil);
                            storeData("user", userData);
                            storeData("dataUser", datauser);
                            loginSuccess();
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                } else if (data.data.id_role == "RO-2003063") {

                    const getProfile = async () => {
                        try {
                            const profilePerawat = await axios({
                                url: `${baseUrl.url}/akun/profil/perawat/profil`,
                                headers: {
                                    Authorization: 'Bearer ' + datauser.token
                                },
                                method: "GET"
                            });

                            return profilePerawat.data;

                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const createFirebaseUser = async (email, password) => {
                        try {
                            const sukses = await configfirebase.auth().createUserWithEmailAndPassword(email, password);
                            return sukses.user.uid;
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const updateFirebaseUid = async (userId, uid) => {
                        try {
                            await axios({
                                url: `${baseUrl.url}/akun/user/uid`,
                                headers: {
                                    Authorization: 'Bearer ' + datauser.token
                                },
                                method: "PUT",
                                data: {
                                    id: userId,
                                    uuid_firebase: uid
                                }
                            });
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const savePerawatData = async (uid, perawatData) => {
                        try {
                            await configfirebase.database().ref(`users/ahli/${uid}`).set(perawatData);
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const loginFirebase = async (email, password) => {
                        try {
                            const responseberhasil = await configfirebase.auth().signInWithEmailAndPassword(email, password);
                            return responseberhasil.user.uid;
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const getUserData = async (uid) => {
                        try {
                            const responsedatabase = await configfirebase.database().ref(`users/ahli/${uid}`).once('value');
                            return responsedatabase.val();
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const loginSuccess = () => {
                        dispatch({ type: "SET_LOADING", value: false })
                        showSuccess("Good Job, Login Success", "Anda Berhasil Login");
                        storeData("isLoggedIn", "true");
                        setForm("reset");
                        navigation.navigate(Navigasi.MAIN_PERAWAT);
                    }

                    if (datauser.uuid_firebase == null) {
                        try {
                            const profileperawat = await getProfile();
                            const sukses = await createFirebaseUser(datauser.email, form.password);
                            const perawatdata = {
                                nomor_strp: profileperawat.data.nomor_strp,
                                nomor_hp: profileperawat.data.user.nomor_hp,
                                email: profileperawat.data.user.email,
                                nama: profileperawat.data.user.nama,
                                uid: sukses,
                                akses: "perawat"
                            };
                            await updateFirebaseUid(profileperawat.data.user.id, sukses);
                            await savePerawatData(sukses, perawatdata);
                            const responseberhasil = await loginFirebase(datauser.email, form.password);
                            const userData = await getUserData(responseberhasil);
                            storeData("user", userData);
                            storeData("dataUser", {
                                idx: datauser.idx,
                                nama: datauser.nama,
                                email: datauser.email,
                                nomor_hp: datauser.nomor_hp,
                                token: datauser.token,
                                role: datauser.role,
                                uuid_firebase: sukses
                            });
                            loginSuccess();
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    } else {
                        try {
                            const responseberhasil = await loginFirebase(datauser.email, form.password);
                            const userData = await getUserData(responseberhasil);
                            storeData("user", userData);
                            storeData("dataUser", datauser);
                            loginSuccess();
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                } else if (data.data.id_role == "RO-2003064") {

                    const loginFirebase = async (email, password) => {
                        try {
                            const responseberhasil = await configfirebase.auth().signInWithEmailAndPassword(email, password);
                            return responseberhasil.user.uid;
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const getUserData = async (uid) => {
                        try {
                            const responsedatabase = await configfirebase.database().ref(`users/konsumen/${uid}`).once('value');
                            return responsedatabase.val();
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }

                    const loginSuccess = () => {
                        dispatch({ type: "SET_LOADING", value: false })
                        showSuccess("Good Job, Login Success", "Anda Berhasil Login");
                        storeData("isLoggedIn", "true");
                        setForm("reset");
                        navigation.navigate(Navigasi.MAIN_APP);
                    }

                    try {
                        const responseberhasil = await loginFirebase(datauser.email, form.password);
                        const userData = await getUserData(responseberhasil);
                        storeData("user", userData);
                        storeData("dataUser", datauser);
                        loginSuccess();
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }

                } else {
                    dispatch({ type: "SET_LOADING", value: false });
                    showError("Maaf, Anda Tidak Memiliki Akses");
                }
            }

        } catch (error) {
            dispatch({ type: 'SET_LOADING', value: false });
            showError("Maaf, Data Anda Tidak Ditemukan");
        }
    }

    return (
        <>
            <View style={styles.background}>
                <StatusBarComponent />

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../../../../assets/images/group-satu-new.png")} resizeMode='cover' style={{ width: 150, height: 150 }} />
                </View>

                <Text style={styles.textHeader}> Login Aplikasi</Text>
                <Text style={styles.textSubHeader}>
                    Silahkan Login Terlebih Dahulu Untuk Memulai Program.
                </Text>
                <ScrollView>
                    <View style={styles.viewCard}>
                        <FormInput
                            icon={"call"}
                            placeholder={"Masukkan Nomor HP"}
                            placeholderTextColor={"grey"}
                            keyBoardType={"numeric"}
                            value={form.nomor_hp}
                            onChangeText={handleInputChange}
                        />
                        {error != '' &&
                            <View style={{ marginHorizontal: 10, marginBottom: 5 }}>
                                <Text style={styles.textError}>
                                    * {error}
                                </Text>
                            </View>
                        }
                        <FormInput
                            icon={"eye"}
                            placeholder={"Masukkan Password"}
                            placeholderTextColor={"grey"}
                            secureTextEntry={true}
                            value={form.password}
                            onChangeText={handleInputPassword}
                        />
                        {errorPassword != '' &&
                            <View style={{ marginHorizontal: 10, marginBottom: 5 }}>
                                <Text style={styles.textError}>
                                    * {errorPassword}
                                </Text>
                            </View>
                        }
                        <TouchableOpacity onPress={() => {
                            loginUser()
                        }} style={styles.button}>
                            <Text style={styles.textbutton}>
                                Login
                            </Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 10, flex: 1, alignItems: 'flex-start' }}
                                onPress={() => {
                                    navigation.navigate(Navigasi.DAFTAR_AKUN_KONSUMEN)
                                }}>
                                <Text style={{ color: 'blue' }}>
                                    Daftar Disini
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ paddingTop: 10 }} onPress={() => {
                                navigation.navigate(Navigasi.LUPA_PASSWORD_AUTENTIKASI)
                            }}>
                                <View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
                                    <Text style={{ color: 'red', fontSize: 14 }}>
                                        Lupa Password ?
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.backgroundPutih
    },

    textHeader: {
        paddingTop: 10,
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium'
    },

    textError: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poppins-Medium'
    },

    textSubHeader: {
        color: 'black',
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 10,
        marginVertical: 5
    },

    viewCard: {
        backgroundColor: 'white',
        height: 300,
        marginHorizontal: 10,
        marginTop: 10,
        elevation: 5,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 10
    },

    button: {
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: 'green',
        marginHorizontal: 10,
        borderRadius: 10
    },

    textbutton: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Login;