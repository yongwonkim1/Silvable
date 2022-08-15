import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, TouchableHighlight, ScrollView, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";
import { useNavigation } from '@react-navigation/native';

function MemoView() {
  const [users, setUsers] = useState();
  const usersCollection = firestore().collection('memo');
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;

  const [getContent, setGetContent] = useState([]);

  const [getSecondEmail, setGetSecondEmail] = useState("");

  const [isOwner, setIsOwner] = useState(true);

  const navigation = useNavigation();

  const _callApi = async () => {
    try {

      firestore().collection("memo").orderBy("date", "desc").onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGetContent(data);
      })

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

  useEffect(() => {
    _callApi();

    getUserDoc();

  })

  return (

    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.07, color: 'black', marginTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', margin: 5 }}>
        <Pressable
          style={{ alignItems: 'flex-end', }}
        >
          <Text style={{ fontSize: 30, color: 'black', backgroundColor: "skyblue", borderRadius: 10, padding: 5 }}>메모 추가</Text>
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {
          getContent.map((content) => uid == content.uid || getSecondEmail == content.email ? (<View key={content.id} style={styles.memoContainer}>
            <View style={{ flex: 5 }} >
              <Text style={{ fontSize: 50, color: 'black' }}>{content.title}</Text>
              <Text style={{ fontSize: 30, color: '#555555' }}>{content.text}</Text>
              <Text style={{ fontSize: 15, color: '#555555' }}>{content.email}</Text>
            </View>
            <Button
              onPress={() => {
                navigation.navigate("MemoDetail", {
                  title: content.title,
                  test: content.text,
                  email: content.email,
                })
              }}
              title="수정/삭제"></Button>
          </View>
          ) : null
          )
        }
      </ScrollView>
    </View>

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
    elevation: 20,
  }
})


export default MemoView;