import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, PermissionsAndroid, ScrollView, Dimensions, TextInput, TouchableOpacity, Button } from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import data from '../policeList';

Geocoder.init(`AIzaSyDDXb9N2-02HXrCo7LBuuNSxSg-Dp4-w64`, { language: "kor" }); // use a valid API key


const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDDXb9N2-02HXrCo7LBuuNSxSg-Dp4-w64';

interface ILocation {
    latitude: number;
    longitude: number;
}

export default function MapToHospital({ route }: any) {
    const [department, setDepartment] = useState(route.params.id);
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 500)
        return () => clearInterval(id);
    }, [])


    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>가장 가까운 <Text style={{ fontWeight: '600' }}>{department}</Text>를 검색합니다~</Text>
            <Text>다른 병원 검색하기 {time.toLocaleDateString()} {time.toLocaleTimeString()}</Text>
            <View style={styles.buttons}>
                <Button title="정형외과" onPress={() => setDepartment("정형외과")} />
                <Button title="안과" onPress={() => setDepartment("안과")} />
                <Button title="이비인후과" onPress={() => setDepartment("이비인후과")} />
                <Button title="정신과" onPress={() => setDepartment("정신과")} />
                <Button title="치과" onPress={() => setDepartment("치과")} />
                <Button title="성형외과" onPress={() => setDepartment("성형외과")} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        backgroundColor: 'black',
    },
    buttons: {
        flexDirection: 'row',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});

