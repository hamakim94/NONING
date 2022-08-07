import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChatInfoScreen from '../screens/live/ChatInfoScreen';
import DetailScreen from '../screens/board/DetailScreen';
import ChatScreen from '../screens/live/ChatScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function ChatNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatInfoScreen"
        component={ChatInfoScreen}
        options={{headerShown: false}}
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
