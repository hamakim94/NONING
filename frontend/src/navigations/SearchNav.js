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
        tabBarActiveTintColor: '#FF7171',
        tabBarInactiveTintColor: '#808080',
        tabBarPressColor: '#C9C9C9',
        tabBarIndicatorStyle: {backgroundColor: '#FF7171', width: '25%', marginHorizontal: '7%'},
        tabBarLabelStyle: {fontSize: 15},
        tabBarStyle: {
          backgroundColor: 'white',
          marginHorizontal: 20,
          marginTop: 5,
          marginBottom: 10,
          shadowColor: 'white',
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
      {/* <Tab.Screen
        name="UserPageScreen"
        component={UserPageScreen}
      /> */}
    </Tab.Navigator>
  );
}

export default SearchNav;
