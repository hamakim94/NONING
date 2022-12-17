import React from 'react';
import SignUpNav from './SignUpNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import PasswordFindScreen from '../screens/login/PasswordFindScreen';
import HeaderOptions from '../util/HeaderOptions';
const Stack = createNativeStackNavigator();

function LoginNav() {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpNav"
        component={SignUpNav}
        options={HeaderOptions('회원가입')}
      />
      <Stack.Screen
        name="PasswordFindScreen"
        component={PasswordFindScreen}
        options={HeaderOptions('비밀번호찾기')}
      />
    </Stack.Navigator>
  );
}

export default LoginNav;
