import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import { useNavigation } from '@react-navigation/native';
import Heading from '../../../../components/Heading';
import Navigasi from '../../../../partials/navigasi';

const Notifikasi = () => {
  const navigation = useNavigation();
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const requestUserPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
          await getFCMToken();
        }
      } catch (error) {
        console.log('Error requesting permission:', error);
      }
    };

    const getFCMToken = async () => {
      try {
        const newFcmToken = await messaging().getToken();
        if (newFcmToken) {
          setFcmToken(newFcmToken);
          console.log('FCM Token:', newFcmToken);
        }
      } catch (error) {
        console.log('Error getting FCM token:', error);
      }
    };

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      Alert.alert('New FCM Message', JSON.stringify(remoteMessage));
    });

    requestUserPermission();
    return unsubscribeOnMessage;
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      padding: 16,
      flexDirection: 'column',
    },
    text: {
      color: 'blue',
      fontSize: 15,
      fontFamily: 'verdana',
      marginTop: 10,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBarComponent />
      <Heading navigasi={() => navigation.replace(Navigasi.MAIN_APP)} textHeading={'Notifikasi'} />
      <View style={styles.navigationHeader}>
        <StatusBarComponent />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Disini Taruh FCM Token:</Text>

      </View>
    </View>
  );
};

export default Notifikasi;
