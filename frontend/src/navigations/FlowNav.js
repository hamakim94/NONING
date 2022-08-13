import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Flows from '../components/flow/Flows';
import FlowScreen from '../screens/bottomTab/FlowScreen';
import DetailScreen from '../screens/board/DetailScreen';
import UserPageScreen from '../screens/bottomTab/UserPageScreen';
import YourPageScreen from '../screens/YourPageScreen';
import FollowerScreen from '../screens/FollowerScreen';
import FollowingScreen from '../screens/FollowingScreen';
import LoginNav from './LoginNav';
import FlowBlank from '../components/flow/FlowBlank';
import PlusScreen from '../screens/bottomTab/PlusScreen';

const Stack = createNativeStackNavigator();

export default function FlowNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FlowScreen"
        component={FlowScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Flows"
        component={Flows}
        options={{headerShown: false}}
      />
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
      <Stack.Screen
        name="YourPageScreen"
        component={YourPageScreen}
        options={{
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FollowerScreen"
        component={FollowerScreen}
        options={{
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FlowBlank"
        component={FlowBlank}
        options={{title: '플로우공백페이지', headerShown: false}}
      />
      <Stack.Screen
        name="PlusScreen"
        component={PlusScreen}
        options={{title: '등록페이지', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
