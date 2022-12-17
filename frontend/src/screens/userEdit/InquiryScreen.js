import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export default function InquiryScreen() {
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 0.6, justifyContent: 'center'}}>
        <Image
          style={{height: 105, width: 135, alignSelf: 'center'}}
          source={require('../../components/common/header-logo.png')}></Image>
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            color: '#000000',
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          급한 용무는 개인적으로 연락바랍니다.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
