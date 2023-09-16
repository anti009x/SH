import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';

const Other = ({text, date}) => {
  return (
    <View
      style={{
        marginBottom: 20,
        alignItems: 'flex-end',
        paddingLeft: 16,
        flexDirection: 'row',
      }}>
      <Image
        source={require('../../assets/images/people.png')}
        style={{
          width: 30,
          height: 30,
          borderRadius: 30 / 2,
          marginRight: 12,
          borderColor: 'black',
          borderWidth: 1,
        }}
      />
      <View>
        <View
          style={{
            padding: 12,
            paddingRight: 18,
            backgroundColor: 'blue',
            borderRadius: 10,
            borderBottomLeftRadius: 0,
            maxWidth: '100%',
          }}>
          <Text style={{color: 'black', fontSize: 14, color: 'white'}}>
            {text}
          </Text>
        </View>
        <Text style={{color: 'black', fontSize: 11, marginTop: 8}}>{date}</Text>
      </View>
    </View>
  );
};

export default Other;
