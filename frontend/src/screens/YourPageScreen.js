import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {USER} from '../data/user';
import VoteLike from '../components/userpage/VoteLike';
import VoteDo from '../components/userpage/VoteDo';
import VoteWrite from '../components/userpage/VoteWrite';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import UserContext from '../util/UserContext';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#FF5F5F',
      width: '8%',
      marginHorizontal: '7%',
    }}
    tabStyle={{
      paddingBottom: '10%',
      paddingTop: '1%',
    }}
    pressColor={'transparent'}
    style={{
      backgroundColor: '#FFFFFF',
      shadowColor: '#FFFFFF',
      borderBottomWidth: 0.3,
      borderBottomColor: '#808080',
      borderTopColor: '#808080',
      height: '10%',
    }}
    renderLabel={({route, focused}) => (
      <Text
        style={
          focused
            ? {
                color: '#FF5F5F',
                margin: 0,
                padding: 0,
                fontWeight: 'bold',
                fontSize: 15,
              }
            : {margin: 0, padding: 0, color: '#000000', fontSize: 15}
        }>
        {route.title}
      </Text>
    )}
  />
);

const initialLayout = {width: Dimensions.get('window').width};

export default function YourPageScreen({route, navigation}) {
  const [yourPageData, setYourPageData] = useState([]);
  const [index, setIndex] = useState(0);
  const id = route.params.id;
  const isFocused = useIsFocused();
  const {userData} = useContext(UserContext);
  const [active, setActive] = useState(false);

  const [routes] = useState([
    {key: 0, title: userData.userId === id ? '내찜논' : '얘찜논'},
    {key: 1, title: userData.userId === id ? '내참논' : '얘참논'},
    {key: 2, title: userData.userId === id ? '내만논' : '얘만논'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 0:
        return <VoteLike navigation={navigation} myPageData={yourPageData} />;
      case 1:
        return <VoteDo navigation={navigation} myPageData={yourPageData} />;
      case 2:
        return (
          <VoteWrite
            navigation={navigation}
            id={id}
            myPageData={yourPageData}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    UseAxios.get(`/users/${id}/page`).then((res) => {
      setYourPageData(res.data);
      console.log(
        '데이터 ---------------------------------------- : \n' + res.data,
      );
    });
  }, [isFocused]);

  const follow = () => {
    console.log('팔');
    UseAxios.post(`/follows/add`, {
      userId: userData.userId,
      targetUserId: id,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollow = () => {
    console.log('언팔');
    UseAxios.post(`/follows/delete`, {
      userId: userData.userId,
      targetUserId: id,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fakeFollow = (myId) => {
    setYourPageData({
      ...yourPageData,
      followerIdList: [...yourPageData.followerIdList, myId],
    });
  };
  const fakeUnFollow = (myId) => {
    setYourPageData({
      ...yourPageData,
      followerIdList: yourPageData.followerIdList.filter((e) => e !== myId),
    });
  };
  // console.log(yourPageData.followerIdList);
  // console.log(userData.userId);

  return (
    <View style={styles.container}>
      {id === userData.userId ? (
        <View style={{flex: 0.07, alignSelf: 'flex-end'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.push('SettingNav', {screen: 'SettingNav'})
            }>
            <Ionicons name={'settings'} size={28} color={'#A6A6A6'} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 0.07, alignSelf: 'flex-end'}} />
      )}

      <View style={{flex: 0.26}}>
        {/* 프로필 이미지, 팔로우/팔로워*/}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* 프로필 이미지 */}
          <View style={styles.profileImageBox}>
            <View>
              {yourPageData.user ? (
                yourPageData.user.img ? (
                  <Image
                    source={{uri: yourPageData.user.img}}
                    style={styles.profileImage}
                  />
                ) : (
                  <Image
                    source={require('../assets/DefaultProfile.jpg')}
                    style={styles.profileImage}
                  />
                )
              ) : (
                <Image
                  source={require('../assets/DefaultProfile.jpg')}
                  style={styles.profileImage}
                />
              )}
            </View>
          </View>
          {/* 팔로우/팔로워 */}
          <View style={styles.followsBox}>
            <View style={styles.follows}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('FollowerScreen', {
                    id: yourPageData.user.userId,
                  })
                }>
                <Text style={{color: '#000000', fontWeight: '500'}}>
                  {' '}
                  follower
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#000000',
                    fontWeight: '500',
                  }}>
                  {yourPageData.followerIdList
                    ? yourPageData['followerIdList'].length
                    : ''}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('FollowingScreen', {
                    id: yourPageData.user.userId,
                  })
                }>
                <Text style={{color: '#000000', fontWeight: '500'}}>
                  {' '}
                  following
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#000000',
                    fontWeight: '500',
                  }}>
                  {yourPageData.followingIdList
                    ? yourPageData['followingIdList'].length
                    : ''}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'row', flex: 0.13}}>
        {/* 닉네임, 특징 */}
        <View style={{marginStart: '5%', flex: 2}}>
          <View>
            <Text
              style={{
                paddingBottom: '1.5%',
                fontWeight: 'bold',
                color: '#000000',
              }}>
              {yourPageData.user ? yourPageData.user.nickname : ''}
            </Text>
            {yourPageData.user ? (
              <Text style={{color: '#000000', fontWeight: '500'}}>
                {(() => {
                  if (yourPageData.user.genderCode === 'G0101')
                    return <Text>남성</Text>;
                  else return <Text>여성</Text>;
                })()}{' '}
                /
                {(() => {
                  if (yourPageData.user.mbti1Code === 'M0101')
                    return <Text> E</Text>;
                  else return <Text> I</Text>;
                })()}
                {(() => {
                  if (yourPageData.user.mbti2Code === 'M0201')
                    return <Text>N</Text>;
                  else return <Text>S</Text>;
                })()}
                {(() => {
                  if (yourPageData.user.mbti3Code === 'M0301')
                    return <Text>F</Text>;
                  else return <Text>T</Text>;
                })()}
                {(() => {
                  if (yourPageData.user.mbti4Code === 'M0401')
                    return <Text>J</Text>;
                  else return <Text>P</Text>;
                })()}{' '}
                /
                {(() => {
                  if (yourPageData.user.ageRangeCode === 'A0101')
                    return <Text> 10대 미만</Text>;
                  else if (yourPageData.user.ageRangeCode === 'A0102')
                    return <Text> 10대</Text>;
                  else if (yourPageData.user.ageRangeCode === 'A0103')
                    return <Text> 20대</Text>;
                  else if (yourPageData.user.ageRangeCode === 'A0104')
                    return <Text> 30대</Text>;
                  else if (yourPageData.user.ageRangeCode === 'A0104')
                    return <Text> 40대</Text>;
                  else return <Text> 50대 이상</Text>;
                })()}
              </Text>
            ) : (
              ''
            )}
          </View>
        </View>
        <View style={{flex: 2}}>
          {userData.userId === id ? (
            <></>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: yourPageData.followerIdList
                  ? yourPageData.followerIdList.indexOf(userData.userId) >= 0
                    ? '#c9c9c9'
                    : 'rgba(255,95,95,1)'
                  : '#FFFFFF',
                borderRadius: 10,
                width: '80%',
                height: '50%',
                marginTop: '2.5%',
                alignContent: 'center',
                marginStart: '2.5%',
              }}
              onPress={() => {
                yourPageData.followerIdList.indexOf(userData.userId) >= 0
                  ? [unfollow(), fakeUnFollow(userData.userId)]
                  : [follow(), fakeFollow(userData.userId)];
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  alignSelf: 'center',
                  paddingVertical: '3.5%',
                  fontWeight: 'bold',
                }}>
                {yourPageData.followerIdList
                  ? yourPageData.followerIdList.indexOf(userData.userId) >= 0
                    ? '팔로잉'
                    : '팔로우'
                  : ''}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={{flex: 0.8}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  profileImageBox: {
    flex: 2,
    alignItems: 'flex-start',
    marginStart: '4%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#c9c9c9',
  },
  followsBox: {
    flex: 3,
  },
  follows: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '10%',
    marginTop: '10%',
  },
  detail: {
    paddingTop: '0.8%',
    paddingRight: '1.5%',
    alignSelf: 'flex-end',
  },
});
