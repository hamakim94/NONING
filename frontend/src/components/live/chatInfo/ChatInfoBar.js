import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function ChatInfoBar({navigation, boardData}) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
      }}>
      <View
        style={{
          flex: 3,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <Text
          style={{
            color: '#000000',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          {boardData.title}
        </Text>
      </View>
      <View
        style={{
          flex: 1.7,
          flexDirection: 'row',
          minHeight: 50,
          maxHeight: 50,
          marginBottom: 20,
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
          flex: 1.2,
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: 40,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 3,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            width: 80,
            height: 30,
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('ChatScreen', {data: boardData})}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000000',
            }}>
            채팅방 입장
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
