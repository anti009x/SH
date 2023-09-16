import React, {useState, useEffect, Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

class TextInputComponents extends Component {
  render() {
    const {placeholder, updateFields} = this.props;

    return (
      //   <View style={{flex: 1, backgroundColor: 'white'}}>
      //     <TextInput
      //       style={{fontSize: 17}}
      //       placeholder={placeholder}
      //       placeholderTextColor="#000"
      //       onChangeText={text => updateFields(text)}
      //       secureTextEntry={placeholder == 'Masukkan Password' ? true : false}
      //     />
      //   </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            borderColor: 'green',
            borderWidth: 1,
            margin: 20,
            borderRadius: 10,
          }}>
          <TextInput
            style={{fontSize: 12}}
            placeholder={placeholder}
            placeholderTextColor="#000"
            onChangeText={text => updateFields(text)}
            secureTextEntry={placeholder == 'Masukkan Password' ? true : false}
          />
        </View>
      </View>
    );
  }
}

export default TextInputComponents;
