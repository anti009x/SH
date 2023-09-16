import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Heading from "../../../../components/Heading"

const LanjutkanPembayaranKonsultasi = ({ navigation, route }) => {

    const ahli = route.params;

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading textHeading={"Detail Pembayaran Konsultasi"} navigasi={() => navigation.goBack()} />
            <View style={styles.content}>
                <Image source={require("../../../../assets/images/background-doctor.png")} resizeMode='cover' style={{ height: 50, width: 50, borderColor: 'black', borderWidth: 1, borderRadius: 50 }} />
                <View style={{flex: 1, marginHorizontal: 10}}>
                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                        Dr. Hamdan
                    </Text>
                    <Text style={{ color: 'gray', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
                        085324237299
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },

    content: {
        backgroundColor: 'white',
        elevation: 5,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row'
    }
});

export default LanjutkanPembayaranKonsultasi;