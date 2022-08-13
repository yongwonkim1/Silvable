import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Pressable, StyleSheet, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";

const NewMemo = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const addCollection = firestore().collection('memo');
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;

  const addText = async () => {
    try {
      await addCollection.add({
        email: email,
        uid: uid,
        title: title,
        text: text,
        date: Date.now(),
      });
      setTitle('');
      setText('');
      console.log('Create Complete!');
      navigation.navigate("MemoView")
    } catch (error) {
      console.log(error.message);
    }
  };
  // ...
  return (

    <View style={[styles.container]}>
      <View style={[styles.date]}>
        <TextInput style={[styles.title]} value={title} onChangeText={setTitle} placeholder="제목을 입력해주세요" multiline={true} />
      </View>
      <View style={[styles.text]}>
        <TextInput value={text} onChangeText={setText} placeholder="내용을 입력해주세요" multiline={true} style={[styles.input]} />
      </View>
      <Pressable title="저장" style={[styles.button]} onPress={addText}>
        <Text style={{ color: "white", fontSize: 30 }}>저장하기</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  date: {
    flex: 1,
    backgroundColor: '#ced4da',
    alignItems: 'center',
    justifyContent: 'center'

  },
  text: {
    flex: 10,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  input: {
    color: 'black',
    margin: 20,
    flexShrink: 1,
    height: 300,
    fontSize: 30,
    borderWidth: 2,
    borderColor: 'black',
    textAlignVertical: "top",
    padding: 20,
    borderRadius: 20,
    borderColor: '#868e96'
  },
  button: {
    backgroundColor: '#50ce60',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  new: {
    width: 80,
    height: 80,
    backgroundColor: '#ffdcff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'


  },
  title: {
    fontSize: 20,
    color: 'black',
  }
})


export default NewMemo;