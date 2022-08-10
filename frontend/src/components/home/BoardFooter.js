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

export default function BoardFooter({board, setBoards, navigation}) {
  const {userData} = useContext(UserContext);

  const like = () => {
    UseAxios.post(`/boards/${board.boardId}/like`, null, {
      params: {
        userId: userData.userId,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  };
  const unlike = () => {
    UseAxios.delete(`/boards/${board.boardId}/unlike?userId=${userData.userId}`)
      .then((res) => {
        // console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  };

  const toggleLike = () => {
    setBoards({...board, userLike: !board.userLike});
  };
  // const uriImg = board.writerImg ? {uri:board.writerImg} : require('../../assets/DefaultProfile.jpg')

  return (
    <View style={styles.footerContainer}>
      <View style={styles.writerContainer}>
        <Text style={{color: '#000000'}}>작성자 : </Text>
        <TouchableOpacity
<<<<<<< HEAD
          style={{flexDirection: 'row'}}
          onPress={() =>
            navigation.push('YourPageScreen', {id: board.writerId})
          }>
=======
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            board.writerNickname
              ? userData
                ? navigation.push('YourPageScreen', {id: board.writerId})
                : navigation.push('LoginNav')
              : Alert.alert('정보가 없습니다');
          }}>
>>>>>>> c8fcf117d52530e50c37949417338142f2370349
          <Image
            style={{width: 15, height: 15, borderRadius: 50}}
            source={
              board.writerImg
                ? {uri: board.writerImg}
                : require('../../assets/DefaultProfile.jpg')
            }></Image>
          <Text style={{paddingLeft: 5, color: '#000000'}}>
            {board.writerNickname}{' '}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.numberLikeContainer}>
        <Text style={{paddingRight: 5, color: '#000000'}}>
          참여 : {board.opt1Selected + board.opt2Selected}명
        </Text>
        <TouchableOpacity
          style={{margin: 1}}
          onPress={() => {
            userData === null
              ? navigation.navigate('LoginNav', {screen: 'LoginNav'})
              : [toggleLike(), board.userLike ? unlike() : like()];
          }}>
          <AntDesign
            style={styles.iconColor(board.userLike)}
            name="heart"
            size={20}
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
