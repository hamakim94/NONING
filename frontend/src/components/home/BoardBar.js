import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';

export default function BoardBar() {
  // 이제 여기서 props로 넣어줄거야, 그래서 voted가 1 이상이면 터치 못 하게 해야해
  const [user_vote, setUserVote] = useState(0);
  const opt1_selected = 200;
  const opt2_selected = 400;
  const opt1_ratio = Math.round(opt1_selected/(opt1_selected+opt2_selected)*100);
  const opt2_ratio = 100 - opt1_ratio;
  const leftSize = opt1_ratio+'%';
  const rightSize = opt2_ratio + '%';
  
  return (
    <View style={styles.barContainer}>
        <TouchableOpacity style={ styles.leftBar(user_vote, leftSize)} disabled={user_vote > 0} onPress={() => setUserVote(1)}>
            <Text style={
                styles.leftInnerText(user_vote)}>용서 가능</Text>
            {user_vote > 0 && <Text style={styles.leftInnerText(user_vote)}>{leftSize}</Text>}
        </TouchableOpacity>
      <TouchableOpacity  style={styles.rightBar(user_vote, rightSize)} disabled={user_vote > 0} onPress={() => setUserVote(2)}>
       <Text style={styles.rightInnerText(user_vote)}>용서 불가능</Text>
       {user_vote > 0 && <Text style={styles.rightInnerText(user_vote)}>{rightSize}</Text>}
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
  leftBar : (user_vote, leftSize) => ({
    width: user_vote === 0 ? '50%' :  leftSize,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    backgroundColor: user_vote === 1 ? 'rgba(255,99,99,1)' : 'rgba(255,99,99,0.3)',
  }),
  rightBar : (user_vote, rightSize) =>  ({
    width : user_vote === 0 ? '50%' : rightSize,
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    backgroundColor: user_vote === 2 ? 'rgba(131,227,209,1)' :'rgba(131,227,209,0.3)'  ,
  }),
  leftInnerText : (user_vote) => ({
    color:'white',
    fontWeight: user_vote === 0 ? '': user_vote === 1 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
  }),
  rightInnerText : (user_vote) => ({
    color:'white',
    fontWeight: user_vote === 0 ? '': user_vote === 2 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
  }),
});
