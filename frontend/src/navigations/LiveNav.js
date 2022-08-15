import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LiveScreen from '../screens/bottomTab/LiveScreen';
import ChatNav from './ChatNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import YourPageScreen from '../screens/YourPageScreen';
import FollowerScreen from '../screens/FollowerScreen';
import FollowingScreen from '../screens/FollowingScreen';
import SettingScreen from '../screens/userEdit/SettingScreen';
import ProfileEditScreen from '../screens/userEdit/ProfileEditScreen';
import PasswordEditScreen from '../screens/userEdit/PasswordEditScreen';
import InquiryScreen from '../screens/userEdit/InquiryScreen';
import TosScreen from '../screens/userEdit/TosScreen';
import PrivacyScreen from '../screens/userEdit/PrivacyScreen';
import UserWithdrawalScreen from '../screens/userEdit/UserWithdrawalScreen';
const Stack = createNativeStackNavigator();
export default function LiveNav() {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        name="LiveScreen"
        component={LiveScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatNav"
        component={ChatNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="YourPageScreen"
        component={YourPageScreen}
        options={HeaderOptions('')}
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
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={HeaderOptions('설정')}
      />
      <Stack.Screen
        name="ProfileEditScreen"
        component={ProfileEditScreen}
        options={HeaderOptions('프로필편집')}
      />
      <Stack.Screen
        name="PasswordEditScreen"
        component={PasswordEditScreen}
        options={HeaderOptions('비밀번호변경')}
      />
      <Stack.Screen
        name="InquiryScreen"
        component={InquiryScreen}
        options={HeaderOptions('문의하기')}
      />
      <Stack.Screen
        name="TosScreen"
        component={TosScreen}
        options={HeaderOptions('서비스이용약관')}
      />
      <Stack.Screen
        name="PrivacyScreen"
        component={PrivacyScreen}
        options={HeaderOptions('개인정보')}
      />
      <Stack.Screen
        name="UserWithdrawalScreen"
        component={UserWithdrawalScreen}
        options={{
          title: '회원 탈퇴',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
