import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BoardSearchScreen from '../screens/search/BoardSearchScreen';
import UserSearchScreen from '../screens/search/UserSearchScreen';

const Tab = createMaterialTopTabNavigator();

function SearchNav() {
  return (
    <Tab.Navigator
      style={{backgroundColor: 'white'}}
      initialRouteName="BoardSearchScreen"
      screenOptions={{
        tabBarActiveTintColor: '#FF5F5F',
        tabBarInactiveTintColor: '#808080',
        tabBarPressColor: '#C9C9C9',
        tabBarIndicatorStyle: {
          backgroundColor: '#FF5F5F',
          width: '25%',
          marginHorizontal: '7%',
        },
        tabBarLabelStyle: {fontSize: 15},
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          marginHorizontal: 20,
          marginBottom: 10,
          shadowColor: '#FFFFFF',
          borderBottomColor: '#808080',
          borderBottomWidth: 0.3,
        },
        swipeEnabled: true,
      }}>
      <Tab.Screen
        name="BoardSearchScreen"
        component={BoardSearchScreen}
        options={{
          tabBarLabel: '게시글',
        }}
      />
      <Tab.Screen
        name="UserSearchScreen"
        component={UserSearchScreen}
        options={{tabBarLabel: '사용자'}}
      />
    </Tab.Navigator>
  );
}

export default SearchNav;
