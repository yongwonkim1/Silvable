import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, TouchableHighlight, ScrollView, RefreshControl, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";

function MemoView({ navigation }) {
  const [users, setUsers] = useState();
  const usersCollection = firestore().collection('memo');
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;
  const addCollection = firestore().collection('memo');

  const [getContent, setGetContent] = useState([]);

  const [getSecondEmail, setGetSecondEmail] = useState("");

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const _callApi = async () => {
    try {
      //const data = await usersCollection.where("email","==",email).orderBy("date","desc").get();
      firestore().collection("memo").orderBy("date", "desc").onSnapshot((snapshot) => {
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

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    _callApi();
    wait(1000).then(() => setRefreshing(false));
  }, []);

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

  useEffect(() => {
    _callApi();

    getUserDoc();
  })

  return (

    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.07, color: 'black', marginTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', margin: 5 }}>
        <Text style={{ color: '#999999', fontSize: 20, marginRight: 10 }}>아래로 당겨서 데이터 불러오기</Text>
        <Pressable
          style={{ alignItems: 'flex-end', }}
        >
          <Text style={{ fontSize: 30, color: 'black', backgroundColor: "skyblue", borderRadius: 10, padding: 5 }}>메모 추가</Text>
        </Pressable>
      </View>

      {/*  users?.map((row) => {
        return (
            <Pressable onPress={()=>navigation.navigate("MemoDetail",{
                title:row.title,
                text:row.text,
                id:row.id,
            })}>
        <Text>{row.title}{"\n"}{row.text}{"\n"}{row.email}</Text>
        </Pressable>);
      })  */}
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl  // 당겨서 새로고침 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {
          getContent.map((content) => uid == content.uid || getSecondEmail == content.email ? (
            <>
              <View style={styles.memoContainer}>
                <View style={{ flex: 5 }}>
                  <Text style={{ fontSize: 50, color: 'black' }}>{content.title}</Text>
                  <Text style={{ fontSize: 30, color: '#555555' }}>{content.text}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Pressable
                    style={{ flex: 1 }}
                    onPress={() => navigation.navigate("MemoDetail", {
                      title: row.title,
                      text: row.text,
                      id: content.id,
                    })}>
                    <Image source={require('./assets/edit.png')} style={{ width: '100%', height: '100%' }} />
                  </Pressable>
                  <Pressable
                    style={{ flex: 1 }}
                    onPress={() => {
                      Alert.alert("삭제", "메모를 삭제할까요?", [{
                        text: "아니요",
                        onPress: () => { },
                        style: "cancel",
                      }, {
                        text: "예",
                        onPress:
                          () => {
                            console.log("삭제버튼 클릭");
                            firestore().collection("memo").doc(content.id).delete();
                            getUserDoc();
                          },
                      }],
                        { cancelable: false, onDismiss: () => { } });
                      //await deleteDoc(doc(dbService, 'Memos', memoObj.id));
                    }
                    }
                  >
                    <Image source={require('./assets/delete.png')} style={{ width: '100%', height: '100%' }} />
                  </Pressable>
                </View>
              </View>
            </>
          )
            : null
          )
        }
      </ScrollView>
    </View >

  );
}

const styles = StyleSheet.create({
  memoContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 20,  // 안드로이드용 그림자
  }
})

export default MemoView;