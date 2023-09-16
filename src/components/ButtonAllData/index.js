import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const ButtonAllData = ({ textButton, onPress }) => {
    return (
        <View style={styles.background}>
            <TouchableOpacity style={styles.backgroundButton} onPress={onPress}>
                <Text style={styles.textButton}>
                    {textButton}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    backgroundButton: {
        paddingHorizontal: 10,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 20,
    },

    textButton: {
        color: 'green',
        marginHorizontal: 5,
        fontSize: 12,
        marginVertical: 2,
        fontWeight: 'bold',
    }
});

export default ButtonAllData;