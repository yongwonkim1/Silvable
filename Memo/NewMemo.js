import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Pressable, StyleSheet, Text,Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";
import { useEffect } from 'react';

const NewMemo = ({ route,navigation }) => {
  const [title, setTitle] = useState(route.params?.title);
  const [text, setText] = useState(route.params?.text);
  const addCollection = firestore().collection('memo');
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;
useEffect(()=>{
  setTitle(route.params?.title);
  setText(route.params?.text);
},[route.params?.title])
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
        <Pressable style={{flex:1}} onPress={()=> navigation.navigate("Stt2",{
          back:"NewMemo",
          merge:true,})}><Image style={{flex:3,resizeMode:'contain'}}source={require('./assets/mic.png')}></Image></Pressable>
      </View>
      <View style={[styles.text]}>
        <TextInput value={text} onChangeText={setText} placeholder="내용을 입력해주세요" multiline={true} style={[styles.input]} />
      </View>
      <Pressable title="저장" style={[styles.button]} onPress={addText}>
        <Text style={{ color: "white", fontSize: 30 }}>저장하기</Text>
      </Pressable>
      <View style={{position:'absolute', top:0, left:0, bottom:80, right:10, justifyContent:'flex-end', alignItems:'flex-end'}}>
        <Pressable onPress={()=>navigation.navigate('Stt',{
          back:'NewMemo',
          merge: true,})}>
          <View style={[styles.new]}>
            <Image style={{margin:10,flex:1,resizeMode:'contain'}}source={require('./assets/mic.png')}/>
          </View>
        </Pressable>
      </View>
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
    justifyContent: 'center',
    flexDirection:'row'

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