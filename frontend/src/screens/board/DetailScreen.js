import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function DetailScreen() {
  return (
    <View style={styles.container}>
      <View style={{flex: 6, borderWidth: 2}}>
        <Text>DetailScreen1</Text>
      </View>
      <View style={{flex: 0, borderWidth: 2}}>
        <Text>DetailScreen2</Text>
      </View>
      <View style={{flex: 6, borderWidth: 2}}>
        <Text>DetailScreen3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
});
