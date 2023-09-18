import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Button } from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';

import Heading from '../../../../components/Heading';
import Navigasi from '../../../../partials/navigasi';


import {
  initialize,
  showMessaging,
  
} from '@robbywh/react-native-zendesk-messaging';





const ChatBot = ({ navigation }) => {

  React.useEffect(() => {
    initialize("eyJzZXR0aW5nc191cmwiOiJodHRwczovL25vdGhpbmc0Nzg0LnplbmRlc2suY29tL21vYmlsZV9zZGtfYXBpL3NldHRpbmdzLzAxSEFIQjhHS1BLUjcwREg0SlNIUjFQS1JBLmpzb24ifQ=="

       
    );
  }, []);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log('Message sent:', message);
    setMessage('');
  };

  const handleOptionClick = (option) => {
    console.log('Option clicked:', option);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBarComponent />
      <Heading navigasi={() => navigation.replace(Navigasi.MAIN_APP)} textHeading={"Support Medical System"} />
      <View style={styles.navigationHeader}>
        <StatusBarComponent />
      </View>

    <View style={{ flex: 1, padding: 16, flexDirection: 'column' }}>
    <TouchableOpacity >

      {/* <Text
        style={{
          marginBottom: 50,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
        }}
      >
        Zendesk Messaging
      </Text>
      <Text style={{ marginBottom: 10, textAlign: 'center' }}>
        Press The "CHAT" button to test
      </Text>
      <Button onPress={() => showMessaging()} title="CHAT" /> */}



    {/* <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../../../../assets/images/people.png')}
          style={{ width: 50, height: 50 }}
        />
        <Text style={{ marginLeft: 10 }}>Ibnu</Text>
      </View>
      <Text>Apakah Anda Ingin Bertanya Mengenai Jadwal Poliklinik?</Text>
    </View> */}
  </TouchableOpacity>

  {/* Card 2 */}
  <TouchableOpacity onPress={showMessaging}>
    <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../../../../assets/images/people.png')}
          style={{ width: 50, height: 50 }}
        />
         <Text style={{ marginLeft: 10 }}>Gibran</Text>
      </View>
      <Text style={{ backgroundColor: 'blue', color: 'white', padding: 10 }}>
         Apakah Anda Ingin Bertanya Mengenai Jadwal Poliklinik?
        </Text>
     
    </View>
      {/* Card 3 */}
  </TouchableOpacity>
  <TouchableOpacity onPress={() => handleOptionClick('Jadwal Dokter')}>
    {/* <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../../../../assets/images/people.png')}
          style={{ width: 50, height: 50 }}
        />
         <Text style={{ marginLeft: 10 }}>Sule</Text>
      </View>
      <Text>Apakah Anda Ingin Bertanya Mengenai Seputar Kesehatan?</Text>
    </View> */}
  </TouchableOpacity>
</View>
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
