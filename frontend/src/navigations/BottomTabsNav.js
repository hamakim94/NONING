import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FlowScreen from '../screens/bottomtab/FlowScreen';
import PlusScreen from '../screens/bottomtab/PlusScreen';
import LiveScreen from '../screens/bottomtab/LiveScreen';
import MyPageScreen from '../screens/bottomtab/MyPageScreen';
import LoginNav from './LoginNav';
import HomeStack from './HomeStack';
import HomeScreen from '../screens/bottomtab/HomeScreen';

const Tab = createBottomTabNavigator();

function BottomTabsNav() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          title: '논잉',
        }}
      />
      <Tab.Screen
        name="FlowScreen"
        component={FlowScreen}
        options={{
          tabBarLabel: 'Flow',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PlusScreen"
        component={PlusScreen}
        options={{
          tabBarLabel: 'Plus',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="LiveScreen"
        component={LiveScreen}
        options={{
          tabBarLabel: 'Plus',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{
          tabBarLabel: 'Plus',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabsNav;
