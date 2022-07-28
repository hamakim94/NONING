import {StyleSheet, Text, View} from 'react-native';

import React, { useState } from 'react';
import BoardHeader from './BoardHeader';
import BoardBar from './BoardBar';
import BoardFooter from './BoardFooter';

export default function Boards({board, navigation, setBoard}) {
  const [user_vote, setUserVote] = useState(board.user_vote)
  const [user_like, setUserLike] = useState(board.user_like)
  
  return (
    <View>
      <View style={styles.container}>
        <BoardHeader board = {board} user_vote={user_vote} navigation = {navigation}></BoardHeader>
        <View style={styles.titleContainer} >
          <Text style={styles.titleText}>
            {board.title}
          </Text>
        </View>
        <BoardBar board={board} user_vote={user_vote} setUserVote={setUserVote} ></BoardBar>
        <BoardFooter board={board} user_like = {user_like} setUserLike= {setUserLike} ></BoardFooter>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom:30,
    height: 250,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleContainer: {
    height: 120,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  writerContainer: {
    height: 30,
    width: '100%',
    borderBottomWidth: 1,
  },
});
