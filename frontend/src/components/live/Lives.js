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
        <View style={styles.cardContainer}>
          <LiveHeader live={liveData} navigation={navigation}></LiveHeader>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{live.title}</Text>
          </View>
          <LiveBar live={liveData} setLives={setLiveData}></LiveBar>
        </View>
        <LiveFooter live={liveData} setLives={setLiveData}></LiveFooter>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 20,
    height: 180,
    width: '100%',
  },
  cardContainer: {
    flex: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    // shadowOpacity : 0.1,
    // shadowRadius:0.1,
    // elevation:0.5,
  },
  titleText: {
    fontSize: 17,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleContainer: {
    flex: 2.4,
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
