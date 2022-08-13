import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, RefreshControl, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";
import { ScrollView } from 'react-native';

function MemoView({ navigation }) {
  const [users, setUsers] = useState();
  const usersCollection = firestore().collection('memo');
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;
  const addCollection = firestore().collection('memo');

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const _callApi = async () => {
    try {
      const data = await usersCollection.where("email", "==", email).get();
      setUsers(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log(users);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    _callApi();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.04, color: 'black', marginTop: 10, alignItems: "center" }}>
        <Text style={{ color: 'black', fontSize: 20 }}>아래로 당겨서 데이터 불러오기</Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl  // 당겨서 새로고침 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {users?.map((row, idx) => {
          return (

            <View style={styles.memoContainer}>
              <View style={{ flex: 5 }}>
                <Text style={{ fontSize: 50, color: 'black' }}>{row.title}</Text>
                <Text style={{ fontSize: 30, color: '#555555' }}>{row.text}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => navigation.navigate("MemoDetail", {
                    title: row.title,
                    text: row.text,
                  })}>
                  <Image source={require('./assets/edit.png')} style={{ width: '100%', height: '100%' }} />
                </Pressable>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => {
                    try {
                      //   await addCollection.doc('').delete();
                      const rows = addCollection.where('title', '==', row.title);
                      rows.get().then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                          doc.ref.delete();
                        });
                      });
                      console.log('Delete Complete!', rows);
                      onRefresh();
                    } catch (error) {
                      console.log(error.message);
                    }
                  }}
                >
                  <Image source={require('./assets/delete.png')} style={{ width: '100%', height: '100%' }} />
                </Pressable>
              </View>
            </View>);
        })}
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

