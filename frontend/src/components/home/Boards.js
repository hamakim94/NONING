import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import BoardHeader from './BoardHeader';
import BoardBar from './BoardBar';
import BoardFooter from './BoardFooter';

export default function Boards() {
  return (
    <View>
      <View style={styles.container}>
        <BoardHeader></BoardHeader>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            퇴근 후 데이트 가는 길에 조수석에 이성 직장동료가 앉아있다 {'\n'}
            내가 뒷자리에 앉아서 타야된다면?
          </Text>
        </View>
        <BoardBar></BoardBar>
        <BoardFooter></BoardFooter>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 300,
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
    height: 150,
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
