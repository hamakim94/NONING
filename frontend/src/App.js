import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './navigations/HomeStack';
import BottomTabsNav from './navigations/BottomTabsNav';
import UserContext from './util/UserContext';

export default function App() {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <NavigationContainer>
        <BottomTabsNav />
      </NavigationContainer>
    </UserContext.Provider>
  );
}
