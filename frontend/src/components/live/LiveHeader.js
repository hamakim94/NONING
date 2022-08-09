import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React, {useState} from 'react';

export default function LiveHeader({live, navigation}) {
  return (
    <View style={styles.liveContainer}>
      <Text style={styles.liveButton(live.isLive)}>LIVE</Text>
      <TouchableOpacity
        style={{marginHorizontal: 6}}
        disabled={live.user_vote === 0}
        onPress={() =>
          navigation.navigate('ChatNav', {
            screen: 'ChatInfoScreen',
            params: {id: live.boardId},
          })
        }>
        <Feather
          style={styles.detail(live.userVote)}
          name='chevrons-right'
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  liveContainer: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '1%',
  },
  liveButton: is_live => ({
    width: 50,
    borderColor: is_live === 1 ? '#FF7171' : '#808080',
    borderRadius: 5,
    color: is_live === 1 ? '#FF7171' : '#808080',
    borderWidth: is_live === 1 ? 2 : 1,
    fontWeight: 'bold',
    fontSize: 15,
    margin: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
  }),
  detail: user_vote => ({
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    marginHorizontal: 5,
    color: user_vote > 0 ? '#000000' : '#ffffff',
  }),
});
