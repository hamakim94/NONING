import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChatInfoScreen from '../screens/live/ChatInfoScreen';
import DetailScreen from '../screens/board/DetailScreen';
import ChatUserListScreen from '../screens/live/ChatUserListScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function ChatNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatInfoScreen" component={ChatInfoScreen} />
      <Stack.Screen
        name="ChatBoardDetailScreen"
        component={DetailScreen}
        options={{headerBackVisible: true, headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="ChatUserListScreen"
        component={ChatUserListScreen}
        options={{
          headerBackVisible: true,
          headerBackTitleVisible: false,
        }}
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
