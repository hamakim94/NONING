import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './navigations/HomeStack';
import BottomTabsNav from './navigations/BottomTabsNav';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabsNav />
    </NavigationContainer>
  );
}
