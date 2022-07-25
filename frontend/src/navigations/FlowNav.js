import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlowScreen from '../screens/bottomtab/FlowScreen';
import DetailScreen from '../screens/DetailScreen';
const Stack = createNativeStackNavigator();
export default function FlowNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FlowScreen"
        component={FlowScreen}
        options={{headerBackVisible: false, headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerBackVisible: false, headerBackTitleVisible: false}}
      />
    </Stack.Navigator>
  );
}
