import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from "react-native";
import axios from 'axios';
import { baseUrl } from '../../../utils';

const ClassPusher = () => {

    const [form, setForm] = useState({
        message: ''
    });
    const [inputMessage, setInputMessage] = useState('');

    const handleInput = (value) => {
        setForm({...form, message: value});
    }

    useEffect(() => {
    }, []);

    const sendMessage = () => {
        axios({
            url: `${baseUrl.url}/kirim-pesan`,
            method: "POST",
            data: {
                message: form.message
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 10 }}>
            <TextInput 
                placeholder='Masukkan Inputan' 
                style={{ 
                    borderColor: 'black', 
                    borderWidth: 1, 
                    borderRadius: 10, 
                    color: 'black', 
                    paddingHorizontal: 10,
                    marginBottom: 10
                }} 
                value={form.message}
                onChangeText={handleInput}
                placeholderTextColor={"black"}
            />
            <Button title='Kirim' onPress={() => sendMessage()} />
        </View>
    );
}

export default ClassPusher;