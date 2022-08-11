import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function ChatBar({betray, boardData}) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 4,
          flexDirection: 'row',
          marginHorizontal: '7%',
          marginTop: '2%',
          marginBottom: '2%',
          borderWidth: 1,
        }}>
        <View
          style={{
            flex:
              6 *
              (boardData.opt1Selected /
                (boardData.opt1Selected + boardData.opt2Selected)),
            width: '100%',
            height: '100%',
            backgroundColor:
              boardData.userVote === 1
                ? 'rgba(255,95,95,1)'
                : 'rgba(255,95,95,0.2)',
            borderRightWidth: 1,
            justifyContent: 'center',
          }}>
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
        <View
          style={{
            flex:
              6 *
              (boardData.opt2Selected /
                (boardData.opt1Selected + boardData.opt2Selected)),
            backgroundColor:
              boardData.userVote === 2
                ? 'rgba(73, 211, 202,1)'
                : 'rgba(73, 211, 202, 0.2)',
            justifyContent: 'center',
          }}>
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
        <TouchableOpacity style={{borderWidth: 1}} onPress={betray}>
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
