import {StyleSheet, Text, View} from 'react-native';

import React, { useState } from 'react';
import LiveHeader from './LiveHeader';
import LiveBar from './LiveBar';
import LiveFooter from './LiveFooter';

export default function Lives({live, navigation}) {
  const [user_vote, setUserVote] = useState(live.user_vote)
  const [user_like, setUserLike] = useState(live.user_like)
  const [opt1_selected, setOpt1Selected] = useState(live.opt1_selected);
  const [opt2_selected, setOpt2Selected] = useState(live.opt2_selected);
  return (
    <View>
      <View style={styles.container}>
        <LiveHeader live = {live} user_vote={user_vote} navigation = {navigation}></LiveHeader>
        <View style={styles.titleContainer} >
          <Text style={styles.titleText}>
            {live.title}
          </Text>
        </View>
        <LiveBar live={live} user_vote={user_vote} setUserVote={setUserVote} setOpt1Selected={setOpt1Selected} setOpt2Selected={setOpt2Selected} opt1_selected={opt1_selected} opt2_selected={opt2_selected} ></LiveBar>
        <LiveFooter live={live} user_like = {user_like} setUserLike= {setUserLike} opt1_selected={opt1_selected} opt2_selected={opt2_selected} ></LiveFooter>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom:30,
    height: 250,
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
    height: 120,
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
