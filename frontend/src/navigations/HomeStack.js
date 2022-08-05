import React, {useContext} from 'react';
import HomeScreen from '../screens/bottomTab/HomeScreen';
import DetailScreen from '../screens/board/DetailScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginNav from './LoginNav';
import SearchNav from './SearchNav';
import UserContext from '../util/UserContext';

const Stack = createNativeStackNavigator();

function HomeStack() {
  const {userData, setUserData} = useContext(UserContext);
  return (
    <Stack.Navigator>
<<<<<<< HEAD
      {Object.keys(userData).length === 0 ? // 로그인 X
      (<>
        <Stack.Screen name="HomeScreen" component={HomeScreen}   options={{headerShown: false}} />
        <Stack.Screen name="LoginNav"   component={LoginNav}     options={{title: '로그인', headerShown: false,}}/>
        <Stack.Screen name="SearchNav"  component={LoginNav}    options={{title: '검색', headerShown: false,}}/>
        <Stack.Screen name="HomeDetail" component={DetailScreen} options={{title: '디테일',}}/>
      </>) : 
      
      (<>
        <Stack.Screen name="HomeScreen" component={HomeScreen}   options={{headerShown: false}} />
        <Stack.Screen name="SearchNav"  component={SearchNav}    options={{title: '검색',}}/>
        <Stack.Screen name="HomeDetail" component={DetailScreen} options={{title: '디테일',}}/>
      </>)}
      
=======
      {userData === null ? ( // 로그인 X
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false, unmountOnBlur: true}}
          />
          <Stack.Screen
            name="LoginNav"
            component={LoginNav}
            options={{title: '로그인', headerShown: false}}
          />
          <Stack.Screen
            name="SearchNav"
            component={SearchNav}
            options={{title: '검색'}}
          />
          <Stack.Screen
            name="HomeDetail"
            component={DetailScreen}
            options={{title: '디테일'}}
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
            options={{title: '검색'}}
          />
          <Stack.Screen
            name="HomeDetail"
            component={DetailScreen}
            options={{title: '디테일'}}
          />
        </>
      )}
>>>>>>> aefaa6ad21ad6cb0083f40ca7ff9ca1896f89a2a
    </Stack.Navigator>
  );
}

export default HomeStack;
