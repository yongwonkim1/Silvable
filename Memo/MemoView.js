import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button,Pressable,TouchableHighlight, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";

function MemoView({navigation}) {
  const [users, setUsers] = useState();
  const usersCollection = firestore().collection('memo');
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;

  const [getContent, setGetContent] = useState([]);

  const [getSecondEmail, setGetSecondEmail] = useState("");

  const _callApi = async () => {
    try {
      //const data = await usersCollection.where("email","==",email).orderBy("date","desc").get();
      firestore().collection("memo").orderBy("date","desc").onSnapshot((snapshot)=>{
        const data = snapshot.docs.map((doc)=>({
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

    data.map((doc)=> {if(doc.creatorId == uid){
      setGetSecondEmail(doc.secondId);
  }})

    }

  useEffect(()=>{
    _callApi();

    getUserDoc();
  })

  return (
    <ScrollView>
    <View>
      
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

      {
        getContent.map((content)=> uid == content.uid || getSecondEmail == content.email ? (
          <Pressable onPress={()=>navigation.navigate("MemoDetail",{
            title:content.title,
            text:content.text,
            id:content.id,
        })}>
    <Text>{content.title}{"\n"}{content.text}{"\n"}{content.email}</Text>
    </Pressable>
        ): null
        )
      }
    </View>
    </ScrollView>
  );
}
export default MemoView;