import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, PermissionsAndroid, ScrollView, Dimensions, TextInput, TouchableOpacity } from "react-native";

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

export default function MapToPolice({ }) {
    const [location, setLocation] = useState<ILocation | undefined>(undefined);  // 현재위치
    const [destination, setDestination] = useState<ILocation | undefined>(undefined);  // 도착지 위치(경찰서)
    const [name, setName] = useState('경찰서 이름');  // 경찰서 이름
    const [address, setAddress] = useState('경찰서 주소');  // 경찰서 주소


    async function requestPermissions() {
        if (Platform.OS === 'ios') {
            const auth = await Geolocation.requestAuthorization("whenInUse");
            if (auth === "granted") {
                // do something if granted...
            }
        }

        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getCurrentPosition();

            }
        }
    }

    async function chooseCloseDest() {
        console.log('가장 가까운 경찰서를 검색합니다.')
        let minIndex = 0  // 최소거리 인덱스 변수 - 첫번째 인덱스로 초기화
        let minGeo = 10000;  // 최소거리 변수 - 충분히 큰 수로 초기화
        let loc = { latitude: 0, longitude: 0 };
        location ? (
            loc = location
        ) : (loc = { latitude: 0, longitude: 0 })

        for (let i = 0; i < Object.keys(data).length; i += 1) {
            if (Math.abs((parseFloat(data[i].REFINE_WGS84_LAT) - loc.latitude)) + Math.abs((parseFloat(data[i].REFINE_WGS84_LOGT) - loc.longitude)) < minGeo) {
                minGeo = Math.abs((parseFloat(data[i].REFINE_WGS84_LAT) - loc.latitude)) + Math.abs((parseFloat(data[i].REFINE_WGS84_LOGT) - loc.longitude));
                minIndex = i;
            }
        }
        setDestination({ latitude: parseFloat(data[minIndex].REFINE_WGS84_LAT), longitude: parseFloat(data[minIndex].REFINE_WGS84_LOGT) })

        if (data[minIndex].NM) {
            setName(data[minIndex].NM)  // 되는데 왜 빨간줄??
        }
        else if (data[minIndex].INST_NM) {
            setName(data[minIndex].INST_NM)  // 되는데 왜 빨간줄??
        }
        setAddress(data[minIndex].REFINE_ROADNM_ADDR)

    }
    function getCurrentPosition() {
        console.log('현재위치를 가져옵니다.')
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocation({
                    latitude,
                    longitude,
                });
            },
            error => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );

    }
    useEffect(() => {
        requestPermissions();
        chooseCloseDest();
    }, []);




    return (
        <>
            <View style={{ flex: 1 }}>
                {location ? (
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.destinationName}>
                                도착지 : {name}
                            </Text>
                        </View>
                        <View style={{ flex: 5 }}>
                            <MapView
                                style={{ width: winWidth, height: winHeight }}
                                provider={PROVIDER_GOOGLE}
                                showsUserLocation
                                followsUserLocation
                                initialRegion={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: 0.003,
                                    longitudeDelta: 0.003,
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                                    title="현재 위치"
                                    description="출발 위치입니다."
                                />
                                {destination ? (
                                    <Marker
                                        coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                                        title={name}
                                        description={address}
                                    />
                                ) : (<></>)
                                }
                                <MapViewDirections
                                    origin={location}
                                    destination={destination}
                                    apikey={GOOGLE_MAPS_APIKEY}
                                    strokeWidth={5}
                                    strokeColor="hotpink"
                                    mode="TRANSIT"
                                    optimizeWaypoints={true}
                                    onError={(errorMessage) => {
                                        console.log('도착할 수 없는 장소입니다. (', errorMessage, ')');
                                        chooseCloseDest();
                                    }}
                                />
                            </MapView>
                        </View>
                    </ScrollView>
                ) : (
                    <ScrollView style={{ flex: 1 }}>
                        <Text style={{ flex: 1, justifyContent: 'center' }}>Loading...</Text>

                    </ScrollView>
                )
                }


            </View>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    destinationName: {
        color: 'black',
        fontSize: 30,
    }
});