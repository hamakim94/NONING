import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function ChatBar() {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 4,
          flexDirection: 'row',
          marginHorizontal: '7%',
          marginTop: '2%',
          marginBottom: '2%',
          borderWidth: 1,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FF5F5F',
          }}></View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#49D3CA',
          }}></View>
      </View>
      <View style={{flex: 2}}>
        <Text style={{textAlign: 'center'}}>배신하기</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
