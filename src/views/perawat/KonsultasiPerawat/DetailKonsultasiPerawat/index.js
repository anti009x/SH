import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors, baseUrl, getData, getChatTime, setDateChat } from '../../../../utils';
import { configfirebase } from '../../../../firebase/firebaseConfig';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import InputChat from "../../../../components/InputChat"
import ChatItem from "../../../../components/ChatItem"

const DetailKonsultasiPerawat = ({ route, navigation }) => {

    const getkonsumen = route.params;

    const [chatContent, setChatContent] = useState('');
    const [chatData, setChatData] = useState([]);
    const [user, setUser] = useState({});
    const [dataPribadi, setDataPribadi] = useState({});
    const [pesanStatus, setPesanStatus] = useState(null);
    const [showIndicator, setShowIndicator] = useState(true);

    useEffect(() => {
        getDataUserLocal();
        const urlfirebase = `chatting/${getkonsumen.uidPartner}_${dataPribadi.uuid_firebase}/allChat/`;
        const pesan = `messages/${getkonsumen.uidPartner}/${getkonsumen.uidPartner}_${dataPribadi.uuid_firebase}`;

        configfirebase.database()
            .ref(urlfirebase)
            .on("value", snapshot => {
                if (snapshot.val()) {
                    const datasnapshot = snapshot.val();
                    const semuadatachat = [];
                    Object.keys(datasnapshot).map((key) => {
                        const datachat = datasnapshot[key];
                        const newdatachat = [];

                        Object.keys(datachat).map((itemChat) => {
                            newdatachat.push({
                                id: itemChat,
                                data: datachat[itemChat]
                            });
                        });

                        semuadatachat.push({
                            id: key,
                            data: newdatachat
                        });
                    });

                    setChatData(semuadatachat);
                }
            });

        configfirebase.database()
            .ref(pesan)
            .once("value")
            .then((snapshot) => {
                setShowIndicator(false);
                const pesanStatus = snapshot.val() ? snapshot.val().status : null;
                setPesanStatus(pesanStatus)
            })
    }, [dataPribadi.uuid_firebase]);

    const getDataUserLocal = () => {
        getData('user').then(res => {
            setUser(res);
        });
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const chatSend = () => {
        const today = new Date();

        const data = {
            sendBy: dataPribadi.uuid_firebase,
            chatDate: today.getTime(),
            chatTime: getChatTime(today),
            chatContent: chatContent,
        };

        const chatID = `${getkonsumen.uidPartner}_${dataPribadi.uuid_firebase}`;
        const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;

        const urlMessageUser = `messages/${getkonsumen.uidPartner}/${chatID}`;
        const urlMessageDokter = `messages/${dataPribadi.uuid_firebase}/${chatID}`;
        const dataHistoryChatForUser = {
            lastContentChat: chatContent,
            lastChatDate: today.getTime(),
            uidPartner: dataPribadi.uuid_firebase
        };

        const dataHistoryChatForDokter = {
            lastContentChat: chatContent,
            lastChatDate: today.getTime(),
            uidPartner: getkonsumen.uid,
        };

        configfirebase.database()
            .ref(urlFirebase)
            .push(data)
            .then((response) => {
                setChatContent('');
                configfirebase.database().ref(urlMessageUser).set(dataHistoryChatForUser);
                configfirebase.database().ref(urlMessageDokter).set(dataHistoryChatForDokter);
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarComponent />
            <View
                style={{
                    backgroundColor: 'white',
                    elevation: 5,
                    height: 70,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <Icon name="arrow-back" style={{ fontSize: 20, color: 'black' }} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 2,
                        flexDirection: 'row',
                        marginRight: 10,
                    }}>
                    <View
                        style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 3 }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                fontFamily: 'Poppins-Medium',
                                fontWeight: 'bold',
                            }}>
                            {getkonsumen.nama}
                        </Text>
                        <Text style={{ color: 'gray', fontSize: 12 }}>
                            {getkonsumen.nomor_hp}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                        }}>
                        <Image
                            source={require('../../../../assets/images/background-doctor.png')}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                borderColor: 'black',
                                borderWidth: 1,
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {chatData.map(chat => {
                        return (
                            <View key={chat.id}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 11,
                                        color: 'gray',
                                        marginVertical: 20,
                                        textAlign: 'center',
                                    }}>
                                    {chat.id}
                                </Text>
                                {chat.data.map(itemChat => {
                                    return (
                                        <ChatItem
                                            key={itemChat.id}
                                            isMe={itemChat.data.sendBy === dataPribadi.uuid_firebase}
                                            text={itemChat.data.chatContent}
                                            date={itemChat.data.chatTime}
                                        />
                                    );
                                })}
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            {showIndicator ? (
                <ActivityIndicator size={"large"} style={{ marginVertical: 10 }} color={colors.primary} />
            ) : (
                pesanStatus === null ? (
                    <ActivityIndicator size={"large"} style={{ marginVertical: 10 }} color={colors.primary} />
                ) : pesanStatus === 2 ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: 'red', borderWidth: 1, marginVertical: 10, marginHorizontal: 10, borderRadius: 5, paddingVertical: 10 }}>
                        <Text style={{ color: 'red', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            Konsultasi Sudah Berakhir
                        </Text>
                    </View>
                ) : (
                    <InputChat
                        value={chatContent}
                        onChangeText={value => setChatContent(value)}
                        onButtonPress={chatSend}
                    />
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.backgroundPutih
    },

    heading: {
        backgroundColor: colors.backgroundPutih,
        height: 50,
        padding: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default DetailKonsultasiPerawat;
