 import React ,{Fragment,Component, useState} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   Image,
   useColorScheme,
   View,
   Button,
   TextInput,
   TouchableOpacity
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 const ListCom = () =>{
   return(
     <TouchableOpacity style={[styles.listCom]}onPress={()=>alert("Show Detail")}>
       <Text style={{fontSize:30}}>제목</Text>
       <Text style={{fontSize:20}}>본문</Text>
 
     </TouchableOpacity>
   );
 };
const Memo = ({navigation}) =>{
   const isDarkMode = useColorScheme() === 'dark';
 
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
     <View>
     <SafeAreaView style={[styles.container]}>
       <View style={[styles.search]}>
         <TextInput placeholder='제목을 입력해주세요'>
         </TextInput>
         <Text>
         &#128269;
         </Text>
       </View>
     </SafeAreaView>
     
     <View style={[styles.listFrame]}>
       <View style={{flex:1}}>
           <ListCom/>
           <ListCom/>
           <ListCom/>
       </View>
       <View style={{flex:1}}>
           <ListCom/>
           <ListCom/>
           <ListCom/>
           <ListCom/>
 
       </View>
     </View>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container:{
     padding:2,
     backgroundColor:'#f5f5f5',
 
   },
   search:{
     justifyContent : 'space-between',
     alignItems: 'center',
     borderColor : 'grey',
     borderWidth : 3,
     borderRadius : 20,
     margin : 20,
     height: 50,
     padding:10,
     flexDirection: 'row'
   },
   listFrame:{
     padding:4,
     flexDirection:'row',
     height:300,
     alignContent:'stretch',
     justifyContent:'space-between'
   },
   listCom:{
     backgroundColor:'#f5f5f5',
     padding:10,
     margin:10,
     borderRadius:10,
     height:100
   }
 }
 );
 
 export default Memo;
 
 