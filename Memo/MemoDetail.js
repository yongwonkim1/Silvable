import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, TextInput, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";
import { userCollection } from '../lib/user';
import { useNavigation } from '@react-navigation/native';
import { async } from '@firebase/util';

const MemoDetail = ({ route, navigation }) => {
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;
  const [title, setTitle] = useState(route.params?.title);
  const [text, setText] = useState(route.params?.text);
  const [id, setId] = useState(route.params?.id);
  const addCollection = firestore().collection('memo');



  const navigation2 = useNavigation();


  const UpdateDB = async () => {
    await firestore().collection("memo").doc(id).update({
      title: title,
      text: text,
    })

    naviGo();
  }

  const naviGo = () => {
    navigation2.navigate("MemoView");
  }

  const DeleteDB = async () => {

    console.log("삭제버튼 클릭");
    await firestore().collection("memo").doc(id).delete();
    naviGo();

  };

  const alertDelete = () => {
    Alert.alert("삭제", "메모를 삭제할까요?", [{
      text: "아니요",
      onPress: () => { },
      style: "cancel",
    }, {
      text: "예",
      onPress: () => { DeleteDB() },
    }],
      { cancelable: false, onDismiss: () => { } });
    //await deleteDoc(doc(dbService, 'Memos', memoObj.id));
  }

  return (
    <View>
      <TextInput value={title} onChangeText={setTitle} />
      <TextInput value={text} onChangeText={setText} />
      <Button onPress={UpdateDB} title="수정" /><Button onPress={alertDelete} title="삭제" />

    </View>
  );
}
export default MemoDetail;