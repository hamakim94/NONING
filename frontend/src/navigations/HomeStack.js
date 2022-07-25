import React from 'react';
import HomeScreen from '../screens/bottomtab/HomeScreen';
import SignUpNav from './SignUpNav';
import BottomTabsNav from './BottomTabsNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginNav from './LoginNav';
import SearchNav from './SearchNav';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabsNav"
        component={BottomTabsNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginNav"
        component={LoginNav}
        options={{
          title: '로그인',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchNav"
        component={SearchNav}
        options={{
          title: '검색',
        }}
      />
      {/* <Stack.Screen
        name="SignUpNav"
        component={SignUpNav}
        options={{
          title: '회원가입',
          headerRight: true,
        }}
      /> 상세페이지*/}
    </Stack.Navigator>
  );
}

export default HomeStack;
