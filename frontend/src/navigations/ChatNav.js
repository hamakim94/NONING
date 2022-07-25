import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChatInfoScreen from '../screens/live/ChatInfoScreen';
import DetailScreen from '../screens/DetailScreen';
import LiveScreen from '../screens/bottomtab/LiveScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function ChatNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LiveScreen" component={LiveScreen} />
      <Stack.Screen
        name="ChatInfoScreen"
        component={ChatInfoScreen}
        options={{headerBackVisible: true, headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerBackVisible: true, headerBackTitleVisible: false}}
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
