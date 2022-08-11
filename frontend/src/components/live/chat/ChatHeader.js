import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function ChatHeader({title, userCnt, navigation}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>뒤로가기</Text>
      </TouchableOpacity>
      <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 20}}>
        {title}({userCnt})
      </Text>
      <TouchableOpacity>
        <Text>우측버튼</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
