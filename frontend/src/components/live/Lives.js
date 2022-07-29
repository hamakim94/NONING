import {StyleSheet, Text, View} from 'react-native';

import React, { useState } from 'react';
import LiveHeader from './LiveHeader';
import LiveBar from './LiveBar';
import LiveFooter from './LiveFooter';

export default function Lives({live, navigation}) {
  const [liveData, setLiveData] = useState(live)
  return (
    <View>
      <View style={styles.container}>
        <LiveHeader live = {liveData} navigation = {navigation}></LiveHeader>
        <View style={styles.titleContainer} >
          <Text style={styles.titleText}>
            {live.title}
          </Text>
        </View>
        <LiveBar live={liveData} setLives={setLiveData} ></LiveBar>
        <LiveFooter live={liveData}  setLives={setLiveData} ></LiveFooter>
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
