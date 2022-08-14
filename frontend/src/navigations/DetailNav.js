import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from '../screens/board/DetailScreen';
import YourPageScreen from '../screens/YourPageScreen';
import FollowerScreen from '../screens/FollowerScreen';
import FollowingScreen from '../screens/FollowingScreen';
import ChatNav from './ChatNav';
import UserContext from '../util/UserContext';
import LoginNav from './LoginNav';
import HeaderOptions from '../util/HeaderOptions';

const Stack = createNativeStackNavigator();
export default function DetailNav() {
  const {userData} = useContext(UserContext);
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      {userData === null ? ( // 로그인 X
        <>
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={HeaderOptions('상세페이지')}
          />
          <Stack.Screen
            name="YourPageScreen"
            component={LoginNav}
            options={{title: '유저페이지', headerShown: false}}
          />
          <Stack.Screen
            name="ChatNav"
            component={LoginNav}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FollowerScreen"
            component={FollowerScreen}
            options={{title: '팔로워페이지', headerShown: false}}
          />
          <Stack.Screen
            name="FollowingScreen"
            component={FollowingScreen}
            options={{title: '팔로잉페이지', headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={HeaderOptions('상세페이지')}
          />
          <Stack.Screen
            name="YourPageScreen"
            component={YourPageScreen}
            options={{title: '유저페이지', headerShown: false}}
          />
          <Stack.Screen
            name="ChatNav"
            component={ChatNav}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FollowerScreen"
            component={FollowerScreen}
            options={{title: '팔로워페이지', headerShown: false}}
          />
          <Stack.Screen
            name="FollowingScreen"
            component={FollowingScreen}
            options={{title: '팔로잉페이지', headerShown: false}}
          />
        </>
      )}
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
