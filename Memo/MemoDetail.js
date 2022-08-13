import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button,Pressable,TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";
import { userCollection } from '../lib/user';

const MemoDetail = ({route, navigation}) => {
    const userEmail = useContext(UserContext);
    const email = userEmail.user.email;
    const uid = userEmail.user.uid;
    const [title,setTitle] = useState(route.params?.title);
    const [text,setText] = useState(route.params?.text);
    const addCollection = firestore().collection('memo');
    const UpdateDB = async () => {
      try {
        const rows = await addCollection.where('title', '==',title);
        rows.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({ title : title, text:text});
            console.log(title,text)
          });
        });
        console.log('Update Complete!', rows);
      } catch (error) {
        console.log(error.message);
      }}
    
    const DeleteDB = async () => {
      try {
        //   await addCollection.doc('').delete();
        const rows = await addCollection.where('title', '==',title);
        rows.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });
        console.log('Delete Complete!', rows);
      } catch (error) {
        console.log(error.message);
      }
    };

    return(
        <View>
            <TextInput value={title} onChangeText={setTitle}/>
            <TextInput value={text} onChangeText={setText}/>
            <Button  onPress={UpdateDB} title="수정"/><Button onPress={DeleteDB} title="삭제"/>

        </View>
    );
}
export default MemoDetail;