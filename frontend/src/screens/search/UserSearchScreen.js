import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import UseAxios from '../../util/UseAxios';
import {Divider} from '@rneui/themed';

import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

const Tab = createMaterialTopTabNavigator();

function UserSearchScreen({navigation}) {
  const [users, setUsers] = useState([]);
  const [filterdData, setfilterdData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    UseAxios.get('/users/list').then((res) => {
      setUsers(res.data);
      setfilterdData(res.data);
    });
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = users.filter((item) => {
        const itemData = item.nickname
          ? item.nickname.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setSearch(text);
    } else {
      setfilterdData(users);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={{flexDirection: 'row', flex: 1.5}}
          onPress={() =>
            navigation.navigate('YourPageScreen', {id: item.userId})
          }>
          <View
            style={{
              flex: 0.3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={
                item.img
                  ? {uri: item.img}
                  : require('../../assets/DefaultProfile.jpg')
              }
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: '#c9c9c9',
              }}
            />
          </View>
          <View
            style={{flex: 1, alignSelf: 'flex-start', marginVertical: '4%'}}>
            <Text style={styles.userNickname}>
              {item.nickname.toUpperCase()}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#808080', fontSize: 11}}>
                {(() => {
                  if (item.genderCode === 'G0101') return <Text>남성</Text>;
                  else return <Text>여성</Text>;
                })()}{' '}
                /
                {(() => {
                  if (item.mbti1Code === 'M0101') return <Text> E</Text>;
                  else return <Text> I</Text>;
                })()}
                {(() => {
                  if (item.mbti2Code === 'M0201') return <Text>N</Text>;
                  else return <Text>S</Text>;
                })()}
                {(() => {
                  if (item.mbti3Code === 'M0301') return <Text>F</Text>;
                  else return <Text>T</Text>;
                })()}
                {(() => {
                  if (item.mbti4Code === 'M0401') return <Text>J</Text>;
                  else return <Text>P</Text>;
                })()}{' '}
                /
                {(() => {
                  if (item.ageRangeCode === 'A0101')
                    return <Text> 10대 미만</Text>;
                  else if (item.ageRangeCode === 'A0102')
                    return <Text> 10대</Text>;
                  else if (item.ageRangeCode === 'A0103')
                    return <Text> 20대</Text>;
                  else if (item.ageRangeCode === 'A0104')
                    return <Text> 30대</Text>;
                  else if (item.ageRangeCode === 'A0104')
                    return <Text> 40대</Text>;
                  else return <Text> 50대 이상</Text>;
                })()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Divider width={0.5} style={{margin: '1%'}} />
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{height: 0.5, width: '100%', backgroundColor: '#FFFFFF'}}></View>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 16}}>
      <TextInput
        style={styles.textInputStyle}
        value={search}
        placeholder="닉네임을 검색하세요"
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}></TextInput>
      <View style={{flex: 5.5}}>
        <KeyboardAwareFlatList
          data={filterdData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}></KeyboardAwareFlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  userNickname: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 14,
  },
  userInfo: {
    paddingTop: '1%',
    paddingRight: '1%',
  },
  textInputStyle: {
    height: 45,
    borderWidth: 1,
    paddingLeft: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
});
export default UserSearchScreen;
