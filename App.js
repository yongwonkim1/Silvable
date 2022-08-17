
import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";

import { UserProvider } from './contexts';

import { theme } from './theme';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import NewMemo from './Memo/NewMemo';
import Home from './src/screens/Home';
// import Memo from '.src/screens/Memo';
import Stt from './src/screens/Stt';
import Stt2 from './src/screens/Stt2';
import Hospital from './src/screens/Hospital';
import MapToHospital from './src/screens/MapToHospital';
import MapToHome from './src/screens/MapToHome';
import MapToPolice from './src/screens/MapToPolice';
import Magnify from './src/screens/Magnify';
import Agenda from './src/screens/Agenda';
import EditAgenda from './src/screens/EditAgenda';
import NewAgenda from './src/screens/NewAgenda';
import MemoView from './Memo/MemoView';
import MemoDetail from './Memo/MemoDetail';
import Settings from './src/screens/Settings';

const Stack = createStackNavigator();

export default function App() {
  return (

    <UserProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: true,
            }}
          >
            <Stack.Screen name="Login" component={Login} options={{ title: '로그인' }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
            <Stack.Screen name="NewMemo" component={NewMemo} options={{ title: '메모 작성' }} />
            <Stack.Screen name="MemoView" component={MemoView} options={{ title: '메모' }} />
            <Stack.Screen name="Home" component={Home} options={{ title: '홈' }} />
            {/* <Stack.Screen name="Memo" component={Memo} /> */}
            <Stack.Screen name="Stt" component={Stt} options={{ title: '음성인식' }} />
            <Stack.Screen name="Stt2" component={Stt2} options={{ title: '음성인식' }} />
            <Stack.Screen name="Hospital" component={Hospital} options={{ title: '병원 찾기' }} />
            <Stack.Screen name="Magnify" component={Magnify} options={{ title: '돋보기' }} />
            <Stack.Screen name="MapToHospital" component={MapToHospital} options={{ title: '가까운 병원 경로' }} />
            <Stack.Screen name="MapToHome" component={MapToHome} options={{ title: '집으로' }} />
            <Stack.Screen name="MapToPolice" component={MapToPolice} options={{ title: '가까운 경찰서 경로' }} />
            <Stack.Screen name="Agenda" component={Agenda} options={{ title: '일정' }} />
            <Stack.Screen name="NewAgenda" component={NewAgenda} options={{ title: '일정 추가' }} />
            <Stack.Screen name="EditAgenda" component={EditAgenda} options={{ title: '일정 변경' }} />
            <Stack.Screen name="MemoDetail" component={MemoDetail} options={{ title: '자세한 메모' }} />
            <Stack.Screen name="Settings" component={Settings} options={{ title: '설정' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>

  );
}
