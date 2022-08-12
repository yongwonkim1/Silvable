// import App from './src/App'
// export default App

import React, { Fragment, Component, useState, useEffect } from 'react';
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

const App = ({route,navigation}) => {
const [plan,setPlan] = useState(route.params?.text)
useEffect(()=>{
  setPlan(route.params?.text)

})

  return (
    <View style={[styles.container]}>
      <View style={[styles.date]}>
        <Text style={{fontSize:30}}>
          2022-08-10
        </Text>
      </View>
      <View style={[styles.text]}>
        <TextInput value={plan} onChange={setPlan} placeholder="내용을 입력해주세요" multiline={true} style={[styles.input]}></TextInput>
      </View>
      <Button title="음성인식" onPress={()=>navigation.navigate('Stt',{
          back:'NewAgenda',
          merge: true,})}/>
      <Pressable title="저장" style={[styles.button]} onPress={()=>navigation.goBack()}>
        <Text style={{color:"white",fontSize:30}}>저장하기</Text>
      </Pressable>
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
  }

})

export default App;

