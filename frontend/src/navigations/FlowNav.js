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
import HeaderOptions from '../util/HeaderOptions';

const Stack = createNativeStackNavigator();

export default function FlowNav() {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
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
        options={HeaderOptions('상세페이지')}
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
