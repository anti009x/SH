import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from "react-native"
import { colors } from '../../../utils';

const Riwayat = () => {
    return (
        <View style={styles.background}></View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background
    }
});

export default Riwayat;