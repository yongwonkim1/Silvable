import * as React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Memo from '../screens/Memo';
import Stt from '../screens/Stt';
import Hospital from '../screens/Hospital';
import MapToHospital from '../screens/MapToHospital';
import MapToHome from '../screens/MapToHome';
import MapToPolice from '../screens/MapToPolice';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator mode="modal" initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Memo" component={Memo} />
      <Stack.Screen name="Stt" component={Stt} />
      <Stack.Screen name="Hospital" component={Hospital} />
      <Stack.Screen name="MapToHospital" component={MapToHospital} />
      <Stack.Screen name="MapToHome" component={MapToHome} />
      <Stack.Screen name="MapToPolice" component={MapToPolice} />
    </Stack.Navigator>
  );
}
export default StackNavigation;