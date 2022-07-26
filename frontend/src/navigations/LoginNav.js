import React from 'react';
import SignUpNav from './SignUpNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import PasswordChangeScreen from '../screens/login/PasswordChangeScreen';
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
      <Stack.Screen
        name="PasswordChangeScreen"
        component={PasswordChangeScreen}
      />
    </Stack.Navigator>
  );
}

export default LoginNav;
