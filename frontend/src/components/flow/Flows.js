import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import FlowBar from './FlowBar';
import FlowBottom from './FlowBottom';
import FireAnimation from '../animations/Fire';
import WaveAnimation from '../animations/Wave';

const windowHeight = Dimensions.get('window').height * 0.934;

function Flows({board, navigation}) {
  const [boardData, setBoardData] = useState(board);
  console.log('boardData' + boardData);

  return boardData.length === 0 ? (
    <View>
      {' '}
      <Text> Fffffffffffff</Text>
    </View>
  ) : (
    <View style={styles.mainContainer}>
      <WaveAnimation />
      <FireAnimation />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{board.title}</Text>
        </View>
        <FlowBar board={boardData} setBoards={setBoardData}></FlowBar>
        <FlowBottom
          board={boardData}
          setBoards={setBoardData}
          navigation={navigation}></FlowBottom>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    backgroundColor: '#FFFFFF',
  },
  container: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: '20%',
  },
  titleText: {
    width: '80%',
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.35,
  },
});

export default React.memo(Flows);
