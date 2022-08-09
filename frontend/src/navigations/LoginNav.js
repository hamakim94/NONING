import React from 'react';
import SignUpNav from './SignUpNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import PasswordFindScreen from '../screens/login/PasswordFindScreen';
const Stack = createNativeStackNavigator();

function LoginNav() {
  return (
    
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: '로그인',}}/>
      <Stack.Screen name="SignUpNav"   component={SignUpNav}   options={{title: '회원가입',}}/>
      <Stack.Screen name="PasswordFindScreen" component={PasswordFindScreen} options={{title:'비밀번호찾기'}}/>
    </Stack.Navigator>
  );
}

export default LoginNav;
