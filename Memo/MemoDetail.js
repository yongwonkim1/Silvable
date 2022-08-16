import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, TextInput, Alert, Image } from 'react-native';
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
          <Button style={styles.editBtn} onPress={UpdateDB} title="수정" />
          <Button style={styles.removeBtn} onPress={alertDelete} title="삭제" />
        </View> : null}
      </View>
      <View style={{ height: 100, bottom: 0 }}>
        <View style={[styles.bottomTap]}>
          <Pressable
            onPress={() => {
              navigation.pop();
            }}
            onLongPress={() => {
              setLetter("뒤로가기");
              onPressRead()
            }}>
            <Image style={[styles.btImg]} source={require('./assets/뒤로가기.jpg')} />
          </Pressable >
          <Pressable
            onPress={() => {
              navigation.popToTop();
            }}
            onLongPress={() => {
              setLetter("홈");
              onPressRead()
            }}>
            <Image style={[styles.btImg]} source={require('./assets/홈.png')} />
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
            <Image style={[styles.btImg]} source={require('./assets/돋보기.png')} />
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
    fontSize: 500,
  },
  removeBtn: {
    flex: 1,
  },
  bottomTap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: 'black',
    backgroundColor: 'white',
    marginTop: 20
  },
  btImg: {
    height: 50,
    width: 50
  }
})