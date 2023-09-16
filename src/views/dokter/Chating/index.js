import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import {colors} from '../../../utils';
import Firebase from '../../../firebase/firebaseConfig';
import {getData} from '../../../utils';

const Chating = () => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserLocal();

    const rootDB = Firebase.database().ref();
    const urlHistory = `messages/DKTR-09022002`;
    const messagesDB = rootDB.child(urlHistory);

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
        setHistoryChat(data);
        console.log(data);
      }
    });
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View style={styles.heading}>
        <Text style={styles.textHeading}>Konsultasi Pasien</Text>
      </View>
      {historyChat.map(chat => {
        return (
          <View
            style={{flexDirection: 'row', paddingVertical: 10}}
            key={chat.id}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 4}}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                {chat.uidPartner}
              </Text>
              <Text style={{color: 'gray', fontSize: 10}}>
                {chat.lastContentChat}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    height: 50,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 5,
    padding: 10,
  },
  textHeading: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Chating;
