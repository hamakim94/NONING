import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ApproveScreen from '../screens/signUp/ApproveScreen';
import InfoScreen from '../screens/signUp/InfoScreen';
import CompleteScreen from '../screens/signUp/CompleteScreen';

const Tab = createMaterialTopTabNavigator();

function SignUpNav() {
  return (
    <Tab.Navigator
      style={{backgroundColor: '#FFFFFF'}}
      initialRouteName="ApproveScreen"
      backBehavior="none"
      screenOptions={{
        tabBarActiveTintColor: '#FF5F5F',
        tabBarInactiveTintColor: '#808080',
        tabBarPressColor: '#FFFFFF',
        tabBarIndicatorStyle: {backgroundColor: '#FF5F5F'},
        tabBarLabelStyle: {fontSize: 15},
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          marginHorizontal: 20,
          marginTop: 5,
          marginBottom: 10,
          shadowColor: '#FFFFFF',
          borderBottomColor: '#808080',
          borderBottomWidth: 0.3,
        },
        swipeEnabled: false,
      }}>
      <Tab.Screen
        name="ApproveScreen"
        component={ApproveScreen}
        options={{
          tabBarLabel: '약관동의',
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{tabBarLabel: '회원정보'}}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="CompleteScreen"
        component={CompleteScreen}
        options={{tabBarLabel: '가입완료'}}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default SignUpNav;
