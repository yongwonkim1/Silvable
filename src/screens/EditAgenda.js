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
//JSON.stringify(route.params?.text)
const App = ({navigation,route}) => {
  const [plan,setPlan] = React.useState(route.params?.text)
  useEffect(()=>{
    setPlan(route.params?.text);

  },[route.params?.text]);
  return (
    <View style={[styles.container]}>
      <View style={[styles.date]}>
        <Text style={{fontSize:30}}>
          {plan}
          {route.params?.text}
        </Text>
      </View>
      <View style={[styles.text]}>
        <TextInput value={plan}  onChangeText={setPlan} multiline={true} style={[styles.input]}></TextInput> 
      </View>
      <View style={[styles.button]}>
        
      <Pressable style={[styles.button2]} onPress={()=>navigation.goBack()}>
        <Text style={{marginTop:10,flex:1,color:"white",fontSize:30}}>수정</Text>
        {/*파이어베이스 수정추가*/}
      </Pressable>
      <Pressable style={[styles.button3]} onPress={()=>navigation.goBack()}>
        <Text style={{marginTop:10,flex:1, color:"white",fontSize:30}}>삭제</Text>
        {/*파이어베이스 삭제추가*/}
      </Pressable>
      </View>
      <View style={{position:'absolute', top:0, left:0, bottom:80, right:10, justifyContent:'flex-end', alignItems:'flex-end'}}>
        <Pressable onPress={()=>navigation.navigate('Stt',{
          back:'EditAgenda',
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
    backgroundColor:'#ffb0cf',
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
    backgroundColor:'#becdff'
  },
  new:{
    width:80,
    height:80,
    backgroundColor:'#ffdcff',
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center'


  }


})

export default App;

