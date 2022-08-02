import {StyleSheet, Text, View, ActivityIndicator, Dimensions} from 'react-native';
import React, {useState} from 'react';
import FlowBar from './FlowBar'
import FlowBottom from './FlowBottom';
import FireAnimation from '../animations/Fire';
import FireAnimation2 from '../animations/Fire2';
import WaveAnimation from '../animations/Wave';
import WaveAnimation2 from '../animations/Wave2';
import WaveAnimation3 from '../animations/Wave3';
import WaveAnimation4 from '../animations/Wave4';

const windowHeight = Dimensions.get('window').height;

export default function Flows({board, boards, setBoards, navigation}) {
  console.log('보드렌더링');
  const [boardData, setBoardData] = useState(board);


  return (
    <View style={{height:windowHeight*0.9}}>
      <WaveAnimation />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{board.title}</Text>
        </View>
        <FlowBar board={boardData} setBoards={setBoardData}></FlowBar>
        <FlowBottom  board={boardData} setBoards={setBoardData} navigation={navigation}></FlowBottom>
      </View>
      <FireAnimation2 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    alignSelf: 'center',
    width: '100%',
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
