import React from 'react';
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



function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <LogoSearch navigation={navigation}></LogoSearch>
        <Divider ></Divider>
        <View style={styles.scrollContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{borderBottomWidth:1, height:40}}>
            <Text style={{margin:10, fontWeight:'bold', fontSize:15}}>전체</Text>
            <Text style={{margin:10, fontWeight:'bold', fontSize:15}}>연애</Text>
            <Text style={{margin:10, fontWeight:'bold', fontSize:15}}>음식</Text>
            <Text style={{margin:10, fontWeight:'bold', fontSize:15}}>게임</Text>
            <Text style={{margin:10, fontWeight:'bold', fontSize:15}}>고민</Text>
            <Text style={{margin:10, fontWeight:'bold', fontSize:15}}>운동</Text>
            <Text style={{margin:10, fontWeight:'bold', fontSize:15}}>직장</Text>
            <Text style={{margin:10, fontWeight:'bold', fontSize:15}}>갈등</Text>
            <Text style={{margin:10, fontWeight:'bold', fontSize:15}}>싸피</Text>
          </ScrollView>
        </View>
        <ScrollView>

        </ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}> 
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            You are on Home Screen
          </Text>
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
