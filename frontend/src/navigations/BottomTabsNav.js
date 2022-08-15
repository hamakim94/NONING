import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext} from 'react';
import PlusScreen from '../screens/bottomTab/PlusScreen';
import UserPageNav from './UserPageNav';
import HomeStack from './HomeStack';
import FlowNav from './FlowNav';
import LiveNav from './LiveNav';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginNav from './LoginNav';
import UserContext from '../util/UserContext';
import LoginAlert from '../util/LoginAlert';

const Tab = createBottomTabNavigator();

function BottomTabsNav() {
  const {userData, setUserData} = useContext(UserContext);
  const tabBarListeners = ({navigation, route}) => ({
    tabPress:
      userData === null
        ? (e) => {
            e.preventDefault();
            LoginAlert(navigation);
          }
        : () => navigation.navigate(route.name),
  });

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarActiveTintColor: '#FF5F5F',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {borderTopColor: '#A6A6A6'},
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
        listeners={tabBarListeners}
      />
      <Tab.Screen
        name="FlowNav"
        component={FlowNav}
        options={{
          tabBarLabel: 'Flow',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="waves" color={color} size={size} />
          ),
        }}
        listeners={tabBarListeners}
      />
      <Tab.Screen
        name="PlusScreen"
        component={PlusScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size}) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color="#FF7171"
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="LiveNav"
        component={LiveNav}
        options={{
          unmountOnBlur: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="broadcast"
              color={color}
              size={size}
            />
          ),
        }}
        listeners={tabBarListeners}
      />
      <Tab.Screen
        name="UserPageNav"
        component={UserPageNav}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user-circle-o" color={color} size={size} />
          ),
        }}
        listeners={tabBarListeners}
      />
    </Tab.Navigator>
  );
}
export default BottomTabsNav;
