import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UseAxios from '../../util/UseAxios';
import UserContext from '../../util/UserContext';

export default function FlowBottom({setBoards, board, navigation}) {
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

  const uriImg = board.writerImg
    ? {uri: board.writerImg}
    : require('../../assets/DefaultProfile.jpg');

  return (
    <View style={{flex: 0.25}}>
      <View style={{alignItems: 'flex-end', justifyContent: 'flex-start'}}>
        <TouchableOpacity
          style={styles.clickDetail}
          onPress={() =>
            navigation.push('DetailNav', {
              screen: 'DetailScreen',
              params: {boardId: board.boardId},
            })
          }>
          <MaterialCommunityIcons
            name={'text-box-search-outline'}
            size={30}
            color={'#c9c9c9'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clickLike}
          onPress={() => [toggleLike(), board.userLike ? unlike() : like()]}>
          <AntDesign
            style={styles.iconColor(board.userLike)}
            name="heart"
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={board ? (board.writerNickname ? false : true) : true}
          style={{flexDirection: 'row'}}
          onPress={() =>
            navigation.push('YourPageScreen', {id: board.writerId})
          }>
          <Image style={styles.clickWriter} source={uriImg}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  clickDetail: {
    paddingRight: '2.5%',
    marginTop: '3%',
  },
  clickLike: {
    paddingRight: '3%',
    marginTop: '3%',
  },
  iconColor: (userLike) => ({
    color: userLike ? '#FF5F5F' : '#c9c9c9',
  }),
  clickWriter: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: '2.3%',
    marginTop: '2.5%',
    borderWidth: 2,
    borderColor: '#c9c9c9',
  },
});
