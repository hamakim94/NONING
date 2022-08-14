import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Flows from '../components/flow/Flows';
import FlowScreen from '../screens/bottomTab/FlowScreen';
import DetailScreen from '../screens/board/DetailScreen';
import UserPageScreen from '../screens/bottomTab/UserPageScreen';
import YourPageScreen from '../screens/YourPageScreen';
import FollowerScreen from '../screens/FollowerScreen';
import FollowingScreen from '../screens/FollowingScreen';
import LoginNav from './LoginNav';
import HeaderOptions from '../util/HeaderOptions';
import SettingScreen from '../screens/userEdit/SettingScreen';
import ProfileEditScreen from '../screens/userEdit/ProfileEditScreen';
import PasswordEditScreen from '../screens/userEdit/PasswordEditScreen';
import InquiryScreen from '../screens/userEdit/InquiryScreen';
import TosScreen from '../screens/userEdit/TosScreen';
import PrivacyScreen from '../screens/userEdit/PrivacyScreen';
import UserWithdrawalScreen from '../screens/userEdit/UserWithdrawalScreen';

const Stack = createNativeStackNavigator();

export default function FlowNav() {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        name="FlowScreen"
        component={FlowScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Flows"
        component={Flows}
        options={{headerShown: false}}
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
      <Stack.Screen
        name="FlowBlank"
        component={FlowBlank}
        options={{title: '플로우공백페이지', headerShown: false}}
      />
      <Stack.Screen
        name="PlusScreen"
        component={PlusScreen}
        options={{title: '등록페이지', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
