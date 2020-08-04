import React, { useState} from 'react';
import { SafeAreaView, Text, Alert, TextInput, StyleSheet,AsyncStorage, TouchableOpacity} from 'react-native';
import api from '../service/api'


export default function Book({ navigation }) {

    const id = navigation.getParam('id');
    const [date, setDate] = useState('');


    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
     
        await api.post(`/spots/${id}/bookings`, { 
           date, 
            },{
                 headers: { user_id}
             })
             Alert.alert('Reservation request sent!');
             navigation.navigate('List');
    }


    function handleCancel(){
        navigation.navigate('List');
    }


    return (
        <SafeAreaView style={styles.container}> 
            <Text style={styles.label}>DATE OF INTEREST *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="What date do you want to book?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value = {date}
                    onChangeText = {setDate}
                />
                
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Request reservation</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container:{
        margin: 30,
    },   
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,

    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,

    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton:{
        height: 42,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10

    }
});
