import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './navigations/HomeStack';
import BottomTabsNav from './navigations/BottomTabsNav';
import UserContext from './util/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UseAxios from './util/UseAxios';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [realHeight, setRealHeight] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('userId');
      if (value) {
        UseAxios.get(`/users/profiles`, {params: {userId: value}})
          .then((res) => {
            setUserData(res.data);
          })
          .catch((err) => console.log(err));
      }
    };
    getData();
  }, []);

  return (
    <UserContext.Provider
      value={{userData, setUserData, realHeight, setRealHeight}}>
      <NavigationContainer>
        <BottomTabsNav />
      </NavigationContainer>
    </UserContext.Provider>
  );
}
