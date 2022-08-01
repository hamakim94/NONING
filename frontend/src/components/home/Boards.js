import {StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import BoardHeader from './BoardHeader';
import BoardBar from './BoardBar';
import BoardFooter from './BoardFooter';

export default function Boards({board, boards, setBoards, navigation}) {
  const [boardData, setBoardData] = useState(board)
  return (
    <View>
      <View style={styles.container}>
        <BoardHeader board = {boardData}  navigation = {navigation}></BoardHeader>
        <View style={styles.titleContainer} >
          <Text style={styles.titleText}>
            {board.title}
          </Text>
        </View>
        <BoardBar board={boardData} setBoards={setBoardData} ></BoardBar>
        <BoardFooter board={boardData} setBoards={setBoardData} ></BoardFooter>
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
