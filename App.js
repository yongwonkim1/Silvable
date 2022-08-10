// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import StackNavigation from './stack/Stack';

// const App = () => {
//     return (
//         <NavigationContainer>
//             <StackNavigation />
//         </NavigationContainer>
//     )
// }

// export default App;


import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";

import { UserProvider } from './contexts';

import { theme } from './theme';
import Login from './Login/Login';
import Signup from './Login/Singup';
import Memo from './Memo/Memo';
import MemoWrite from './Memo/MemoWrite';
import MemoContent from './Memo/MemoContent';
import Home from './src/screens/Home';
// import Memo from '.src/screens/Memo';
import Stt from './src/screens/Stt';
import Hospital from './src/screens/Hospital';
// import MapToHospital from './src/screens/MapToHospital';
import MapToHome from './src/screens/MapToHome';
import MapToPolice from './src/screens/MapToPolice';
import Magnify from './src/screens/Magnify';

const Stack = createStackNavigator();

export default function App() {
  return (

    <UserProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: true,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Memo" component={Memo} />
            <Stack.Screen name="MemoWrite" component={MemoWrite} />
            <Stack.Screen name="MemoContent" component={MemoContent} />
            <Stack.Screen name="Home" component={Home} />
            {/* <Stack.Screen name="Memo" component={Memo} /> */}
            <Stack.Screen name="Stt" component={Stt} />
            <Stack.Screen name="Hospital" component={Hospital} />
            <Stack.Screen name="Magnify" component={Magnify} />
            {/* <Stack.Screen name="MapToHospital" component={MapToHospital} /> */}
            <Stack.Screen name="MapToHome" component={MapToHome} />
            <Stack.Screen name="MapToPolice" component={MapToPolice} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});