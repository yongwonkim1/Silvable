// // import App from './src/App'
// // export default App

// import React, { Fragment, Component, useState, useEffect } from 'react';
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   Image,
//   View,
//   Button,
//   TouchableOpacity,
//   TextInput
// } from 'react-native';

// const App = ({route,navigation}) => {
// const [plan,setPlan] = useState(route.params?.text)
// useEffect(()=>{
//   setPlan(route.params?.text)

// },[route.params?.text])

//   return (
//     <View style={[styles.container]}>
//       <View style={[styles.date]}>
//         <Text style={{fontSize:30}}>
//           2022-08-10
//         </Text>
//       </View>
//       <View style={[styles.text]}>
//         <TextInput value={plan} onChangeText={setPlan} placeholder="내용을 입력해주세요" multiline={true} style={[styles.input]}></TextInput>
//       </View>
      
//       <Pressable title="저장" style={[styles.button]} onPress={()=>navigation.goBack()}>
//         <Text style={{color:"white",fontSize:30}}>저장하기</Text>
//       </Pressable>
//       <View style={{position:'absolute', top:0, left:0, bottom:80, right:10, justifyContent:'flex-end', alignItems:'flex-end'}}>
//         <Pressable onPress={()=>navigation.navigate('Stt',{
//           back:'NewAgenda',
//           merge: true,})}>
//           <View style={[styles.new]}>
//             <Image style={{margin:10,flex:1,resizeMode:'contain'}}source={require('./assets/mic.png')}/>
//           </View>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   date: {
//     flex: 1,
//     backgroundColor: '#ced4da',
//     alignItems:'center',
//     justifyContent:'center'

//   },
//   text: {
//     flex: 10,
//     backgroundColor: 'white',
//     justifyContent:'flex-start',
//     alignItems:'stretch'
//   },
//   input:{
//     margin:20,
//     flexShrink:1,
//     height:300,
//     fontSize:30,
//     borderWidth:2,
//     borderColor:'black',
//     textAlignVertical:"top",
//     padding:20,
//     borderRadius:20,
//     borderColor:'#868e96'
//   },
//   button:{
//     backgroundColor:'#50ce60',
//     flex:1,
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   new:{
//     width:80,
//     height:80,
//     backgroundColor:'#ffdcff',
//     borderRadius:100,
//     alignItems:'center',
//     justifyContent:'center'


//   }

// })

// export default App;

import React, { useState,useContext,useEffect } from 'react';
import { View, TextInput, Button, Pressable, StyleSheet,Text, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../../contexts";
import DatePicker from 'react-native-date-picker'

  const NewAgenda = ({route,navigation}) => {
    const [plan,setPlan] = React.useState(route.params?.text)
  useEffect(()=>{
    setPlan(route.params?.text);

  },[route.params?.text]);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false);
  const addCollection = firestore().collection('plan');
  const userEmail = useContext(UserContext);
  const email = userEmail.user.email;
  const uid = userEmail.user.uid;

  const addAgenda = async () => {
    
    try {
      console.log(email,uid,JSON.stringify(date).substring(1,11),plan)
      await addCollection.add({
        email : email,
        uid: uid,
        date : JSON.stringify(date).substring(1,11),
        text: plan,
      });
      setPlan('');
      console.log('Create Complete!');
      navigation.navigate("Home")
    } catch (error) {
      console.log(error.message);
    }
  };
  // ...
  return (
    
    <View style={[styles.container]}>
      <View style={[styles.date]}>
        <Pressable onPress={()=>setOpen(true)}>
          <Text style={{fontSize:30}}>{JSON.stringify(date).substring(1,11)}</Text>
         </Pressable>
          <DatePicker
        modal
        locale='ko'
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        mode="date"
        onCancel={() => {
          setOpen(false)
        }}
      />
      </View>
      <View style={[styles.text]}>
        <TextInput value={plan} onChangeText={setPlan} placeholder="내용을 입력해주세요" multiline={true} style={[styles.input]}/>
      </View>
      <Pressable title="저장" style={[styles.button]} onPress={addAgenda}>
        <Text style={{color:"white",fontSize:30}}>저장하기</Text>
      </Pressable>
      <View style={{position:'absolute', top:0, left:0, bottom:80, right:10, justifyContent:'flex-end', alignItems:'flex-end'}}>
        <Pressable onPress={()=>navigation.navigate('Stt',{
          back:'NewAgenda',
          merge: true,})}>
          <View style={[styles.new]}>
            <Image style={{margin:10,flex:1,resizeMode:'contain'}}source={require('./assets/mic.png')}/>
          </View>
        </Pressable>
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
    alignItems:'center',
    justifyContent:'center'

  },
  text: {
    flex: 10,
    backgroundColor: 'white',
    justifyContent:'flex-start',
    alignItems:'stretch'
  },
  input:{
    margin:20,
    flexShrink:1,
    height:300,
    fontSize:30,
    borderWidth:2,
    borderColor:'black',
    textAlignVertical:"top",
    padding:20,
    borderRadius:20,
    borderColor:'#868e96'
  },
  button:{
    backgroundColor:'#50ce60',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  new:{
    width:80,
    height:80,
    backgroundColor:'#ffdcff',
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center'


  },
  title:{
  fontSize:20
  }
})


export default NewAgenda;