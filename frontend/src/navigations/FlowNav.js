import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Flows from '../components/flow/Flows';
import FlowScreen from '../screens/bottomTab/FlowScreen';
import DetailScreen from '../screens/board/DetailScreen';
import UserPageScreen from '../screens/bottomTab/UserPageScreen';

const Stack = createNativeStackNavigator();

export default function FlowNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FlowScreen" component={FlowScreen} options={{headerShown: false}}  />
      <Stack.Screen name="Flows" component={Flows} options={{headerShown: false}}  />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerBackVisible: true, headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="UserPageScreen"
        component={UserPageScreen}
        options={{headerBackVisible: true, headerBackTitleVisible: false}}
      />
    </Stack.Navigator>
  );
}
