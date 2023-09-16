import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors, getData } from '../../../../utils'
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent'
import Heading from '../../../../components/Heading'
import { configfirebase } from '../../../../firebase/firebaseConfig'

const TambahRekomendasi = ({ navigation }) => {

    const [user, setUser] = useState({});
    const [dataPribadi, setDataPribadi] = useState({});
    const [historyChat, setHistoryChat] = useState([]);
    const [showIndicator, setShowIndicator] = useState(false);

    useEffect(() => {
        getDataUserLocal();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('user').then(res => {
            setUser(res);
        });
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const rootDB = configfirebase.database().ref();
    const urlHistory = `messages/DKTR-09022003`;
    const messagesDB = rootDB.child(urlHistory);

    setShowIndicator(true);
    messagesDB.on('value', snapshot => {
        if (snapshot.val()) {
            const oldData = snapshot.val();
            const data = [];

            Object.keys(oldData).map(key => {
                data.push({
                    id: key,
                    ...oldData[key],
                });
            });

            setTimeout(() => {
                setShowIndicator(false);
                setHistoryChat(data);
            }, 1000);
        } else {
            setTimeout(() => {
                setOutput(true);
                setShowIndicator(false);
            }, 1000);
        }
    });

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading navigasi={() => {
                navigation.goBack()
            }} textHeading={"Data Pasien"} />
            <View style={styles.content}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 16 }}>
                    Belum Ada List Data Pasien
                </Text>
                <Text style={{ color: 'gray', fontSize: 14, fontFamily: 'Poppins-Medium', textAlign: 'center' }}>
                    Sepertinya Anda Belum Mendapatkan Pasien Belakangan Ini.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.backgroundPutih
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default TambahRekomendasi;