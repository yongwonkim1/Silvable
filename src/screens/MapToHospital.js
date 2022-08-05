import React, { useState, useEffect } from 'react';

import {

    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { enableLatestRenderer } from 'react-native-maps';
//import NaverMapView from "react-native-nmap";

export default function MapToHospital({ route, navigation }) {
    const [department, setDepartment] = useState(route.params.id);
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 500)
        return () => clearInterval(id);
    }, [])

    const P0 = { latitude: 37.564362, longitude: 126.977011 };
    const P1 = { latitude: 37.565051, longitude: 126.978567 };
    const P2 = { latitude: 37.565383, longitude: 126.976292 };

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

