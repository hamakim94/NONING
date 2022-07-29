import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState } from 'react';

export default function BoardHeader({board, navigation}) {

  return (
    <View style={styles.liveContainer}>
      <Text style={styles.liveButton(board.is_live)} >LIVE</ Text>
      <TouchableOpacity style={{marginHorizontal:6}} disabled={board.user_vote === 0} onPress={() =>
              navigation.navigate('HomeDetail', {screen: 'HomeDetail'})
            }>
        <AntDesign style={styles.detail(board.user_vote)} name="doubleright" size={20} />
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
  liveButton: (is_live) => ({
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
  detail: (user_vote) => ({
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    marginHorizontal: 5,
    color : user_vote > 0 ? '#000000' : '#ffffff',
  }),
});
