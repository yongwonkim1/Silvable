
import React, { Fragment, Component, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  Linking
} from 'react-native';
import Tts from "react-native-tts";
const Home = ({ navigation }) => {
  const [letter, setLetter] = useState("");
  onPressRead = () => {
    Tts.stop();
    Tts.speak(letter);
  };

  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
        <Image style={{height:150, widht:150, resizeMode:'contain'}} source={require('./assets/logo.png')}/>
      </View>
      <View style={[styles.subCon]}>
        <Pressable style={[styles.element, { flex: 2, backgroundColor: '#ffe3ee' }]}
          onPress={() => navigation.navigate('MapToHome')}
          onLongPress={() => {
            setLetter("집으로 길안내");
            onPressRead()
          }}>
          <Image style={[styles.eleImg]} source={require('./assets/집.png')}></Image>
          <Text style={[styles.eleText]}>집으로 길안내</Text>
        </Pressable>
        <Pressable style={[styles.element, { flex: 2, backgroundColor: 'white' }]}
          onPress={() => navigation.navigate('Hospital')}
          onLongPress={() => {
            setLetter("병원 안내");
            onPressRead()
          }}>
          <Image style={[styles.eleImg]} source={require('./assets/병원.png')}></Image>
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
          <Image style={[styles.eleImg]} source={require('./assets/경찰.png')}></Image>
          <Text style={[styles.eleText]}>경찰서 안내</Text>
        </Pressable>
        <Pressable style={[styles.element, { flex: 2, backgroundColor: '#ffcad5' }]} onPress={() => navigation.navigate('Stt',
          {
          back:'Home',
        })}
          onLongPress={() => {
            setLetter("메모장");
            onPressRead()
          }}>
          <Image style={[styles.eleImg]} source={require('./assets/메모장.png')}></Image>
          <Text style={[styles.eleText]}>메모장</Text>
        </Pressable>
      </View>
      <View style={[styles.subCon]}>
        <Pressable style={[styles.element, { flex: 2, backgroundColor: '#ffc8cd' }]}
          onPress={() => navigation.navigate('Login')}
          onLongPress={() => {
            setLetter("정보수정");
            onPressRead()
          }}>
          <Image style={[styles.eleImg]} source={require('./assets/정보수정.png')}></Image>
          <Text style={[styles.eleText]}>정보 수정</Text>
        </Pressable>
        <Pressable style={[styles.element, { flex: 2, backgroundColor: 'white' }]}
          onPress={() => navigation.navigate('Agenda')}
          onLongPress={() => {
            setLetter("일정 관리");
            onPressRead()
          }}>
          <Image style={[styles.eleImg]} source={require('./assets/달력.png')}></Image>
          <Text style={[styles.eleText]}>일정 관리</Text>
        </Pressable>
      </View>
      <View style={{ height: 100 }}>
        <View style={[styles.bottomTap]}>
          <Pressable onLongPress={() => {
            setLetter("뒤로가기");
            onPressRead()
          }}>
            <Image style={[styles.btImg]} source={require('./assets/뒤로가기.jpg')} />
          </Pressable >
          <Pressable onLongPress={() => {
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
    height: 50,
    width: 50,
    marginBottom: 15,
    marginTop: 10
  },
  eleText: {
    fontSize: 30,
    color: 'black'
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



