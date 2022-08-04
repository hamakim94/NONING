import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';


// 투표 : /api/boards/{boardid}/vote 
export default function FlowBar({board,  boards, setBoards}) {
  // 이제 여기서 props로 넣어줄거야, 그래서 voted가 1 이상이면 터치 못 하게 해야해
  const opt1_ratio = Math.round(
    (board.opt1_selected / (board.opt1_selected + board.opt2_selected)) * 100,
  );
  const opt2_ratio = 100 - opt1_ratio;
  const leftSize = opt1_ratio + '%';
  const rightSize = opt2_ratio + '%';

  const setOpt1Selected = () => {
    setBoards({...board, opt1_selected: board.opt1_selected + 1, user_vote : 1})
  };
  const setOpt2Selected = () => {
    setBoards({...board, opt2_selected: board.opt2_selected + 1, user_vote : 2})
  };

  return (
    <View style={styles.barContainer}>
      <TouchableOpacity
            style={styles.leftBar(board.user_vote, leftSize)}
            disabled={board.user_vote > 0}
            onPress={() => setOpt1Selected()}>
            <Text style={styles.leftInnerText(board.user_vote)}>{board.opt1}</Text>
            {board.user_vote > 0 && (
            <Text style={styles.leftInnerText(board.user_vote)}>{leftSize}</Text>
            )}
      </TouchableOpacity>
      <TouchableOpacity
            style={styles.rightBar(board.user_vote, rightSize)}
            disabled={board.user_vote > 0}
            onPress={() => setOpt2Selected()}>
            <Text style={styles.rightInnerText(board.user_vote)}>{board.opt2}</Text>
            {board.user_vote > 0 && (
            <Text style={styles.rightInnerText(board.user_vote)}>
                {rightSize}
            </Text>
            )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    height: 100,
    alignSelf: 'center',
    width: '80%',
    padding: '5%',
    flexDirection: 'row',
  },
  leftBar: (user_vote, leftSize) => ({
    width: user_vote === 0 ? '50%' : leftSize,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    backgroundColor:
      user_vote === 1 ? 'rgba(255,90,110,1)' : 'rgba(255,90,110,0.3)',
  }),
  rightBar: (user_vote, rightSize) => ({
    width: user_vote === 0 ? '50%' : rightSize,
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    backgroundColor:
      user_vote === 2 ? 'rgba(131,227,209,1)' : 'rgba(131,227,209,0.3)',
  }),
  leftInnerText: user_vote => ({
    color: 'white',
    fontWeight: user_vote === 0 ? '' : user_vote === 1 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
  }),
  rightInnerText: user_vote => ({
    color: 'white',
    fontWeight: user_vote === 0 ? '' : user_vote === 2 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
  }),
});
