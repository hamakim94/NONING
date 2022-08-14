import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserPageScreen from '../screens/bottomTab/UserPageScreen';
import DetailScreen from '../screens/board/DetailScreen';
import SettingNav from './SettingNav';
import FollowerScreen from '../screens/FollowerScreen';
import FollowingScreen from '../screens/FollowingScreen';
import YourPageScreen from '../screens/YourPageScreen';
import LoginNav from './LoginNav';
import UserContext from '../util/UserContext';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function UserPageNav() {
  const {userData} = useContext(UserContext);
  //onPress={() => navigation.push('YourPageScreen', {id: board.writerId})}>
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserPageScreen"
        component={YourPageScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{id: userData.userId}}
      />
      <Stack.Screen
        name="SettingNav"
        component={SettingNav}
        options={HeaderOptions('설정')}
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

export default UserPageNav;
