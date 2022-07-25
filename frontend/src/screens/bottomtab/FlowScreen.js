import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function FlowScreen({navigation}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.push('DetailScreen', {screen: 'DetailScreen'})}>
      <Text>상세페이지</Text>
    </TouchableOpacity>
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
