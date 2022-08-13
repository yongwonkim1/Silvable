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
      console.log(users);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View>
      <Button title="데이터 불러오기" onPress={_callApi}/>
      
      {users?.map((row, idx) => {
        return (
            <Pressable onPress={()=>navigation.navigate("MemoDetail",{
                title:row.title,
                text:row.text,
            })}>
        <Text>{row.title}{row.text}</Text>
        </Pressable>);
      })}
    </View>
  );
}
export default MemoView;