import React, { Fragment, Component, useState, useContext, useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  Linking
} from 'react-native';
import { UserContext } from '../../contexts';
import Tts from "react-native-tts";
import firestore from '@react-native-firebase/firestore';
const Home = ({ navigation }) => {
  const [letter, setLetter] = useState("");
  onPressRead = () => {
    Tts.stop();
    Tts.speak(letter);
  };
  /* 여기부터 일정관리때매 ㅎㅎ */

  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;
  const [result, setResult] = useState([]);
  const [getSecondEmail, setGetSecondEmail] = useState("");

  const _callApi = async () => {
    try {
      const docRef = await firestore().collection('plan').orderBy("date", "desc").get();

      const data = docRef.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))

      const item = [];
      data.map((doc) => {
        if (uid == doc.uid || getSecondEmail == doc.email) {
          item.push(doc.date)
          item.push(doc.text)
        }
      })
      console.log(item);
      setResult(item);
      console.log(result);
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
  /*여기까지 일정관리떄매 ㅎㅎ */

  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ height: 150, widht: 150, resizeMode: 'contain' }} source={require('./assets/logo.png')} />
      </View>
      <View style={[styles.subCon]}>
        <Pressable style={[styles.element, { flex: 2, backgroundColor: '#ffe3ee' }]}
          onPress={() => navigation.navigate('MapToHome')}
          onLongPress={() => {
            setLetter("집으로 안내");
            onPressRead()
          }}>
          <Image style={[styles.eleImg]} source={require('./assets/toHome.png')}></Image>
          <Text style={[styles.eleText]}>집으로 안내</Text>
        </Pressable>
        <Pressable style={[styles.element, { flex: 2, backgroundColor: 'white' }]}
          onPress={() => navigation.navigate('Hospital')}
          onLongPress={() => {
            setLetter("병원 안내");
            onPressRead()
          }}>
          <Image style={[styles.eleImg]} source={require('./assets/hospital.png')}></Image>
          <Text style={[styles.eleText]}>병원 안내</Text>
        </Pressable>
      </View>
      <View style={[styles.subCon]}>
        <Pressable style={[styles.element, { flex: 2, backgroundColor: 'white' }]}
          onPress={() => navigation.navigate('MapToPolice')}
          onLongPress={() => {
            setLetter("경찰서 안내");
            onPressRead()
          }}>
          <Image style={[styles.eleImg]} source={require('./assets/police.png')}></Image>
          <Text style={[styles.eleText]}>경찰서 안내</Text>
        </Pressable>
        <Pressable style={[styles.element, { flex: 2, backgroundColor: '#ffcad5' }]} onPress={() => navigation.navigate('MemoView')}
          onLongPress={() => {
            setLetter("메모장");
            onPressRead()
          }}>
          <Image style={[styles.eleImg]} source={require('./assets/memo.png')}></Image>
          <Text style={[styles.eleText]}>메모장</Text>
        </Pressable>
      </View>
      <View style={[styles.subCon]}>
        <Pressable style={[styles.element, { flex: 2, backgroundColor: '#ffc8cd' }]}
          onPress={() => navigation.navigate('Settings')}
          onLongPress={() => {
            setLetter("정보수정");
            onPressRead()
          }}>
          <Image style={[styles.eleImg]} source={require('./assets/setting.png')}></Image>
          <Text style={[styles.eleText]}>정보 수정</Text>
        </Pressable>
        <Pressable style={[styles.element, { flex: 2, backgroundColor: 'white' }]}
          onPress={() => navigation.navigate('Agenda', {
            result
          })}
          onLongPress={() => {
            setLetter("일정 관리");
            onPressRead()
          }}>
          <Image style={[styles.eleImg]} source={require('./assets/celender.png')}></Image>
          <Text style={[styles.eleText]}>일정 관리</Text>
        </Pressable>
      </View>
      <View style={{ height: 100 }}>
        <View style={[styles.bottomTap]}>
          <Pressable
            onLongPress={() => {
              setLetter("뒤로가기");
              onPressRead()
            }}>
            <Image style={[styles.btImg]} source={require('./assets/back.jpg')} />
          </Pressable >
          <Pressable
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
    padding: 2,
    backgroundColor: '#fff0f5'

  },
  subCon: {
    flex: 1,
    flexDirection: 'row'
  },
  element: {
    borderRadius: 30,
    margin: 10,
    padding: 15,
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,  // 안드로이드용 그림자
  },
  eleImg: {
    flex: 1,
    width: '50%',
    resizeMode: "stretch"
  },
  eleText: {
    flex: 1,
    fontSize: 25,
    color: 'black',
    marginTop: 10,
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
}

);

export default Home;