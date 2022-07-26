import {StyleSheet} from 'react-native';
import React from 'react';
import SettingScreen from '../screens/useredit/SettingScreen';
import PasswordEditScreen from '../screens/useredit/PasswordEditScreen';
import ProfileEditScreen from '../screens/useredit/ProfileEditScreen';
import InquiryScreen from '../screens/useredit/InquiryScreen';
import TosScreen from '../screens/useredit/TosScreen';
import PrivacyScreen from '../screens/useredit/PrivacyScreen';
import UserWithdrawalScreen from '../screens/useredit/UserWithdrawalScreen';
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

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
