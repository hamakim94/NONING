import React, { useState } from 'react';
import { Divider } from '@rneui/base/dist/Divider';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
} from 'react-native';
import LogoSearch from '../../components/home/LogoSearch';
import FilterButtonTabs, { filterButtons } from '../../components/home/FilterButtonTabs';
import Boards from '../../components/home/Boards';

function HomeScreen({navigation}) {
  const [filterName, setFilterName] = useState('전체');
  // console.log(filterName)
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <LogoSearch navigation={navigation}></LogoSearch>
        <Divider width={0.5} ></Divider>
        <FilterButtonTabs setFilterName={setFilterName}/>
        <Divider width={0.5} ></Divider>
        <Boards></Boards>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}> 
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('LoginNav', {screen: 'LoginNav'})
            }>
            <Text>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('HomeDetail', {screen: 'HomeDetail'})
            }>
            <Text>상세페이지</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
          React Native Bottom Navigation
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  buttonContainer:{
    flex:1,
    justifyContent : 'space-between',
    alignItems:'center',
    flexDirection:'row',
    height:30,
    marginBottom:5,

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  scrollContainer: {
    container:{
      justifyContent : 'space-between',
      alignItems:'center',
      flexDirection:'row',
      height:30,
      marginBottom:5,

    },
  },
  textFocused :{
    color: '#FF7171'
  },
  textNotFocused :{

  },

});
export default HomeScreen;
