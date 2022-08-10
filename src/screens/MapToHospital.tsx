import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, PermissionsAndroid, ScrollView, Dimensions, TextInput, TouchableOpacity, Button } from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import data from '../hospitalList';

Geocoder.init(`AIzaSyDDXb9N2-02HXrCo7LBuuNSxSg-Dp4-w64`, { language: "kor" }); // use a valid API key


const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDDXb9N2-02HXrCo7LBuuNSxSg-Dp4-w64';

interface ILocation {
    latitude: number;
    longitude: number;
}

export default function MapToHospital({ route }: any) {
    const [department, setDepartment] = useState(route.params.id);  // 병원 부서
    const [location, setLocation] = useState<ILocation | undefined>(undefined);  // 현재위치
    const [destination, setDestination] = useState<ILocation | undefined>(undefined);  // 도착지 위치(경찰서)
    const [hospitalList, setHospitalList] = useState([]);  // 부서별 병원 리스트


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
        //let newData = {}; // 병원 리스트를 저장할 변수
        for (let i = 0; i < Object.keys(data).length; i += 1) {
            let count = 0;
            if (data[i].TREAT_SBJECT_CONT) {
                if ((data[i].TREAT_SBJECT_CONT).includes(department)) {
                    console.log(data[i], department)
                    hospitalList.push({
                        name: data[i].BIZPLC_NM,
                        latitude: data[i].REFINE_WGS84_LAT,
                        longitude: data[i].REFINE_WGS84_LOGT,
                    })
                    const newList = Object.assign({}, hospitalList, { [count++]: { name: data[i].BIZPLC_NM, latitude: data[i].REFINE_WGS84_LAT, longitude: data[i].REFINE_WGS84_LOGT } });
                    setHospitalList(newList)
                }
            }
        }

        console.log(hospitalList, '저장된 list')
        console.log(`가장 가까운 ${department}를 검색합니다.`)
        let minIndex = 0  // 최소거리 인덱스 변수 - 첫번째 인덱스로 초기화
        let minGeo = 10000;  // 최소거리 변수 - 충분히 큰 수로 초기화
        let loc = { latitude: 0, longitude: 0 };
        location ? (
            loc = location
        ) : (loc = { latitude: 0, longitude: 0 })
        if (hospitalList) {
            for (let i = 0; i < Object.keys(hospitalList).length; i += 1) {
                if (Math.abs((parseFloat(hospitalList["0"].latitude) - loc.latitude)) + Math.abs((parseFloat(hospitalList.[i].longitude) - loc.longitude)) < minGeo) {
                    minGeo = Math.abs((parseFloat(hospitalList.[i].latitude) - loc.latitude)) + Math.abs((parseFloat(hospitalList.[i].longitude) - loc.longitude));
                    minIndex = i;
                }
            }
            console.log(newData[minIndex]);
            setDestination({ latitude: parseFloat(newData[minIndex].REFINE_WGS84_LAT), longitude: parseFloat(data[minIndex].REFINE_WGS84_LOGT) })
        }
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

        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, color: 'black' }}>가장 가까운 <Text style={{ fontWeight: '600' }}>{department}</Text>를 검색합니다~</Text>
            </View>
            <View style={{ flex: 2 }}>
                {location ? (
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 5 }}>
                            <MapView
                                style={{ width: winWidth, height: winHeight / 1.5 }}
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
                                {destination ? (
                                    <Marker
                                        coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                                        title="경찰서"
                                        description="this is a marker example"
                                    />
                                ) : (<></>)
                                }
                                <MapViewDirections
                                    origin={location}
                                    destination={destination}
                                    apikey={GOOGLE_MAPS_APIKEY}
                                    strokeWidth={5}
                                    strokeColor="blue"
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

