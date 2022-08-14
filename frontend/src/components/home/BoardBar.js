import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import UserContext from '../../util/UserContext';
import DetailContext from '../boardDetail/DetailContext';
// 투표 : /api/boards/{boardid}/vote
export default function BoardBar({board, setBoards, navigation}) {
  const {userData, setUserData} = useContext(UserContext);
  const {participants, setParticipants} = useContext(DetailContext);
  // 이제 여기서 props로 넣어줄거야, 그래서 voted가 1 이상이면 터치 못 하게 해야해
  const opt1_ratio = Math.round(
    (board.opt1Selected / (board.opt1Selected + board.opt2Selected)) * 100,
  );
  const opt2_ratio = 100 - opt1_ratio;
  const leftSize = opt1_ratio + '%';
  const rightSize = opt2_ratio + '%';

  const setOpt1Selected = () => {
    setBoards({...board, opt1Selected: board.opt1Selected + 1, userVote: 1});
    const newUser = {
      userId: userData.userId,
      nickname: userData.nickname,
      img: userData.img,
      mbti1Code: userData.mbti1Code,
      mbti2Code: userData.mbti2Code,
      mbti3Code: userData.mbti3Code,
      mbti4Code: userData.mbti4Code,
      genderCode: userData.genderCode,
      age: userData.age,
      ageRangeCode: userData.ageRangeCode,
      vote: 1,
    };
    setParticipants(participants.concat(newUser));
  };
  const setOpt2Selected = () => {
    setBoards({...board, opt2Selected: board.opt2Selected + 1, userVote: 2});
    const newUser = {
      userId: userData.userId,
      nickname: userData.nickname,
      img: userData.img,
      mbti1Code: userData.mbti1Code,
      mbti2Code: userData.mbti2Code,
      mbti3Code: userData.mbti3Code,
      mbti4Code: userData.mbti4Code,
      genderCode: userData.genderCode,
      age: userData.age,
      ageRangeCode: userData.ageRangeCode,
      vote: 2,
    };
    setParticipants(participants.concat(newUser));
  };

  const posting = (num) => {
    // console.log(userData.userId + " " + num)
    UseAxios.post(`/boards/${board.boardId}/vote`, {
      userId: userData.userId,
      vote: num,
    })
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <View style={styles.barContainer}>
      <TouchableOpacity
        style={styles.leftBar(board.userVote, leftSize)}
        disabled={board.userVote > 0}
        onPress={() => {
          userData === null
            ? navigation.navigate('LoginNav', {screen: 'LoginNav'})
            : [setOpt1Selected(), posting(1)];
        }}>
        <Text style={styles.leftInnerText(board.userVote)}>{board.opt1}</Text>
        {board.userVote > 0 && (
          <Text style={styles.leftInnerText(board.userVote)}>{leftSize}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rightBar(board.userVote, rightSize)}
        disabled={board.userVote > 0}
        onPress={() => {
          userData === null
            ? navigation.navigate('LoginNav', {screen: 'LoginNav'})
            : [setOpt2Selected(), posting(2)];
        }}>
        <Text style={styles.rightInnerText(board.userVote)}>{board.opt2}</Text>
        {board.userVote > 0 && (
          <Text style={styles.rightInnerText(board.userVote)}>{rightSize}</Text>
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
