import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Linking,
    Pressable,
    Image,
    Dimensions
} from 'react-native';
import Tts from "react-native-tts";
const winWidth = Dimensions.get('window').width;

export default function Hospital({ navigation }) {

    const [letter, setLetter] = useState("");
    onPressRead = () => {
        Tts.stop();
        Tts.speak(letter);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: '600', color: 'black' }}>증상을 선택하세요</Text>
            <View style={styles.row}>
                <Pressable style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '정형외' })}
                    onLongPress={() => {
                        setLetter("정형외과");
                        onPressRead()
                    }}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>정형외과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/1.png')}
                        />
                    </View>
                </Pressable>
                <Pressable style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '안' })}
                    onLongPress={() => {
                        setLetter("안과");
                        onPressRead()
                    }}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>안과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/2.png')}
                        />
                    </View>
                </Pressable>
            </View >
            <View style={styles.row}>
                <Pressable style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '이비인후' })}
                    onLongPress={() => {
                        setLetter("이비인후과");
                        onPressRead()
                    }}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>이비인후과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/3.png')}
                        />
                    </View>
                </Pressable>
                <Pressable style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '정신' })}

                    onLongPress={() => {
                        setLetter("정신과");
                        onPressRead()
                    }}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>정신과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/4.png')}
                        />
                    </View>
                </Pressable>
            </View>
            <View style={styles.row}>
                <Pressable style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '치' })}
                    onLongPress={() => {
                        setLetter("치과");
                        onPressRead()
                    }}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>치과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/5.png')}
                        />
                    </View>
                </Pressable>
                <Pressable style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '성형외' })}
                    onLongPress={() => {
                        setLetter("성형외과");
                        onPressRead()
                    }}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>성형외과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/6.png')}
                        />
                    </View>
                </Pressable>
            </View>
            <View style={{ height: 100, width: winWidth }}>
                <View style={[styles.bottomTap]}>
                    <Pressable
                        onPress={() => {
                            navigation.pop();
                        }}
                        onLongPress={() => {
                            setLetter("뒤로가기");
                            onPressRead()
                        }}>
                        <Image style={[styles.btImg]} source={require('./assets/back.jpg')} />
                    </Pressable >
                    <Pressable
                        onPress={() => {
                            navigation.popToTop();
                        }}
                        onLongPress={() => {
                            setLetter("홈");
                            onPressRead()
                        }}>
                        <Image style={[styles.btImg]} source={require('./assets/home.png')} />
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
                        <Image style={[styles.btImg]} source={require('./assets/mag.png')} />
                    </Pressable>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        backgroundColor: 'black',
    },
    row: {
        flex: 1,
        flexDirection: "row",
        marginHorizontal: 20,

    },
    items: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        elevation: 10,

    },
    itemTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
        color: 'black',
    },
    imageCase: {
        flex: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    bottomTap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopColor: 'black',
        backgroundColor: 'white',
        marginTop: 20
    },
    btImg: {
        height: 50,
        width: 50
    }
});

