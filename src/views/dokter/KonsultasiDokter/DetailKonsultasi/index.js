import { ScrollView, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, getChatTime, getData, setDateChat } from '../../../../utils'
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import ChatItem from '../../../../components/ChatItem';
import InputChat from '../../../../components/InputChat';
import { configfirebase } from '../../../../firebase/firebaseConfig'

const DetailKonsultasi = ({ navigation, route }) => {

    const getkonsumen = route.params;

    const [chatContent, setChatContent] = useState('');
    const [chatData, setChatData] = useState([]);
    const [user, setUser] = useState({});
    const [dataPribadi, setDataPribadi] = useState({});

    useEffect(() => {
        getDataUserLocal();
        const urlfirebase = `chatting/${getkonsumen.uidPartner}_${user.uid}/allChat/`;

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
    }, [user.uid]);

    const getDataUserLocal = () => {
        getData('user').then(res => {
            console.log(res);
            setUser(res);
        });
        getData('dataUser').then(res => {
            // console.log(res);
            setDataPribadi(res);
        });
    };

    const chatSend = () => {
        const today = new Date();

        const data = {
            sendBy: user.uid,
            chatDate: today.getTime(),
            chatTime: getChatTime(today),
            chatContent: chatContent,
        };

        const chatID = `${getkonsumen.uidPartner}_${user.uid}`;
        const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;

        const urlMessageUser = `messages/${getkonsumen.uidPartner}/${chatID}`;
        const urlMessageDokter = `messages/${user.uid}/${chatID}`;
        const dataHistoryChatForUser = {
            lastContentChat: chatContent,
            lastChatDate: today.getTime(),
            uidPartner: user.uid
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
                                            isMe={itemChat.data.sendBy === user.uid}
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
            <InputChat
                value={chatContent}
                onChangeText={value => setChatContent(value)}
                onButtonPress={chatSend}
            />
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

export default DetailKonsultasi;