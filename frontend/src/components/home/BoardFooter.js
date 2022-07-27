import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function BoardFooter() {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.writerContainer}>
        <Text>작성자 : </Text>
        <Image></Image>
        <Text>{}</Text>
      </View>

      <View style={styles.numberLikeContaner}>
        <Text>참여 : {} 명</Text>
        <TouchableOpacity style={{margin:1}}>
          <AntDesign style={{color: '#606060'}} name="hearto" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 10,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  writerContainer: {
    flexDirection: 'row',
  },
  numberLikeContaner: {
    flexDirection: 'row',
  },
});
