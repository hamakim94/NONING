import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SignUpNav from './SignUpNav';
import PasswordEdit from '../screens/useredit/PasswordEdit';
import ProfileEdit from '../screens/useredit/ProfileEdit';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="SignUpNav"
        component={SignUpNav}
        options={{
          title: '회원가입',
        }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{
          title: '프로필수정',
        }}
      />
      <Stack.Screen
        name="PasswordEdit"
        component={PasswordEdit}
        options={{
          title: '비밀번호수정',
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
