import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {colors} from '../../utils';

const AnimasiLogin = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.loadingBackground,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    color: colors.primary,
    marginTop: 16,
  },
});

export default AnimasiLogin;
