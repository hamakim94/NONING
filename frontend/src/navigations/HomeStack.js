import React, {useContext} from 'react';
import HomeScreen from '../screens/bottomTab/HomeScreen';
import DetailNav from '../navigations/DetailNav';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginNav from './LoginNav';
import SearchNav from './SearchNav';
import UserContext from '../util/UserContext';
import YourPageScreen from '../screens/YourPageScreen';
import FollowerScreen from '../screens/FollowerScreen';
import FollowingScreen from '../screens/FollowingScreen';
import Feather from 'react-native-vector-icons/Feather';
import SettingScreen from '../screens/userEdit/SettingScreen';
import ProfileEditScreen from '../screens/userEdit/ProfileEditScreen';
import PasswordEditScreen from '../screens/userEdit/PasswordEditScreen';
import InquiryScreen from '../screens/userEdit/InquiryScreen';
import TosScreen from '../screens/userEdit/TosScreen';
import PrivacyScreen from '../screens/userEdit/PrivacyScreen';
import UserWithdrawalScreen from '../screens/userEdit/UserWithdrawalScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function HomeStack() {
  const {userData} = useContext(UserContext);
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      {userData === null ? ( // 로그인 X
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginNav"
            component={LoginNav}
            options={{
              title: '로그인',
              headerShown: false,
              headerBackImageSource: (
                <Feather name="chevron-left" size={30} color="#000000" />
              ),
            }}
          />
          <Stack.Screen
            name="SearchNav"
            component={LoginNav}
            options={HeaderOptions('로그인')}
          />
          <Stack.Screen
            name="DetailNav"
            component={LoginNav}
            options={HeaderOptions('로그인')}
          />
          <Stack.Screen
            name="YourPageScreen"
            component={LoginNav}
            options={HeaderOptions('로그인')}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchNav"
            component={SearchNav}
            options={HeaderOptions('검색')}
          />
          <Stack.Screen
            name="DetailNav"
            component={DetailNav}
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
        </>
      )}
    </Stack.Navigator>
  );
}

export default HomeStack;
