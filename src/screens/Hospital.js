import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

export default function Hospital({ navigation }) {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: '600', color: 'black' }}>증상을 선택하세요</Text>
            <View style={styles.row}>
                <TouchableOpacity style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '정형외과' })}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>정형외과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/정형외과.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '안과' })}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>안과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/안과.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View >
            <View style={styles.row}>
                <TouchableOpacity style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '이비인후과' })}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>이비인후과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/이비인후과.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '정신과' })}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>정신과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/정신과.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '치과' })}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>치과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/치과.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.items}
                    onPress={() => navigation.navigate('MapToHospital', { id: '성형외과' })}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.title}>성형외과</Text>
                    </View>
                    <View style={styles.imageCase}>
                        <Image
                            style={styles.image}
                            source={require('./assets/hospitalImages/성형외과.png')}
                        />
                    </View>
                </TouchableOpacity>
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
});

