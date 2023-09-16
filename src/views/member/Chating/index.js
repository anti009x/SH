import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import ChatItem from '../../../components/ChatItem';
import InputChat from '../../../components/InputChat';
import { configfirebase } from '../../../firebase/firebaseConfig';
import {
  getChatTime,
  getData,
  setDateChat,
  useForm,
} from '../../../utils';
import { useTime } from '../../../components/Time/TimeContext';
import Navigasi from '../../../partials/navigasi';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chating = ({route }) => {
  const getDokter = route.params;

  const navigation = useNavigation();

  const [form, setForm] = useForm({
    id_dokter: '',
    uid_partner: '',
  });

  const { countdown, finished, formatTime, setCurrentPerUser } = useTime();
  const durasiKonsultasi = 1800;

  
  const isKonsultasiTerlewat = countdown <= 0;
  
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [dataPribadi, setDataPribadi] = useState({});
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getDataUserLocal();

    if (isKonsultasiTerlewat) {
      AsyncStorage.removeItem("countdown");
    }

    const urlFirebase = `chatting/${user.uid}_${getDokter.data.uid}/allChat/`;
    configfirebase.database()
      .ref(urlFirebase)
      .on('value', snapshot => {
        console.log(snapshot.val());
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const semuaDataChat = [];
          Object.keys(dataSnapshot).map(key => {
            const dataChat = dataSnapshot[key];
            const newDataChat = [];

            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });

            semuaDataChat.push({
              id: key,
              data: newDataChat,
            });
          });
          setChatData(semuaDataChat);
        }
      });
    
  }, [
    user.uid,
    dataPribadi.idx,
    dataPribadi.token,
    isKonsultasiTerlewat
  ]);

  const getDataUserLocal = () => {
    getData('user').then(res => {
      console.log(res);
      setUser(res);
    });
    getData('dataUser').then(res => {
      console.log(res);
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

    const chatID = `${user.uid}_${getDokter.data.uid}`;

    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;

    const urlMessageUser = `messages/${user.uid}/${chatID}`;
    const urlMessageDokter = `messages/${getDokter.data.uid}/${chatID}`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: getDokter.data.uid,
      status: 1
    };

    const dataHistoryChatForDokter = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    configfirebase.database()
      .ref(urlFirebase)
      .push(data)
      .then(response => {
        setChatContent('');
        configfirebase.database().ref(urlMessageUser).set(dataHistoryChatForUser);
        configfirebase.database().ref(urlMessageDokter).set(dataHistoryChatForDokter);
      })
      .catch(error => {
        console.log(error);
      });
    // Kirim ke Firebase
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />
      <View style={{ backgroundColor: 'white', elevation: 5, height: 70, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 3, marginLeft: 10, flexDirection: 'row', marginHorizontal: 10 }}>
          <Image source={require("../../../assets/images/background-doctor.png")} resizeMode='cover' style={{ height: 50, width: 50, borderRadius: 50, borderColor: 'black', borderWidth: 1 }} />
          <View style={{ color: 'black', marginHorizontal: 10 }}>
            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14 }}>
              {getDokter.data.nama}
            </Text>
            <Text style={{ color: 'gray', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 12 }}>
              Dokter
            </Text>
          </View>
        </View>
        <View style={{flex: 1, marginRight: 20}}>
          <TouchableOpacity onPress={() => {
            navigation.navigate(Navigasi.MAIN_APP)
          }} style={{backgroundColor: 'red', paddingVertical: 5, borderRadius: 5}}>
            <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontSize: 12, fontWeight: 'bold', textAlign: 'center'}}>
              Kembali
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>

        {isKonsultasiTerlewat ? (
          <Text style={{ color: 'red', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginHorizontal: 10, marginTop: 10, marginBottom: 5 }}>
            Waktu Konsultasi Selesai
          </Text>
        ) : (
          <Text style={{ color: 'red', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginHorizontal: 10, marginTop: 10, marginBottom: 5 }}>
            Waktu Konsultasi: {formatTime(countdown)}
          </Text>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text
                  style={{
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
      {isKonsultasiTerlewat && countdown != 0 ? (
        <View style={{borderColor: 'red', borderWidth: 1, paddingVertical: 10, marginHorizontal: 10, marginVertical: 10, borderRadius: 10}}>
          <Text style={{color: 'red', fontFamily: 'Poppins-Medium', fontWeight: 'bold', textAlign: 'center'}}>
            Konsultasi Anda Sudah Selesai
          </Text>
        </View>
      ) : (
        <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
      />
      ) }
    </View>
  );
};

export default Chating;
