import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, AsyncStorage, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList'
import socketio from 'socket.io-client';


export default function List({ navigation }) {

    const [techs, setTechs] = useState([]);


    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('put the right url', {
                query: { user_id }
            })
            socket.on('booking_reponse', booking => {
                Alert.alert(`Your reservation${booking.spot.company} at ${booking.date} has been ${booking.approved ? 'APPROVED' : 'DENIED'} `);
            })
        })
    }, []);



    /* at the moment it runs * /
    /* techs saved in string, you should take it from storage, break it * 
        /*no momento que roda*/
    /*techs salva em string, deve pegar do storage, quebrá-la*/
    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techArray);
        })

    }, []);


    function LogOff() {
        Alert.alert('Log Off realizado.');
        AsyncStorage.clear();
        navigation.navigate('Login');
    }



    return (


        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => LogOff()} >
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10,
    },
});