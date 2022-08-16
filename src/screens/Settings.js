// import React, { Component,useContext } from "react";
// import {
//     Platform,
//     StyleSheet,
//     Text,
//     View,
//     Button,
//     FlatList,
//     TextInput,
//     Slider,
//     Keyboard
// } from "react-native";
// import TtsContext from '../../contexts/Tts'
// import Tts from "react-native-tts";
// type Props = {};
// export default class Settings extends React.Component<Props> {
//     state = {
//         voices: [],
//         ttsStatus: "initiliazing",
//         selectedVoice: null,
//         speechRate: 0.5,
//         speechPitch: 1,
//         text: "이 목소리로 읽습니다."
//     };


//     constructor(props) {
//         super(props);
//         Tts.setDefaultRate(this.state.speechRate);
//         Tts.setDefaultPitch(this.state.speechPitch);
//     }

//     setSpeechRate = async rate => {
//         await Tts.setDefaultRate(rate);
//         this.setState({ speechRate: rate });
//     };

//     setSpeechPitch = async rate => {
//         await Tts.setDefaultPitch(rate);
//         this.setState({ speechPitch: rate });
//     };
//     render() {
//         const { dispatch } = useContext(TtsContext);
//         const onSubmit = async () => { 
//             const info = { rate, pitch };
//             try {
//               dispatch(info)
//               navigation.reset({
//                 routes: [{ name: "Home" }],
//               });
//             } catch (e) {
//               Alert.alert("로그인에 실패하였습니다.");
//             }
//           }
//         return (
//             <View>
//                 <Slider
//                     style={styles.slider}
//                     minimumValue={0.2}
//                     maximumValue={0.8}
//                     value={this.state.speechRate}
//                     onSlidingComplete={this.setSpeechRate}
//                 />

//                 <View style={styles.sliderContainer}>
//                     <Text
//                         style={styles.sliderLabel}
//                     >{`Pitch: ${this.state.speechPitch.toFixed(2)}`}</Text>
//                     <Slider
//                         style={styles.slider}
//                         minimumValue={0.8}
//                         maximumValue={1.7}
//                         value={this.state.speechPitch}
//                         onSlidingComplete={this.setSpeechPitch}
//                     />
//                 </View>
//                 <FlatList
//                     keyExtractor={item => item.id}
//                     renderItem={this.renderVoiceItem}
//                     extraData={this.state.selectedVoice}
//                     data={this.state.voices}
//                 />
//                 <Button title="testContext" onPress={() => { Tts.stop(); Tts.speak(this.state.text) }} />
//             </View>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     sliderContainer: {
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     sliderLabel: {
//         textAlign: "center",
//         marginRight: 20
//     },
//     slider: {
//         width: 150
//     },
// })
import React, { Component, useContext, useState } from "react";
import { Text, View, Image, Pressable, TextInput, Button } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../contexts'
import { useEffect } from "react";

const Settings = ({ route, navigation }) => {
  const addCollection = firestore().collection('address');
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;
  const [address, setAddress] = React.useState(route.params?.text)

  useEffect(() => {
    setAddress(route.params?.text)
  }, [route.params?.text])

  const addAddress = async () => {
    try {
      await addCollection.add({
        email: email,
        uid: uid,
        address: address
      });
      setAddress('');
      console.log('Create Complete!');
      navigation.navigate("Home")
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 40, alignContent: 'center' }}>주소를 입력해주세요</Text>
      <View style={{ borderRadius: 30, backgroundColor: 'white', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput style={{ marginTop: 30, flex: 6, }} value={address} onChangeText={setAddress} />
        <Pressable onPress={() => navigation.navigate("Stt", {
          back: "Settings",
          merge: true
        })} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ margin: 30, flex: 1, resizeMode: 'center' }} source={require('./assets/mic.png')} />
        </Pressable>
      </View>

      <Pressable style={{ borderRadius: 30, margin: 50, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffb0cf' }} title="주소 저장하기" onPress={addAddress}>
        <Text style={{ color: 'white', fontSize: 30 }}>주소 저장하기</Text>
      </Pressable>
      <Pressable style={{ borderRadius: 30, margin: 50, flex: 1, backgroundColor: '#becdff', color: 'white', justifyContent: 'center', alignItems: 'center' }} title="로그아웃" onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: 'white', fontSize: 30 }}>로그아웃</Text>
      </Pressable>

    </View>
  );
}

export default Settings;