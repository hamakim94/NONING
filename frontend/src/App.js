import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './navigations/HomeStack';
import BottomTabsScreen from './screens/BottomTabsScreen';
import FollowerScreen from './screens/FollowerScreen';

export default function App() {
  return (
    // <NavigationContainer>
    //   <HomeStack />
    // </NavigationContainer>
    <NavigationContainer>
      <FollowerScreen></FollowerScreen>
      <BottomTabsScreen></BottomTabsScreen>
    </NavigationContainer>
  );
}
