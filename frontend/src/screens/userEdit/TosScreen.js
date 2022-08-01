import {StyleSheet, ScrollView, View, Text} from 'react-native';
import TosText from '../../components/common/TosText';
import React from 'react';

export default function TosScreen() {
  return (
    <View style={styles.container}>
      <Text >서비스 이용약관</Text>
      <ScrollView style={styles.textContainer}>
        <TosText />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    marginTop:30,
    flex:1,
    alignItems:'center',
  },
  textContainer : {
    width:'90%',
    borderWidth:1,
    borderRadius:5,

  }
});
