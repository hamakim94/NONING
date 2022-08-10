import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LiveScreen from '../screens/bottomTab/LiveScreen';
import ChatNav from './ChatNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
