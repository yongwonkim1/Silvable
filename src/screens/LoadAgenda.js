import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, TouchableHighlight, ScrollView, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../../contexts";
import { AgendaSchedule } from 'react-native-calendars';
import Agenda from './Agenda'
import { loadBundle } from 'firebase/firestore';

function LoadAgenda({ navigation }) {
    const [users, setUsers] = useState();
    const usersCollection = firestore().collection('plan');
    const userEmail = useContext(UserContext);
    const email = userEmail.user.email;
    const uid = userEmail.user.uid;
    const [result, setResult] = useState([]);

    const [getContent, setGetContent] = useState([]);

    const [getSecondEmail, setGetSecondEmail] = useState("");

    const [isOwner, setIsOwner] = useState(true);

    const _callApi = async () => {
        try {
            //const data = await usersCollection.where("email","==",email).orderBy("date","desc").get();
            firestore().collection("plan").orderBy("date", "desc").onSnapshot((snapshot) => {

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setGetContent(data);
            })
            //setUsers(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));

        } catch (error) {

        }
    };
    const getUserDoc = async () => {

        const docRef = await firestore().collection('users').get();

        const data = docRef.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))

        data.map((doc) => {
            if (doc.creatorId == uid) {
                setGetSecondEmail(doc.secondId);
            }
        })

    }

    // useEffect(() => {
    //     _callApi();
    //     getUserDoc();
    // })
    //   const Load = ()=>{
    //     const item = []
    //     // var items = [[]]
    //     // getContent.map((content) =>{ 
    //     //     if( uid == content.uid || getSecondEmail == content.email) 
    //     //     items[0]=content.date,items[1]=content.text
    //     // },
    //     // console.log(items)
    //     getContent.forEach((content)=>{if(uid==content.uid || getSecondEmail == content.email)
    //     {item.push(content.date)
    //     item.push(content.text)}})
    //     console.log(item)
    //     setResult(item)

    //   } 
    const Load = async() => {
        const item = []
        // var items = [[]]
        // getContent.map((content) =>{ 
        //     if( uid == content.uid || getSecondEmail == content.email) 
        //     items[0]=content.date,items[1]=content.text
        // },
        // console.log(items)
        getContent.forEach((content) => {
            if (uid == content.uid || getSecondEmail == content.email){
                item.push(content.date)
                item.push(content.text)
                // let ite = {name : content.text}
                // item[content.date] = ["name :"+ite.name]}
        }
        navigation.navigate('Agenda', { result }) 
        })
        console.log(item)
        setResult(item)
    }
        const run = async () =>{
            await _callApi();
            await getUserDoc();
            Load();
        }
        // useEffect(()=>{
        //     run();

        // },[])
    

    return (
        <View>
            <Button title="get" onPress={()=>{_callApi();getUserDoc()}}/>
            <Button title="Load" onPress={run} />


        </View>

    );
}
export default LoadAgenda;