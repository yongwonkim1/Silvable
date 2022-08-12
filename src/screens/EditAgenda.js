// import App from './src/App'
// export default App

import { jsonEval } from '@firebase/util';
import React, { Fragment, Component, useState, useEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native';

const App = ({navigation,route}) => {
  const [plan,setPlan] = React.useState(route.params?.text)
  // useEffect(()=>{
  //   setPlan(route.params?.text);

  // },[route.params?.text]);
  return (
    <View style={[styles.container]}>
      <View style={[styles.date]}>
        <Text style={{fontSize:30}}>
          {plan}
          {route.params?.text}
        </Text>
      </View>
      <View style={[styles.text]}>
        <TextInput value={plan} onchange={setPlan} multiline={true} style={[styles.input]}></TextInput> 
      </View>
      <View style={[styles.button]}>
        <Button title="음성인식" onPress={()=>navigation.navigate('Stt',{
          
          back:'EditAgenda',
          merge: true,})}/>
      <Pressable style={[styles.button2]} onPress={()=>naviagtion.goBack()}>
        <Text style={{marginTop:10,flex:1,color:"white",fontSize:30}}>수정</Text>
      </Pressable>
      <Pressable style={[styles.button3]} onPress={()=>naviagtion.goBack()}>
        <Text style={{marginTop:10,flex:1, color:"white",fontSize:30}}>삭제</Text>
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
    height:400,
    fontSize:30,
    borderWidth:2,
    borderColor:'black',
    textAlignVertical:"top",
    padding:20,
    borderRadius:20,
    borderColor:'#868e96',
  },
  button:{
    backgroundColor:'#50ce60',
    flex:1,
    flexDirection:'row'
  },
  button2:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  button3:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    backgroundColor:'orange'
  }


})

export default App;


