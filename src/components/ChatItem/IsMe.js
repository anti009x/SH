import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const IsMe = ({text, date}) => {
  return (
    <View style={{marginBottom: 20, alignItems: 'flex-end', paddingRight: 16}}>
      <View
        style={{
          padding: 12,
          paddingRight: 18,
          backgroundColor: 'skyblue',
          borderRadius: 10,
          borderBottomRightRadius: 0,
        }}>
        <Text style={{color: 'black', fontSize: 14, color: 'black'}}>
          {text}
        </Text>
      </View>
      <Text style={{color: 'black', fontSize: 11, marginTop: 8}}>{date}</Text>
    </View>
  );
};

export default IsMe;
