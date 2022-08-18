import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChatInfoScreen from '../screens/live/ChatInfoScreen';
import DetailScreen from '../screens/board/DetailScreen';
import ChatScreen from '../screens/live/ChatScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HeaderOptions from '../util/HeaderOptions';
import YourPageScreen from '../screens/YourPageScreen';
import FollowerScreen from '../screens/FollowerScreen';
import FollowingScreen from '../screens/FollowingScreen';

const Stack = createNativeStackNavigator();
export default function ChatNav() {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        name="ChatInfoScreen"
        component={ChatInfoScreen}
        options={HeaderOptions('채팅대기방')}
      />
      <Stack.Screen
        name="ChatBoardDetailScreen"
        component={DetailScreen}
        options={{headerBackVisible: true, headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="YourPageScreen"
        component={YourPageScreen}
        options={HeaderOptions('유저페이지')}
      />
      <Stack.Screen
        name="FollowerScreen"
        component={FollowerScreen}
        options={HeaderOptions('Follower')}
      />
      <Stack.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={HeaderOptions('Following')}
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
