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
    const [goto, setGoto] = useState('수원남부경찰서');

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
                console.log(location)
            }
        }
    }

    // 처음 접속할때 location이 undefine인 오류 해결하기.
    function chooseCloseDest() {
        console.log(data[0])
        let minIndex = 0
        let minGeo = 10000;
        let loc = { latitude: 0, longitude: 0 };
        location ? (
            loc = location
        ) : (loc = { latitude: 0, longitude: 0 })

        for (let i = 0; i < Object.keys(data).length; i += 1) {
            if (Math.abs((parseFloat(data[i].REFINE_WGS84_LAT) - loc.latitude)) + Math.abs((parseFloat(data[i].REFINE_WGS84_LOGT) - loc.longitude)) < minGeo) {
                minGeo = Math.abs((parseFloat(data[i].REFINE_WGS84_LAT) - loc.latitude)) + Math.abs((parseFloat(data[i].REFINE_WGS84_LOGT) - loc.longitude));
                console.log(minGeo)
                minIndex = i;
            }
        }
        console.log(data[minIndex]);
        setDestination({ latitude: parseFloat(data[minIndex].REFINE_WGS84_LAT), longitude: parseFloat(data[minIndex].REFINE_WGS84_LOGT) })
    }

    useEffect(() => {
        requestPermissions();
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
        chooseCloseDest()
    }, []);




    return (
        <>
            <View style={{ flex: 1 }}>
                {location ? (
                    <ScrollView style={{ flex: 1 }}>
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
                                    description="this is a marker example"
                                />

                                <MapViewDirections
                                    origin={location}
                                    destination={destination}
                                    apikey={GOOGLE_MAPS_APIKEY}
                                    strokeWidth={5}
                                    strokeColor="hotpink"
                                    mode="TRANSIT"
                                    optimizeWaypoints={true}
                                    onError={(errorMessage) => {
                                        console.log('도착할 수 없는 장소입니다.');
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
});
