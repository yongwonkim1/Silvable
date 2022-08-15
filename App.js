
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
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            
            <Stack.Screen name="NewMemo" component={NewMemo} />
            <Stack.Screen name="MemoView" component={MemoView}/>
            
            
            <Stack.Screen name="Home" component={Home} />
            {/* <Stack.Screen name="Memo" component={Memo} /> */}
            <Stack.Screen name="Stt" component={Stt} />
            <Stack.Screen name="Hospital" component={Hospital} />
            <Stack.Screen name="Magnify" component={Magnify} />
            <Stack.Screen name="MapToHospital" component={MapToHospital} />
            <Stack.Screen name="MapToHome" component={MapToHome} />
            <Stack.Screen name="MapToPolice" component={MapToPolice} />
            <Stack.Screen name="Agenda" component={Agenda} />
            <Stack.Screen name="NewAgenda" component={NewAgenda} />
            <Stack.Screen name="EditAgenda" component={EditAgenda} />
            <Stack.Screen name="MemoDetail" component={MemoDetail} />
            <Stack.Screen name="Settings" component={Settings}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>

  );
}
