import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function ChatInfoScreen({navigation}) {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.push('ChatBoardDetailScreen', {
            screen: 'ChatBoardDetailScreen',
          })
        }>
        <Text>글상세보기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.push('ChatUserListScreen', {screen: 'ChatUserListScreen'})
        }>
        <Text>채팅방인원</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
