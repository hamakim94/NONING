import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SettingNav from './SettingNav';
import FollowerScreen from '../screens/FollowerScreen';
import FollowingScreen from '../screens/FollowingScreen';
import YourPageScreen from '../screens/YourPageScreen';
import UserContext from '../util/UserContext';
import DetailNav from './DetailNav';

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
        options={{
          title: '유저설정',
          headerShown: false,
        }}
      />

      <Stack.Screen name="DetailNav" component={DetailNav} />
      <Stack.Screen
        name="YourPageScreen"
        component={YourPageScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FollowerScreen"
        component={FollowerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default UserPageNav;
