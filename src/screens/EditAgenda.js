// import App from './src/App'
// export default App

import { jsonEval } from '@firebase/util';
import React, { Fragment, Component, useState, useEffect, useContext } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  Linking,
  TouchableOpacity,
  TextInput
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../../contexts";
//JSON.stringify(route.params?.text)
import Tts from "react-native-tts";
const App = ({ navigation, route }) => {
  const [letter, setLetter] = useState("");
  onPressRead = () => {
    Tts.stop();
    Tts.speak(letter);
  };
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;
  const [plan, setPlan] = React.useState(route.params?.text)
  const [open, setOpen] = useState(false);
  const addCollection = firestore().collection('plan');
  const UpdateDB = async () => {
    try {
      const rows = await addCollection.where('date', '==', route.params?.date).where("email", '==', email);
      rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({ text: plan });
        });
      });
      console.log('Update Complete!', rows);
    } catch (error) {
      console.log(error.message);
    }
  };
  const DeleteDB = async () => {
    try {
      //   await addCollection.doc('').delete();
      const rows = await addCollection.where('date', '==', route.params.date).where("email", '==', email);
      rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
      console.log('Delete Complete!', rows);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    setPlan(route.params?.text);


  }, [route.params?.text]);
  return (
    <View style={[styles.container]}>
      <View style={[styles.date]}>
        <Text style={{ fontSize: 30 }}>{route.params?.date}</Text>
      </View>
      <View style={[styles.text]}>
        <TextInput value={plan} onChangeText={setPlan} multiline={true} style={[styles.input]}></TextInput>
      </View>
      <View style={[styles.button]}>

        <Pressable style={[styles.button2]} onPress={() => { UpdateDB(); navigation.navigate("Home") }}>
          <Text style={{ marginTop: 10, flex: 1, color: "white", fontSize: 30 }}>수정</Text>
          {/*파이어베이스 수정추가*/}
        </Pressable>
        <Pressable style={[styles.button3]} onPress={() => { DeleteDB(); navigation.navigate("Home") }}>
          <Text style={{ marginTop: 10, flex: 1, color: "white", fontSize: 30 }}>삭제</Text>
          {/*파이어베이스 삭제추가*/}
        </Pressable>
      </View>
      <View style={{ position: 'absolute', top: 0, left: 0, bottom: 80, right: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Pressable onPress={() => navigation.navigate('Stt', {
          back: 'EditAgenda',
          merge: true,
        })}>
          <View style={[styles.new]}>
            <Image style={{ margin: 10, flex: 1, resizeMode: 'contain' }} source={require('./assets/mic.png')} />
          </View>
        </Pressable>
      </View>
      <View style={{ height: 80 }}>
        <View style={[styles.bottomTap]}>
          <Pressable
            onPress={() => {
              navigation.pop();
            }}
            onLongPress={() => {
              setLetter("뒤로가기");
              onPressRead()
            }}>
            <Image style={[styles.btImg]} source={require('./assets/back.jpg')} />
          </Pressable >
          <Pressable
            onPress={() => {
              navigation.popToTop();
            }}
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
  },
  date: {
    flex: 1,
    backgroundColor: '#ced4da',
    alignItems: 'center',
    justifyContent: 'center'

  },
  text: {
    flex: 10,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  input: {
    margin: 20,
    flexShrink: 1,
    height: 400,
    fontSize: 30,
    borderWidth: 2,
    borderColor: 'black',
    textAlignVertical: "top",
    padding: 20,
    borderRadius: 20,
    borderColor: '#868e96',
  },
  button: {
    backgroundColor: '#ffb0cf',
    flex: 1,
    flexDirection: 'row'
  },
  button2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  button3: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#becdff'
  },
  new: {
    width: 80,
    height: 80,
    backgroundColor: '#ffdcff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'


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

export default App;


