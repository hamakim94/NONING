import {StyleSheet} from 'react-native';
import React from 'react';
import SettingScreen from '../screens/userEdit/SettingScreen';
import PasswordEditScreen from '../screens/userEdit/PasswordEditScreen';
import ProfileEditScreen from '../screens/userEdit/ProfileEditScreen';
import InquiryScreen from '../screens/userEdit/InquiryScreen';
import TosScreen from '../screens/userEdit/TosScreen';
import PrivacyScreen from '../screens/userEdit/PrivacyScreen';
import UserWithdrawalScreen from '../screens/userEdit/UserWithdrawalScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function SettingNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
      <Stack.Screen name="PasswordEditScreen" component={PasswordEditScreen} />
      <Stack.Screen name="InquiryScreen" component={InquiryScreen} />
      <Stack.Screen name="TosScreen" component={TosScreen} />
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
      <Stack.Screen
        name="UserWithdrawalScreen"
        component={UserWithdrawalScreen}
      />
    </Stack.Navigator>
  );
}
;
