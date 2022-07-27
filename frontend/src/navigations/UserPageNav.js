import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserPageScreen from '../screens/bottomTab/UserPageScreen';
import SettingNav from './SettingNav';
const Stack = createNativeStackNavigator();

function UserPageNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserPageScreen" component={UserPageScreen} />
      <Stack.Screen
        name="SettingNav"
        component={SettingNav}
        options={{
          title: '유저설정',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default UserPageNav;
