import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LiveScreen from '../screens/bottomTab/LiveScreen';
import ChatNav from './ChatNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import YourPageScreen from '../screens/YourPageScreen';
import FollowerScreen from '../screens/FollowerScreen';
import FollowingScreen from '../screens/FollowingScreen';

const Stack = createNativeStackNavigator();
export default function LiveNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LiveScreen"
        component={LiveScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatNav"
        component={ChatNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="YourPageScreen"
        component={YourPageScreen}
        options={{title: '유저페이지', headerShown: false}}
      />
      <Stack.Screen
        name="FollowerScreen"
        component={FollowerScreen}
        options={{title: '팔로워페이지', headerShown: false}}
      />
      <Stack.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{title: '팔로잉페이지', headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
