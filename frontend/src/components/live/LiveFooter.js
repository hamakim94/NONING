import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserContext from '../../util/UserContext';

export default function LiveFooter({live, setLives, navigation}) {
  const {userData} = useContext(UserContext);

  const like = () => {
    UseAxios.post(`/boards/${live.boardId}/like`, null, {
      params: {
        userId: userData.userId,
      },
    })
      .then((res) => {
        // console.log(res);
      })
      .then((err) => {
        // console.log(err);
      });
  };
  const unlike = () => {
    UseAxios.delete(`/boards/${live.boardId}/unlike?userId=${userData.userId}`)
      .then((res) => {
        // console.log(res);
      })
      .then((err) => {
        // console.log(err);
      });
  };

  const toggleLike = () => {
    setLives({...live, userLike: !live.userLike});
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.writerContainer}>
        {/* <Text style={{color: '#000000'}}>호스트 : </Text> */}
        <TouchableOpacity
          disabled={live ? (live.writerNickname ? false : true) : true}
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            live.writerNickname
              ? userData
                ? navigation.push('YourPageScreen', {id: live.writerId})
                : navigation.push('LoginNav')
              : Alert.alert('정보가 없습니다');
          }}>
          <Image
            style={{width: 15, height: 15, borderRadius: 50}}
            source={
              live.writerImg
                ? {uri: live.writerImg}
                : require('../../assets/DefaultProfile.jpg')
            }></Image>
          <Text style={{paddingLeft: 5, color: '#000000', fontSize: 13}}>
            {live.writerNickname === null
              ? '탈퇴한논장이'
              : live.writerNickname}{' '}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.numberLikeContainer}>
        <Text
          style={{
            color: 'rgba(255,95,95,1)',
            fontWeight: 'bold',
            fontSize: 13,
          }}>
          {live.liveOpt1Selected}{' '}
        </Text>
        <Text style={{color: '#000000'}}>vs </Text>
        <Text
          style={{
            color: 'rgba(73, 211, 202,1)',
            fontWeight: 'bold',
            fontSize: 13,
          }}>
          {live.liveOpt2Selected}{' '}
        </Text>
        <Text style={{paddingRight: 5, color: '#000000', fontSize: 13}}>
          ({live.liveOpt1Selected + live.liveOpt2Selected})
        </Text>
        <TouchableOpacity
          style={{margin: 1}}
          onPress={() => {
            userData === null
              ? navigation.navigate('LoginNav', {screen: 'LoginNav'})
              : [toggleLike(), live.userLike ? unlike() : like()];
          }}>
          <AntDesign
            style={styles.iconColor(live.userLike)}
            name="heart"
            size={17}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  writerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberLikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconColor: (userLike) => ({
    color: userLike ? '#FF5F5F' : '#c9c9c9',
  }),
});
