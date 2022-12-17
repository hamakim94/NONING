import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React, {useContext} from 'react';
import LoginAlert from '../../util/LoginAlert';
import UserContext from '../../util/UserContext';

export default function BoardHeader({board, navigation}) {
  const {userData} = useContext(UserContext);
  return (
    <View style={styles.liveContainer}>
      <Text style={styles.liveButton(board.live)}>LIVE</Text>
      <TouchableOpacity
        style={{marginHorizontal: 6}}
        onPress={() =>
          userData === null
            ? LoginAlert(navigation)
            : navigation.navigate('DetailNav', {
                screen: 'DetailScreen',
                params: {boardId: board.boardId},
              })
        }>
        <Feather style={styles.detail(1)} name="chevrons-right" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  liveContainer: {
    flex: 1.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    paddingTop: '2%',
  },
  liveButton: (live) => ({
    width: 40,
    borderColor: live ? '#FF5F5F' : '#808080',
    borderRadius: 5,
    color: live ? '#FF5F5F' : '#808080',
    borderWidth: live ? 2 : 1,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  }),
  detail: (user_vote) => ({
    justifyContent: 'center',
    alignItems: 'center',
    color: user_vote > 0 ? '#c9c9c9' : '#ffffff',
  }),
});
