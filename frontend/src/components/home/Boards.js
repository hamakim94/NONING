import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BoardHeader from './BoardHeader';
import BoardBar from './BoardBar';
import BoardFooter from './BoardFooter';

function Boards({board, navigation}) {
  const [boardData, setBoardData] = useState(board);

  useEffect(() => {
    setBoardData(board);
  }, [board])
  
  return (
    <View>
      <View style={styles.container}>
        <BoardHeader board={boardData} navigation={navigation}></BoardHeader>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{board.title}</Text>
        </View>
        <BoardBar board={boardData} setBoards={setBoardData} navigation={navigation}></BoardBar>
        <BoardFooter board={boardData} setBoards={setBoardData } navigation={navigation}></BoardFooter>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 30,
    height: 200,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleContainer: {
    height: 90,
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  writerContainer: {
    height: 30,
    width: '100%',
    borderBottomWidth: 1,
  },
});

export default React.memo(Boards);
