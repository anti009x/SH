import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, useForm } from '../../../../utils'
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import FormInput from '../../../../components/FormInput'
import Button from '../../../../components/Button'

const LupaPasswordAutentikasi = ({ navigation }) => {

    const [form, setForm] = useForm({
        password_lama: "",
        password_baru: "",
        konfirmasi_password: ""
    })

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Icon name="arrow-back" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.textheading}>
                    Lupa Password
                </Text>
            </View>
            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium', marginVertical: 10, fontWeight: 'bold', paddingHorizontal: 15 }}>
                Isikan Password Baru Anda Dengan Benar
            </Text>
            <View style={styles.content}>
                <FormInput
                    icon={"key"}
                    placeholder={"Masukkan Password Lama"}
                    placeholderTextColor={"grey"}
                    secureTextEntry={true}
                    value={form.password_lama}
                />
                <FormInput
                    icon={"key"}
                    placeholder={"Masukkan Password Baru"}
                    placeholderTextColor={"grey"}
                    secureTextEntry={true}
                    value={form.password_baru}
                />
                <FormInput
                    icon={"key"}
                    placeholder={"Masukkan Konfirmasi Password"}
                    placeholderTextColor={"grey"}
                    secureTextEntry={true}
                    value={form.konfirmasi_password}
                />
                <View style={{marginHorizontal: 10, marginVertical: 5}}>
                    <Button onpress={() => {
                        console.log("Klik Saya")
                    }} textbutton={"Simpan"} />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.backgroundPutih
    },
    heading: {
        backgroundColor: colors.backgroundPutih,
        elevation: 5,
        height: 50,
        padding: 15,
        flexDirection: 'row'
    },

    icon: {
        color: 'black',
        fontSize: 20
    },

    textheading: {
        color: 'black',
        fontSize: 14,
        marginLeft: 10,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold'
    },

    content: {
        marginHorizontal: 15,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        paddingVertical: 10
    }
})

export default LupaPasswordAutentikasi
