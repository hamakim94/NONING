import {StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import BoardHeader from './BoardHeader';
import BoardBar from './BoardBar';
import BoardFooter from './BoardFooter';

export default function Boards({board, boards, setBoards, navigation}) {
  return (
    <View>
      <View style={styles.container}>
        <BoardHeader board = {board} boards = {boards} setBoards={setBoards} navigation = {navigation}></BoardHeader>
        <View style={styles.titleContainer} >
          <Text style={styles.titleText}>
            {board.title}
          </Text>
        </View>
        <BoardBar board={board} boards={boards} setBoards={setBoards} ></BoardBar>
        <BoardFooter board={board} boards={boards} setBoards={setBoards} ></BoardFooter>
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
