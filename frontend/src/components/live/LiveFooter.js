import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

// 찜 : /api/lives/{liveid}/like          input : userId, reg
// 찜 취소 : /api/lives/{liveid}/unlike   input : userId

export default function LiveFooter({live, user_like, setUserLike ,opt1_selected, opt2_selected} ) {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.writerContainer}>
        <Text>호스트 :  </Text>
        <Image style={{ width:15 ,height:15, borderRadius:50 }} source={{uri : live.host.img}}></Image>
        <Text>{live.host.nickname}</Text>
      </View>

      <View style={styles.numberLikeContainer}>
        <Text style={{color : 'rgba(255,90,110,1)', fontWeight:'bold' }}>{opt1_selected} </Text>
        <Text>vs </Text>
        <Text style={{color : 'rgba(131,227,209,1)', fontWeight:'bold'}}>{opt2_selected} </Text>
        <Text>({opt1_selected + opt2_selected})</Text>
        <TouchableOpacity style={{margin:1}} onPress={() => setUserLike(Math.abs(1-user_like))}>
          <AntDesign style={styles.iconColor(user_like)} name="heart" size={20} />
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
    alignItems:'center'
  },
  numberLikeContainer: {
    flexDirection: 'row',
    alignItems:'center'
  },
  iconColor : (user_like) => ({
    color : user_like === 1 ? '#FF7171' : '#606060'
  })
});
