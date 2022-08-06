import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

// 찜 : /api/lives/{liveid}/like          input : userId, reg
// 찜 취소 : /api/lives/{liveid}/unlike   input : userId

export default function LiveFooter({live, setLives}) {
  const toggleLike = () => {
    setLives({...live, userLike: Math.abs(1 - live.userLike)});
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.writerContainer}>
        <Text>호스트 : </Text>
        <Text>{live.writerNickname}</Text>
      </View>

      <View style={styles.numberLikeContainer}>
        <Text style={{color: 'rgba(255,90,110,1)', fontWeight: 'bold'}}>
          {live.opt1Selected}{' '}
        </Text>
        <Text>vs </Text>
        <Text style={{color: 'rgba(131,227,209,1)', fontWeight: 'bold'}}>
          {live.opt2Selected}{' '}
        </Text>
        <Text>({live.opt1Selected + live.opt2Selected})</Text>
        <TouchableOpacity style={{margin: 1}} onPress={() => toggleLike()}>
          <AntDesign
            style={styles.iconColor(live.userLike)}
            name="heart"
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  writerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberLikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconColor: userLike => ({
    color: userLike === 1 ? '#FF7171' : '#606060',
  }),
});
