import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';

const ListFitur = ({navigation, onPress, nameIcon, textfitur}) => {
    return (
        <View style={styles.fitur}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.viewfitur}>
                    <Icon name={nameIcon} style={styles.icon} />
                </View>
            </TouchableOpacity>
            <View style={{paddingTop: 5}}>
                <Text style={styles.textfitur}>
                    {textfitur}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fitur: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewfitur: {
        borderColor: 'blue',
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
    },

    icon: {
        fontSize: 20,
        color: 'blue',
    },

    textfitur: {
        color: 'black', 
        fontSize: 12, 
        fontWeight: 'bold'
    }
})

export default ListFitur;