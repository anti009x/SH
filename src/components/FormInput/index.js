import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const FormInput = ({ icon, placeholder, placeholderTextColor, value, keyBoardType, onChangeText, secureTextEntry }) => {
    return (
        <View style={styles.designform}>
            <View style={styles.jarakicon}>
                <Icon name={icon} style={styles.icon} />
            </View>
            <TextInput style={[styles.textInput, { flex: 1 }]} placeholder={placeholder} placeholderTextColor={placeholderTextColor} value={value} keyboardType={keyBoardType} secureTextEntry={secureTextEntry} onChangeText={onChangeText} />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        color: 'grey',
        fontSize: 12,
        borderRadius: 5,
        fontFamily: 'Poppins-Medium',
        paddingVertical: 5,
        marginRight: 10
    },
    icon: {
        fontSize: 20,
        color: 'gray'
    },
    jarakicon: {
        justifyContent: 'center',
        marginHorizontal: 10
    },
    designform: {
        marginHorizontal: 10,
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10
    }
});

export default FormInput;