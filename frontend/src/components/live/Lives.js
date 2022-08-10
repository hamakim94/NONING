import {StyleSheet, Text, View} from 'react-native';

import React, {useState, useEffect} from 'react';
import LiveHeader from './LiveHeader';
import LiveBar from './LiveBar';
import LiveFooter from './LiveFooter';

function Lives({live, navigation}) {
  const [liveData, setLiveData] = useState(live);
  useEffect(() => {
    setLiveData(live);
  }, [live]);

  return (
    <View>
      <View style={styles.container}>
        <LiveHeader live={liveData} navigation={navigation}></LiveHeader>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{live.title}</Text>
        </View>
        <LiveBar live={liveData} setLives={setLiveData}></LiveBar>
        <LiveFooter live={liveData} setLives={setLiveData}></LiveFooter>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 50,
    height: 200,
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 5,
    // shadowOpacity : 0.1,
    // shadowRadius:0.1,
    // elevation:0.5,
  },
  titleText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleContainer: {
    height: 90,
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  writerContainer: {
    height: 30,
    width: '100%',
    borderBottomWidth: 1,
  },
});

export default React.memo(Lives);
