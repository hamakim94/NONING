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
    marginTop: 5,
    marginBottom: 50,
    height: 200,
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 5,
    // shadowOpacity : 0.1,
    // shadowRadius:0.1,
    // elevation:0.5,
  },
  titleText: {
    fontSize: 20,
    color: '#000000',
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
