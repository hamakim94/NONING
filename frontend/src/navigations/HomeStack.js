import React from 'react';
import HomeScreen from '../screens/bottomTab/HomeScreen';
import SignUpNav from './SignUpNav';
import DetailScreen from '../screens/board/DetailScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginNav from './LoginNav';
import SearchNav from './SearchNav';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
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
      <Stack.Screen
        name="HomeDetail"
        component={DetailScreen}
        options={{
          title: '디테일',
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
