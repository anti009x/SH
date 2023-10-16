import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, ScrollView } from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';

import Heading from '../../../../components/Heading';
import Navigasi from '../../../../partials/navigasi';
import JadwalPoliklinik from './JadwalPoliklinik';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import JadwalDokter from './JadwalDokter';

const ChatBot = ({}) => {
  const navigation = useNavigation();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const fadeAnimCard2 = useState(new Animated.Value(0))[0]; 
  const moveAnimCard2 = useState(new Animated.Value(0))[0];

  const [showPoliknikList, setShowPoliknikList] = useState(false);

  const [showJadwalDokter, setShowJadwalDokter] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log('Message sent:', message);
    setMessage('');
  };

  const handleCard1Click = () => {
    setShowPoliknikList(!showPoliknikList);
    Animated.timing(moveAnimCard2, {
      toValue: showPoliknikList ? 0 : 100,  // Toggle the value based on showPoliknikList
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const handleCard2Click = () => {
    setShowJadwalDokter(!showJadwalDokter);

  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnimCard2, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      })
    ]).start();
  }, [fadeAnim, fadeAnimCard2]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBarComponent />
      <Heading navigasi={() => navigation.replace(Navigasi.MAIN_APP)} textHeading={"Support Medical System"} />
      <View style={styles.navigationHeader}>
        <StatusBarComponent />
      </View>

      <ScrollView style={{ flex: 1, padding: 16, flexDirection: 'column' }}>

        {/* card1 */}
        <TouchableOpacity onPress={handleCard1Click}>
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../../../assets/images/people.png')}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={{ marginLeft: 10 }}>Sule</Text>
            </View>
            <Animated.Text style={{ opacity: fadeAnim }}>
                Apakah Anda Ingin Bertanya Mengenai Jadwal Poliknik ?
            </Animated.Text>
          </Animated.View>
         
        </TouchableOpacity>
        {showPoliknikList && <JadwalPoliklinik />}
   
        {/* card2 */}
        <TouchableOpacity onPress={handleCard2Click}>
    <Animated.View style={[styles.card, { opacity: fadeAnimCard2 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../../../assets/images/people.png')}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={{ marginLeft: 10 }}>Sule</Text>
            </View>
            <Animated.Text style={{ opacity: fadeAnimCard2 }}>
                Apakah Anda Ingin Bertanya Mengenai Jadwal Dokter? ?
            </Animated.Text>
          </Animated.View>
        
        </TouchableOpacity>
        {showJadwalDokter && <JadwalDokter />}
        </ScrollView>

 
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  sendButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,

  },

  
  botText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 8,
  },
});

export default ChatBot;
