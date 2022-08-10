import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import UseAxios from '../util/UseAxios';
import UserContext from '../util/UserContext';
import {useIsFocused} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {Divider} from '@rneui/themed';

function FollowingScreen({route, navigation}) {
  const [followData, setFollowData] = useState([]);
  const {userData} = useContext(UserContext);
  const [myData, setMyData] = useState([]);
  const isFocused = useIsFocused();
  const [fake, setFake] = useState(false);
  const id = route.params.id;

  useEffect(() => {
    UseAxios.get(`/follows/list/${id}`)
      .then((res) => {
        setFollowData(res.data);
        console.log(followData);
        console.log('페이지 주인:' + id);
      })
      .then(console.log(followData));
  }, [isFocused, fake]);

  useEffect(() => {
    UseAxios.get(`/users/${userData.userId}/page`).then((res) => {
      setMyData(res.data);
      console.log(myData);
    });
  }, [isFocused]);

  const follow = (item) => {
    console.log('팔');
    UseAxios.post(`/follows/add`, {
      userId: userData.userId,
      targetUserId: item.userId,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollow = (item) => {
    console.log('언팔');
    UseAxios.post(`/follows/delete`, {
      userId: userData.userId,
      targetUserId: item.userId,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fakeFollow = (yourId) => {
    setMyData({
      ...myData,
      followingIdList: [...myData.followingIdList, yourId],
    });
  };
  const fakeUnFollow = (yourId) => {
    setMyData({
      ...myData,
      followingIdList: myData.followingIdList.filter((e) => e !== yourId),
    });
  };

  const ItemView = ({item}) => {
    return (
      <View style={{flex: 1, paddingHorizontal: 16}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flexDirection: 'row', flex: 1.5, margin: '1%'}}
            navigation={navigation}
            onPress={() =>
              navigation.navigate('YourPageScreen', {id: item.userId})
            }>
            <View
              style={{
                flexDirection: 'row',
                flex: 0.3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={
                  item.img
                    ? {uri: item.img}
                    : require('../assets/DefaultProfile.jpg')
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
              style={{
                flex: 1,
                alignSelf: 'flex-start',
                paddingVertical: '5%',
                paddingStart: 10,
              }}>
              <Text style={styles.userNickname}>{item.nickname}</Text>
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
                    if (item.mbti4Code === 'M0401') return <Text>P</Text>;
                    else return <Text>J</Text>;
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
          <TouchableOpacity
            style={{flex: 0.5, justifyContent: 'center'}}
            onPress={() => {
              myData.followingIdList.indexOf(item.userId) >= 0
                ? [unfollow(item), fakeUnFollow(item.userId)]
                : [follow(item), fakeFollow(item.userId)];
            }}>
            <Text
              style={{
                textAlign: 'center',
                height: '30%',
                width: '80%',
                textAlignVertical: 'center',
                borderRadius: 10,
                backgroundColor: myData.followingIdList
                  ? myData.followingIdList.indexOf(item.userId) >= 0
                    ? '#c9c9c9'
                    : 'rgba(255,95,95,1)'
                  : '#FFFFFF',
                color: '#FFFFFF',
              }}>
              {myData.followingIdList
                ? myData.followingIdList.indexOf(item.userId) >= 0
                  ? '팔로잉'
                  : '팔로우'
                : ''}
            </Text>
          </TouchableOpacity>
        </View>
        <Divider width={0.5} style={{margin: '0.5%'}} />
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 0.5, flexDirection: 'row', marginVertical: '3%'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={{}} onPress={() => navigation.pop()}>
            <Feather name="chevron-left" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
        <View style={{flex: 4, justifyContent: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: '#000000',
              textAlign: 'center',
            }}>
            Following
          </Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={{flex: 5.5}}>
        <FlatList
          navigation={navigation}
          data={followData.followings}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}></FlatList>
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
export default FollowingScreen;
