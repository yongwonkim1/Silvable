import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, Linking, ScrollView, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts";
import { useNavigation } from '@react-navigation/native';
import Tts from "react-native-tts";

function MemoView() {
  const [letter, setLetter] = useState("");
  onPressRead = () => {
    Tts.stop();
    Tts.speak(letter);
  };

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

  }, [])

  return (

    <View style={{ flex: 1 }}>

      <ScrollView style={{ flex: 1 }}>
        <React.StrictMode>{
          getContent.map((content) => uid == content.uid || getSecondEmail == content.email ? (
            <>
              <View style={styles.memoContainer} >
                <Pressable 
                onLongPress={() => {
                  setLetter(content.title);
                  onPressRead()
                }} style={{ flex: 4, paddingRight: 10, borderRightWidth: 1, borderRightColor: '#999999' }} >
                  <Text style={{ fontSize: 50, color: 'black' }} numberOfLines={1}>{content.title}</Text>
                  <Text style={{ fontSize: 30, color: '#555555' }} numberOfLines={1}>{content.text}</Text>
                  <Text style={{ fontSize: 15, color: '#555555' }} numberOfLines={1}>{content.email}</Text>
                </Pressable>
                <View style={{ flex: 1, paddingLeft: 10, marginTop: 20 }}>
                  <Pressable
                    style={{ flex: 1 }}
                    onPress={() => {
                      navigation.navigate("MemoDetail", {
                        title: content.title,
                        text: content.text,
                        email: content.email,
                        id: content.id,
                      })
                    }}>
                    <View style={{ flex: 1 }}>
                      <Image source={require('./assets/edit.png')} style={{ width: '100%', height: '60%' }} />
                      <Text style={{ color: 'black', fontWeight: '600', }}>?????? / ??????</Text>
                    </View>

                  </Pressable>
                </View>
              </View>
            </>
          ) : null)
        }
        </React.StrictMode>
      </ScrollView>
      <View style={{ height: 80 }}>
        <View style={[styles.bottomTap]}>
          <Pressable
            onPress={() => {
              navigation.pop();
            }}
            onLongPress={() => {
              setLetter("????????????");
              onPressRead()
            }}>
            <Image style={[styles.btImg]} source={require('./assets/back.jpg')} />
          </Pressable >
          <Pressable
            onPress={() => {
              navigation.popToTop();
            }}
            onLongPress={() => {
              setLetter("???");
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
            setLetter("?????????");
            onPressRead()
          }} onPress={() => navigation.navigate("Magnify")}>
            <Image style={[styles.btImg]} source={require('./assets/mag.png')} />
          </Pressable>
        </View>
      </View>
      <View style={{ position: 'absolute', right: 20, bottom: 100 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("NewMemo",)
          }}
          style={{ alignItems: 'flex-end', }}
        >
          <Text style={{ fontSize: 30, fontWeight: '900', color: 'black', backgroundColor: "skyblue", borderRadius: 10, padding: 5 }}>?????? ??????</Text>
        </Pressable>
      </View>
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


export default MemoView;