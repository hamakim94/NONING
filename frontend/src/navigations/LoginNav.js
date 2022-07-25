import React from 'react';
import HomeScreen from '../screens/bottomtab/HomeScreen';
import SignUpNav from './SignUpNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabsNav from './BottomTabsNav';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

function LoginNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="SignUpNav"
        component={SignUpNav}
        options={{
          title: '회원가입',
        }}
      />
    </Stack.Navigator>
  );
}

export default LoginNav;
