import React, { useState, useContext } from "react";
import { Button } from "../Components";

import { useNavigation } from '@react-navigation/native';

import { View, Text, TextInput } from "react-native";

import { collection, addDoc, query, onSnapshot, getDocs, doc } from 'firebase/firestore';
import { dbService } from '../utils/firebase';
import { UserContext } from "../contexts";

export default function MemoWrite(){

    const navigation = useNavigation();

    const [memoContent, setMemoContent] = useState("");

    //로그인 정보에서 가져온 것
        //로그인 정보에서 가져온 것
        const userEmail = useContext(UserContext);
        const email = userEmail.user.email;
        const uid = userEmail.user.uid;
    

    const submitHandler = async ( event ) => {
        await addDoc(collection(dbService,"Memos"),{
            memoContent,
            createdAt:Date.now(),
            creatorId: uid,
        });
        setMemoContent("");

        navigation.navigate("Memo");
    }

    return(

        <View>

        <Text> MemoWrite</Text>

        <TextInput placeholder='input memo' onChange={(event)=>{
            setMemoContent(event.nativeEvent.text);
        }}>
        </TextInput>

        <Button title={"Write"} onPress={submitHandler}></Button>

        </View>
    )
}