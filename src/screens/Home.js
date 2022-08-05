
 import React ,{Fragment,Component, useState} from 'react';
 import {
   Pressable,
   StyleSheet,
   Text,
   Image,
   View,
   Button,
   TouchableOpacity
 } from 'react-native';
 import Tts from "react-native-tts";
 const Home = ({navigation}) => {
  const [letter, setLetter] = useState("");
  onPressRead = () => {
    Tts.stop();
    Tts.speak(letter);
  };

   return (
     <View style={[styles.container]}>
       <View style={{flex:1}}></View>
       <View style={[styles.subCon]}>
         <Pressable style={[styles.element, {flex:3,backgroundColor:'#19ce60'}]}
         onLongPress={()=> {
          setLetter("집으로 길안내");
          onPressRead()}}>
           <Image style={[styles.eleImg]} source={require('./assets/집.png')}></Image>
           <Text style={[styles.eleText]}>집으로 길안내</Text>
         </Pressable>
         <Pressable style={[styles.element, {flex:2,backgroundColor:'white'}]}
         onLongPress={()=> {
          setLetter("병원");
          onPressRead()}}>
           <Image style={[styles.eleImg]} source={require('./assets/병원.png')}></Image>
           <Text style={[styles.eleText]}>병원찾기</Text>
         </Pressable>
       </View>
       <View style={[styles.subCon]}>
        <Pressable style={[styles.element, {flex:3,backgroundColor:'white'}]}
        onLongPress={()=> {
          setLetter("가까운 경찰서");
          onPressRead()}}>
          <Image style={[styles.eleImg]} source={require('./assets/경찰.png')}></Image>
          <Text style={[styles.eleText]}>가까운 경찰서</Text>
        </Pressable>
        <Pressable style={[styles.element, {flex:2,backgroundColor:'#b5e61d'}]} onPress={()=>navigation.navigate('Stt')}
        onLongPress={()=> {
          setLetter("음성인식");
          onPressRead()}}>
          <Image style={[styles.eleImg]} source={require('./assets/음성인식.png')}></Image>
          <Text style={[styles.eleText]}>음성인식</Text>
        </Pressable>
       </View>
       <View style={[styles.subCon]}>
       <Pressable style={[styles.element, {flex:3,backgroundColor:'#87f8c8'}]}
       onLongPress={()=> {
        setLetter("정보수정");
        onPressRead()}}>
         <Image style={[styles.eleImg]} source={require('./assets/정보수정.png')}></Image>
         <Text style={[styles.eleText]}>정보 수정</Text>
       </Pressable>
       <Pressable style={[styles.element, {flex:2,backgroundColor:'white'}]}
       onLongPress={()=> {
        setLetter("달력");
        onPressRead()}}>
         <Image style={[styles.eleImg]} source={require('./assets/달력.png')}></Image>
         <Text style={[styles.eleText]}>달력</Text>
       </Pressable>
       </View>
       <View style={{height:100}}>
         <View style={[styles.bottomTap]}>
           <Image style={[styles.btImg]} source={require('./assets/뒤로가기.jpg')}/>
           <Image style={[styles.btImg]} source={require('./assets/홈.png')}/>
           <Image style={[styles.btImg]} source={require('./assets/119.png')}/>
           <Image style={[styles.btImg]} source={require('./assets/돋보기.png')}/>
         </View>
       </View>
     </View>
    
   );
 };
 
 const styles = StyleSheet.create({
   container:{
     flex:1,
     padding:2,
     backgroundColor:'#f5f5f5'
 
   },
   subCon:{
     flex:1,
     flexDirection:'row'
   },
   element:{
     borderRadius:30,
     margin:10,
     padding:15,
     flex:1,
     shadowColor:'gray',
     shadowOffset:{
       width:5,
       height:5},
       shadowOpacity:0.5,
       shadowRadius:5  
     
   
   },
   eleImg:{
     height:50,
     width:50,
     marginBottom:15,
     marginTop:10
   },
   eleText:{
     fontSize:30
   },
   bottomTap:{
     flex:1,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-around',
     borderTopColor:'black',
     backgroundColor:'white',
     marginTop:20
   },
   btImg:{
     height:50,
     width:50
   }
   }
   
 );
 
 export default Home;
 
 
