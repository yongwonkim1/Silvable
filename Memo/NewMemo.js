import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Pressable, StyleSheet, Text, Image, Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";
import { useEffect } from 'react';
import Tts from "react-native-tts";

const NewMemo = ({ route, navigation }) => {
  const [letter, setLetter] = useState("");
  onPressRead = () => {
    Tts.stop();
    Tts.speak(letter);
  };
  const [title, setTitle] = useState(route.params?.title);
  const [text, setText] = useState(route.params?.text);
  const addCollection = firestore().collection('memo');
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;
  useEffect(() => {
    setTitle(route.params?.title);
    setText(route.params?.text);
  }, [route.params?.title,route.params?.text])
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
        <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate("Stt2", {
          back: "NewMemo",
          merge: true,
        })}>
          <Image style={{ flex: 1, width: '50%', height: '100%', }} source={require('./assets/mic.png')} />
        </Pressable>
      </View>
      <View style={[styles.text]}>
        <TextInput value={text} onChangeText={setText} placeholder="내용을 입력해주세요" multiline={true} style={[styles.input]} />
      </View>
      <Pressable title="저장" style={[styles.button]} onPress={addText}>
        <Text style={{ color: "white", fontSize: 30 }}>저장하기</Text>
      </Pressable>
      <View style={{ position: 'absolute', top: 0, left: 0, bottom: 80, right: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Pressable onPress={() => navigation.navigate('Stt', {
          back: 'NewMemo',
          merge: true,
        })}>
          <View style={[styles.new]}>
            <Image style={{ margin: 10, flex: 1, resizeMode: 'contain' }} source={require('./assets/mic.png')} />
          </View>
        </Pressable>
      </View>
      <View style={{ height: 80, bottom: 0 }}>
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
    justifyContent: 'space-between',
    flexDirection: 'row'

  },
  title: {
    flex: 4,
    fontSize: 20,
    color: 'black',
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
})


export default NewMemo;