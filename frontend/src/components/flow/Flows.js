import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import FlowBar from './FlowBar';
import FlowBottom from './FlowBottom';
import FireAnimation from '../animations/Fire';
import WaveAnimation from '../animations/Wave';

const windowHeight = Dimensions.get('window').height;

function Flows({board, navigation}) {
  const [boardData, setBoardData] = useState(board);
  console.log('1번');
  return (
    <View style={{height: windowHeight * 0.935}}>
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
  container: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    flex: 1,
  },
  titleText: {
    width: '80%',
    fontSize: 20,
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
