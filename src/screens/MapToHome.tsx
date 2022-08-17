import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text, Platform, PermissionsAndroid, ScrollView, Dimensions, TextInput, Pressable, Linking, Image, Button, } from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import firestore from '@react-native-firebase/firestore'
import { UserContext } from '../../contexts'
Geocoder.init(`AIzaSyDDXb9N2-02HXrCo7LBuuNSxSg-Dp4-w64`, { language: "kor" }); // use a valid API key


const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDDXb9N2-02HXrCo7LBuuNSxSg-Dp4-w64';

interface ILocation {
    latitude: number;
    longitude: number;
}
import Tts from "react-native-tts";

export default function MapToHome({ navigation }) {
    const [letter, setLetter] = useState("");
    onPressRead = () => {
        Tts.stop();
        Tts.speak(letter);
    };

    const [location, setLocation] = useState<ILocation | undefined>(undefined);  // 현재위치
    const [destination, setDestination] = useState({ latitude: 38, longitude: 128 });  // 도착지 위치(경찰서)
    const [goto, setGoto] = useState('');  // 추후 DB에 저장된 주소로 사용
    const [user, setUser] = useState();
    const usersCollection = firestore().collection('address');
    const userEmail = useContext(UserContext);
    const email = userEmail.user.email;
    const uid = userEmail.user.uid;

    const _callApi = async () => {
        try {
            const data = await usersCollection.where("email", "==", email).get();
            setUser(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
            console.log(user);
            user.forEach((row) => {
                setGoto(row.address)
            });
        } catch (error) {
            console.log(error.message);
        }
    };


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
                getGeoCode()
            }
        }
    }

    async function getGeoCode() {
        Geocoder.from(goto)
            .then(json => {
                var location = json.results[0].geometry.location;
                console.log(location);
                setDestination({ latitude: location.lat, longitude: location.lng })
                _callApi();
            })
            .catch(error => console.warn(error));
    }

    useEffect(() => {
        _callApi();
        getGeoCode();

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
    }, []);




    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1.5, flexDirection: "row", alignItems: 'center', backgroundColor: 'white' }}>
                    <Text style={{ flex: 0.5, color: 'black', justifyContent: 'center', fontSize: 20 }}>집 주소: </Text>
                    <TextInput style={styles.input}
                        returnKeyType="done"
                        value={goto}
                        onChangeText={(text) =>
                            setGoto(text)
                        }
                        onSubmitEditing={getGeoCode}
                    />
                    <Button title="경로탐색" onPress={getGeoCode} />
                </View>
                {location ? (
                    <View style={{ flex: 10 }}>
                        <MapView
                            style={{ width: winWidth, height: winHeight * 0.9 }}
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
                            {destination ? (  // destination이 있을시
                                <Marker
                                    coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                                    title={goto}
                                    description="집"
                                />
                            ) : {}}
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
                                    _callApi();
                                    getGeoCode();

                                }}
                            />
                        </MapView>
                    </View>
                ) : (
                    <ScrollView style={{ flex: 1 }}>
                        <Text style={{ flex: 1, justifyContent: 'center' }}>Loading...</Text>
                        <Text>집 주소를 입력해주세요.</Text>
                    </ScrollView>
                )
                }
                <View style={{ height: 80 }}>
                    <View style={[styles.bottomTap]}>
                        <Pressable
                            onPress={() => {
                                navigation.pop();
                            }}
                            onLongPress={() => {
                                setLetter("뒤로가기");
                                onPressRead()
                            }}>
                            <Image style={[styles.btImg]} source={require('./assets/뒤로가기.jpg')} />
                        </Pressable >
                        <Pressable
                            onPress={() => {
                                navigation.popToTop();
                            }}
                            onLongPress={() => {
                                setLetter("홈");
                                onPressRead()
                            }}>
                            <Image style={[styles.btImg]} source={require('./assets/홈.png')} />
                        </Pressable>
                        <Pressable onLongPress={() => {
                            setLetter("119");
                            onPressRead()
                            { Linking.openURL(`tel:119`) }
                        }}>
                            <Image style={[styles.btImg]} source={require('./assets/119.png')} />
                        </Pressable>
                        <Pressable onLongPress={() => {
                            setLetter("돋보기");
                            onPressRead()
                        }} onPress={() => navigation.navigate("Magnify")}>
                            <Image style={[styles.btImg]} source={require('./assets/돋보기.png')} />
                        </Pressable>
                    </View>
                </View>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1.5,
        height: 40,
        width: winWidth * 0.9,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius: 30,
        color: 'black',
    },
    bottomTap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopColor: 'black',
        backgroundColor: 'white',
    },
    btImg: {
        height: 50,
        width: 50
    }
});
