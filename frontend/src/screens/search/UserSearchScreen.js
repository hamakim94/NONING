import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { SafeAreaView, View, StyleSheet, FlatList, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { PROFILES } from '../../data/profile';


const Tab = createMaterialTopTabNavigator();

function UserSearchScreen({navigation}) {
  // profile
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    featchPosts();
    return () => {

    }
  }, [])

  const featchPosts = () => {
      setfilterdData(PROFILES);
      setmasterData(PROFILES);
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.user ? item.user.toUpperCase()
                    : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setSearch(text);
    } else {
      setfilterdData(masterData);
      setSearch(text);
    }
  }

  const ItemView = ({item}) => {
    return (
            <TouchableOpacity
                style={{flexDirection: 'row', flex: 1.5 }} 
                onPress={() => navigation.push('UserPageScreen', {screen: 'UserPageScreen'})}>
                <View style={{flexDirection: 'row', flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={{uri: item.imageUrl}} style={{width: 60, height: 60, borderRadius: 50, borderWidth: 2, borderColor: 'rgba(255,90,110,1)',}}/>  
                </View>
                <View style={{flex:1, alignSelf: 'flex-start', paddingVertical: '5%'}}>
                    <Text style={styles.userNickname}>
                        {item.user.toUpperCase()}
                    </Text> 
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.userInfo}>
                            {item.gender.toUpperCase()}/
                        </Text>
                        <Text style={styles.userInfo}>
                            {item.mbti.toUpperCase()}/
                        </Text>
                        <Text style={styles.userInfo}>
                            {item.age.toUpperCase()}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
      
    )
  }

  const ItemSeparatorView = () => {
    return (
      <View 
      style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}>

      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={StyleSheet.container}>
        <TextInput
          style = {styles.textInputStyle}
          value={search}
          placeholder="닉네임을 검색하세요"
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        >
        </TextInput>
        <FlatList
        data={filterdData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}>
        </FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  userNickname: {
    fontWeight: 'bold',
  },
  userInfo: {
    paddingTop: '1%',
    paddingRight: '1%'
  },
  textInputStyle: {
    height: 45,
    borderWidth: 1,
    paddingLeft: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10
  }

})
export default UserSearchScreen;
