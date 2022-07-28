import {StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import BoardHeader from './BoardHeader';
import BoardBar from './BoardBar';
import BoardFooter from './BoardFooter';

export default function Boards({board, boards, toggleLike, navigation}) {
  const [opt1_selected, setOpt1Selected] = useState(board.opt1_selected);
  const [opt2_selected, setOpt2Selected] = useState(board.opt2_selected);
  const [user_vote, setUserVote] = useState(board.user_vote)
  const [user_like, setUserLike] = useState(board.user_like)
  // 계획 : 
  return (
    <View>
      <View style={styles.container}>
        <BoardHeader board = {board} user_vote={user_vote} navigation = {navigation}></BoardHeader>
        <View style={styles.titleContainer} >
          <Text style={styles.titleText}>
            {board.title}
          </Text>
        </View>
        <BoardBar board={board} user_vote={user_vote} setUserVote={setUserVote} setOpt1Selected={setOpt1Selected} setOpt2Selected={setOpt2Selected} opt1_selected={opt1_selected} opt2_selected={opt2_selected} ></BoardBar>
        <BoardFooter board={board} user_like = {user_like} setUserLike= {setUserLike} opt1_selected={opt1_selected} opt2_selected={opt2_selected} ></BoardFooter>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom:30,
    height: 250,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleContainer: {
    height: 120,
    width: '100%',
    padding:5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  writerContainer: {
    height: 30,
    width: '100%',
    borderBottomWidth: 1,
  },
});
