import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import LinearGradient from 'react-native-linear-gradient';

const Button = ({ onpress, textbutton }) => {
    return (
        <View style={styles.button}>
            <TouchableOpacity onPress={onpress}>
                <Text style={styles.textbutton}>
                    {textbutton}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#051f84'
    },

    textbutton: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
    }
});

export default Button;