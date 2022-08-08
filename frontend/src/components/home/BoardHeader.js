import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';

export default function BoardHeader({board, navigation}) {

  return (
    <View style={styles.liveContainer}>
      <Text style={styles.liveButton(board.live)} >LIVE</ Text>
      <TouchableOpacity style={{marginHorizontal:6}} onPress={() =>
              navigation.navigate('HomeDetail', {boardId : board.boardId})
            }>
        <AntDesign style={styles.detail(1)} name="doubleright" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  liveContainer: {
    height: '13%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '1%',
  },
  liveButton: (live) => ({
    width: 40,
    borderColor: live ? '#FF5F5F' : '#808080',
    borderRadius: 5,
    color: live  ? '#FF5F5F': '#808080',
    borderWidth: live  ? 2 : 1,
    fontWeight: 'bold',
    fontSize: 12,
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
