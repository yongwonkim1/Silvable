import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Linking, Pressable, TextInput, Alert, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";
import { userCollection } from '../lib/user';
import { useNavigation } from '@react-navigation/native';
import { async } from '@firebase/util';
import Tts from "react-native-tts";

const MemoDetail = ({ route, navigation }) => {
  const [letter, setLetter] = useState("");
  onPressRead = () => {
    Tts.stop();
    Tts.speak(letter);
  };
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;
  const [title, setTitle] = useState(route.params?.title);
  const [text, setText] = useState(route.params?.text);
  const [contentEmail, setContentEmail] = useState(route.params?.email);
  const [id, setId] = useState(route.params?.id);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (contentEmail == email) {
      setIsOwner(true);
    }
  }, [])


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
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput style={styles.title} value={title} onChangeText={setTitle} multiline />
        <TextInput style={styles.text} value={text} onChangeText={setText} multiline />
        {isOwner ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
          <Pressable style={{ ...styles.editBtn, backgroundColor: '#6487ee' }} onPress={UpdateDB}>
            <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }}>수정</Text>
          </Pressable>
          <Pressable style={{ ...styles.editBtn, backgroundColor: '#ff6666' }} onPress={alertDelete}>
            <Text style={{ fontSize: 30, fontWeight: '800', color: 'black' }}>삭제</Text>

          </Pressable>
        </View> : null}
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
}
export default MemoDetail

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  title: {
    flex: 1,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 50,
    fontWeight: '600',
    borderRadius: 20,
  },
  text: {
    flex: 3,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 40,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  editBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
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