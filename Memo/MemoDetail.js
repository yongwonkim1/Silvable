import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button,Pressable } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";

const MemoDetail = ({route, navigation}) => {
    const userEmail = useContext(UserContext);
    const email = userEmail.user.email;
    const uid = userEmail.user.uid;
    const usersCollection = firestore().collection('memo');
    const [title,setTitle] = useState(route.params?.title);
    const [text,setText] = useState(route.params?.text);


    return(
        <View>
            <Text>{title}{text}</Text>
        </View>
    );
}
export default MemoDetail;