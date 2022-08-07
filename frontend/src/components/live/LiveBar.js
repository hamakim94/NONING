import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
// 투표 : /api/lives/{liveid}/vote

export default function LiveBar({live, setLives}) {
  // 이제 여기서 props로 넣어줄거야, 그래서 voted가 1 이상이면 터치 못 하게 해야해
  const opt1_ratio = Math.round(
    (live.opt1Selected / (live.opt1Selected + live.opt2Selected)) * 100,
  );
  const opt2_ratio = 100 - opt1_ratio;
  const leftSize = opt1_ratio + '%';
  const rightSize = opt2_ratio + '%';

  const setOpt1Selected = () => {
    setLives({...live, opt1Selected: live.opt1Selected + 1, userVote: 1});
  };
  const setOpt2Selected = () => {
    setLives({...live, opt2Selected: live.opt2Selected + 1, userVote: 2});
  };

  return (
    <View style={styles.barContainer}>
      <TouchableOpacity
        style={styles.leftBar(live.userVote, leftSize)}
        disabled={live.userVote > 0}
        onPress={() => setOpt1Selected()}>
        <Text style={styles.leftInnerText(live.userVote)}>{live.opt1}</Text>
        {live.userVote > 0 && (
          <Text style={styles.leftInnerText(live.userVote)}>{leftSize}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rightBar(live.userVote, rightSize)}
        disabled={live.userVote > 0}
        onPress={() => setOpt2Selected()}>
        <Text style={styles.rightInnerText(live.userVote)}>{live.opt2}</Text>
        {live.userVote > 0 && (
          <Text style={styles.rightInnerText(live.userVote)}>{rightSize}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    height: 100,
    width: '100%',
    padding: '5%',
    flexDirection: 'row',
  },
  leftBar: (userVote, leftSize) => ({
    width: userVote === 0 ? '50%' : leftSize,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    backgroundColor:
      userVote === 1 ? 'rgba(255,99,99,1)' : 'rgba(255,99,99,0.3)',
  }),
  rightBar: (userVote, rightSize) => ({
    width: userVote === 0 ? '50%' : rightSize,
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    backgroundColor:
      userVote === 2 ? 'rgba(131,227,209,1)' : 'rgba(131,227,209,0.3)',
  }),
  leftInnerText: userVote => ({
    color: 'white',
    fontWeight: userVote === 0 ? '' : userVote === 1 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
  }),
  rightInnerText: userVote => ({
    color: 'white',
    fontWeight: userVote === 0 ? '' : userVote === 2 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
  }),
});
