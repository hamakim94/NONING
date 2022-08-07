import {StyleSheet, Text, Touchable, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ChatHeader({title}) {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity>
        <Text>뒤로가기</Text>
      </TouchableOpacity>
      <Text>{title}</Text>
      <TouchableOpacity>
        <Text>우측버튼</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
