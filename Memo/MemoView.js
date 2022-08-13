import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button,Pressable,TouchableHighlight} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";

function MemoView({navigation}) {
  const [users, setUsers] = useState();
  const usersCollection = firestore().collection('memo');
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;

  const _callApi = async () => {
    try {
      const data = await usersCollection.where("email","==",email).get();
      setUsers(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
      
    } catch (error) {
     
    }
  };

  useEffect(()=>{
    _callApi();
  })

  return (
    <View>
      
      {users?.map((row) => {
        return (
            <Pressable onPress={()=>navigation.navigate("MemoDetail",{
                title:row.title,
                text:row.text,
                id:row.id,
            })}>
        <Text>{row.title}{row.text}</Text>
        </Pressable>);
      })}
    </View>
  );
}
export default MemoView;