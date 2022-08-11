import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import UseAxios from '../util/UseAxios';
import UserContext from '../util/UserContext';
import {useIsFocused} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {Divider} from '@rneui/themed';

function FollowerScreen({route, navigation}) {
  const [followData, setFollowData] = useState([]);
  const {userData} = useContext(UserContext);
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

  const followDelete = (userId) => {
    console.log('팔취');
    UseAxios.post(`/follows/followers/delete`, {
      userId: userData.userId,
      targetUserId: userId,
    })
      .then((res) => {
        console.log(res.headers);
        console.log(followData.followers);
        console.log(userId);
      })
      .catch((err) => {
        console.log(err);
      });
    [isFocused];
  };

  const remove = (userId) => {
    Alert.alert(
      '팔로우 취소',
      '정말로 삭제하시겠어요?',
      [
        {
          text: '삭제',
          onPress: () => {
            [fakeFollowDelete(userId), followDelete(userId), setFake(!fake)];
          },
        },
        {text: '취소', onPress: () => {}},
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  const fakeFollowDelete = (userId) => {
    setFollowData({
      ...followData,
      followers: followData.followers.filter((e) => e !== userId),
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
              userData.userId === id ? [remove(item.userId)] : [];
            }}>
            {userData.userId === id ? (
              <Text
                style={{
                  textAlign: 'center',
                  height: '30%',
                  width: '80%',
                  textAlignVertical: 'center',
                  borderRadius: 10,
                  backgroundColor: 'rgba(255,95,95,1)',
                  color: '#FFFFFF',
                }}>
                {userData.userId === id ? '삭제' : ''}
              </Text>
            ) : (
              ''
            )}
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
            Follower
          </Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={{flex: 5.5}}>
        <FlatList
          navigation={navigation}
          data={followData.followers}
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
export default FollowerScreen;
