import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useContext} from 'react';
import FlowBar from './FlowBar';
import FlowBottom from './FlowBottom';
import FireAnimation from '../animations/Fire';
import WaveAnimation from '../animations/Wave';
import UserContext from '../../util/UserContext';

function Flows({board, navigation}) {
  const [boardData, setBoardData] = useState(board);
  const {realHeight} = useContext(UserContext);
  return boardData.length === 0 ? (
    <View>
      {' '}
      <Text> Fffffffffffff</Text>
    </View>
  ) : (
    <View style={styles.mainContainer(realHeight)}>
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
  mainContainer: (realHeight) => ({
    backgroundColor: '#FFFFFF',
    height: realHeight,
  }),
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
