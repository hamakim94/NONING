import {StyleSheet, ScrollView, View, Text} from 'react-native';
import PrivacyText from '../../components/common/PrivacyText';
import React from 'react';

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:30, marginBottom:20 ,color:'#000000'}}>개인정보 처리방침</Text>
      <ScrollView style={ styles.textContainer}>
        <PrivacyText />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#FFFFFF',
    paddingTop:30,
    flex:1,
    alignItems:'center',
  },
  textContainer : {
    width:'90%',
    borderWidth:1,
    borderRadius:5,

  }
  
});
