import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import UserContext from '../../util/UserContext';
// 투표 : /api/lives/{liveid}/vote

export default function LiveBar({live, setLives}) {
  const {userData} = useContext(UserContext);
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

  const posting = (num) => {
    // console.log(userData.userId + " " + num)
    UseAxios.post(`/boards/${live.boardId}/vote`, {
      userId: userData.userId,
      vote: num,
    })
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <View style={styles.barContainer}>
      <TouchableOpacity
        style={styles.leftBar(live.userVote, leftSize)}
        disabled={live.userVote > 0}
        onPress={() => {
          userData === null
            ? navigation.navigate('LoginNav', {screen: 'LoginNav'})
            : [setOpt1Selected(), posting(1)];
        }}>
        <Text style={styles.leftInnerText(live.userVote)}>{live.opt1}</Text>
        {live.userVote > 0 && (
          <Text style={styles.leftInnerText(live.userVote)}>{leftSize}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rightBar(live.userVote, rightSize)}
        disabled={live.userVote > 0}
        onPress={() => {
          userData === null
            ? navigation.navigate('LoginNav', {screen: 'LoginNav'})
            : [setOpt2Selected(), posting(2)];
        }}>
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
    flex: 2.4,
    width: '100%',
    padding: '3%',
    flexDirection: 'row',
  },
  leftBar: (userVote, leftSize) => ({
    width: userVote === 0 ? '50%' : leftSize,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    backgroundColor:
      userVote === 1 ? 'rgba(255,95,95,1)' : 'rgba(255,95,95,0.2)',
  }),
  rightBar: (userVote, rightSize) => ({
    width: userVote === 0 ? '50%' : rightSize,
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    backgroundColor:
      userVote === 2 ? 'rgba(73, 211, 202,1)' : 'rgba(73,211,202,0.2)',
  }),
  leftInnerText: (userVote) => ({
    color: userVote === 1 ? '#FFFFFF' : '#808080',
    fontWeight: userVote === 0 ? '' : userVote === 1 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 13,
  }),
  rightInnerText: (userVote) => ({
    color: userVote === 2 ? '#FFFFFF' : '#808080',
    fontWeight: userVote === 0 ? '' : userVote === 2 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 13,
  }),
});
