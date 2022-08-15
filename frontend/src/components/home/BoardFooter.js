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
import LoginAlert from '../../util/LoginAlert';

export default function BoardFooter({board, setBoards, navigation}) {
  const {userData} = useContext(UserContext);

  const like = () => {
    UseAxios.post(`/boards/${board.boardId}/like`, null, {
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
    UseAxios.delete(`/boards/${board.boardId}/unlike?userId=${userData.userId}`)
      .then((res) => {
        // console.log(res);
      })
      .then((err) => {
        // console.log(err);
      });
  };

  const toggleLike = () => {
    setBoards({...board, userLike: !board.userLike});
  };
  // const uriImg = board.writerImg ? {uri:board.writerImg} : require('../../assets/DefaultProfile.jpg')

  return (
    <View style={styles.footerContainer}>
      <View style={styles.writerContainer}>
        {/* <Text style={{color: '#000000'}}>작성자 : </Text> */}
        <TouchableOpacity
          disabled={board.writerNickname === null ? true : false}
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() =>
            userData === null
              ? LoginAlert(navigation)
              : navigation.push('YourPageScreen', {id: board.writerId})
          }>
          <Image
            style={{width: 15, height: 15, borderRadius: 50}}
            source={
              board.writerImg
                ? {uri: board.writerImg}
                : require('../../assets/DefaultProfile.jpg')
            }></Image>
          <Text style={{paddingLeft: 5, color: '#000000', fontSize: 13}}>
            {board.writerNickname === null
              ? '탈퇴한논장이'
              : board.writerNickname}{' '}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.numberLikeContainer}>
        <Text style={{paddingRight: 5, color: '#000000', fontSize: 13}}>
          참여 : {board.opt1Selected + board.opt2Selected}명
        </Text>
        <TouchableOpacity
          style={{margin: 1}}
          onPress={() => {
            userData === null
              ? LoginAlert(navigation)
              : [toggleLike(), board.userLike ? unlike() : like()];
          }}>
          <AntDesign
            style={styles.iconColor(board.userLike)}
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
