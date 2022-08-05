import App from './src/App';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
export default App;
// /**
//  * @flow
//  */

//  import { CurrentRenderContext } from "@react-navigation/native";
// import React, { Component } from "react";
//  import {
//    Platform,
//    StyleSheet,
//    Text,
//    View,
//    Button,
//    FlatList,
//    TextInput,
//    Keyboard
//  } from "react-native";
//  import Tts from "react-native-tts";

//  const App = () => {
//   state = {
//     text: "샘플 텍스트"
//   }
//   const _onPressButton = () => {
//     Tts.stop();
//     Tts.speak(this.state.text);
//   };
//   return (
//     <View>
//       <Button onPress={_onPressButton}
//       title="tts"
//       />
//     </View>
//   )
// }

// export default App;