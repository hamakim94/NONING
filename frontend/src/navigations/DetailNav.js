import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from '../screens/board/DetailScreen';
import YourPageScreen from '../screens/YourPageScreen';
import FollowerScreen from '../screens/FollowerScreen';
import FollowingScreen from '../screens/FollowingScreen';
import ChatScreen from '../screens/live/ChatScreen';
import ChatInfoScreen from '../screens/live/ChatInfoScreen';
import UserContext from '../util/UserContext';
import LoginNav from './LoginNav';

const Stack = createNativeStackNavigator();
export default function DetailNav() {
  const {userData} = useContext(UserContext);
  return (
    <Stack.Navigator>
      {userData === null ? ( // 로그인 X
        <>
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="YourPageScreen"
            component={LoginNav}
            options={{title: '유저페이지', headerShown: false}}
          />
          <Stack.Screen
            name="ChatScreen"
            component={LoginNav}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatInfoScreen"
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
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="YourPageScreen"
            component={YourPageScreen}
            options={{title: '유저페이지', headerShown: false}}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatInfoScreen"
            component={ChatInfoScreen}
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
