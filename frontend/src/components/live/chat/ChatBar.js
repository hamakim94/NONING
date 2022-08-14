import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function ChatBar({betray, boardData, waitButton}) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 4,
          flexDirection: 'row',
          minHeight: 50,
          maxHeight: 50,
          marginTop: '2%',
          marginBottom: '2%',
          paddingHorizontal: 50,
        }}>
        <View style={[styles.barLeftContainer(boardData)]}>
          <Text style={styles.barLeftText(boardData)}>{boardData.opt1}</Text>
          <Text style={styles.barLeftText(boardData)}>
            {Math.round(
              (boardData.opt1Selected /
                (boardData.opt1Selected + boardData.opt2Selected)) *
                100,
            )}
            %
          </Text>
        </View>
        <View style={[styles.barRightContainer(boardData)]}>
          <Text style={styles.barRightText(boardData)}>{boardData.opt2}</Text>
          <Text style={styles.barRightText(boardData)}>
            {Math.round(
              (boardData.opt2Selected /
                (boardData.opt1Selected + boardData.opt2Selected)) *
                100,
            )}
            %
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            height: 25,
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onPress={
            waitButton ? () => alert('60초 뒤에 다시 사용가능합니다.') : betray
          }>
          <Text
            style={{
              textAlign: 'center',
              marginHorizontal: 7,
            }}>
            배신하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barLeftContainer: (boardData) => ({
    width:
      (boardData.opt1Selected /
        (boardData.opt1Selected + boardData.opt2Selected)) *
        100 +
      '%',
    borderWidth:
      boardData.opt1Selected /
        (boardData.opt1Selected + boardData.opt2Selected) ==
      0
        ? 0
        : 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRadius:
      boardData.opt1Selected /
        (boardData.opt1Selected + boardData.opt2Selected) ==
      1
        ? 5
        : 0,
    backgroundColor:
      boardData.userVote === 1 ? 'rgba(255,95,95,1)' : 'rgba(255,95,95,0.2)',
    justifyContent: 'center',
  }),
  barRightContainer: (boardData) => ({
    width:
      (boardData.opt2Selected /
        (boardData.opt1Selected + boardData.opt2Selected)) *
        100 +
      '%',
    borderWidth:
      boardData.opt2Selected /
        (boardData.opt1Selected + boardData.opt2Selected) ==
      0
        ? 0
        : 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderRadius:
      boardData.opt2Selected /
        (boardData.opt1Selected + boardData.opt2Selected) ==
      1
        ? 5
        : 0,
    backgroundColor:
      boardData.userVote === 2
        ? 'rgba(73, 211, 202,1)'
        : 'rgba(73, 211, 202, 0.2)',
    justifyContent: 'center',
  }),

  barLeftText: (boardData) => ({
    color: boardData.userVote == 1 ? '#FFFFFF' : '#808080',
    fontWeight: boardData.userVote == 1 ? 'bold' : '',
    textAlign: 'center',
  }),
  barRightText: (boardData) => ({
    color: boardData.userVote == 2 ? '#FFFFFF' : '#808080',
    fontWeight: boardData.userVote == 2 ? 'bold' : '',
    textAlign: 'center',
  }),
});
