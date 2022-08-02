import {StyleSheet, Text, View, ActivityIndicator, Dimensions} from 'react-native';
import React, {useState} from 'react';
import FlowBar from './FlowBar'
import FlowBottom from './FlowBottom';
import FireAnimation from '../animations/Fire';
import WaveAnimation from '../animations/Wave';

const windowHeight = Dimensions.get('window').height;

export default function Flows({board, boards, setBoards, navigation}) {
  console.log('보드렌더링');
  const [boardData, setBoardData] = useState(board);

  return (
    <View style={{height:windowHeight*0.9}}>
      <View style={styles.container}>
        <WaveAnimation style={{position: 'absolute', top: 0, padding: 0, margin: 0, flex: 1}}/>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{board.title}</Text>
        </View>
        <FlowBar board={boardData} setBoards={setBoardData}></FlowBar>
        <FlowBottom  board={boardData} setBoards={setBoardData} navigation={navigation}></FlowBottom>
        <FireAnimation style={{position: 'absolute', bottom: 0, padding: 0, margin: 0, flex: 1}}/>
      </View>
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
