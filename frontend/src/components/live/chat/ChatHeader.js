import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

export default function ChatHeader({title, userCnt, navigation}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
        minHeight: 30,
        maxHeight: 50,
        marginTop: '3.5%',
      }}>
      <View style={{flex: 0.7, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={25} color="#000000" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 4.6,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#000000',
            fontWeight: 'bold',
            fontSize: 20,
          }}
          numberOfLines={1}>
          {title}({userCnt})
        </Text>
      </View>
      <View style={{flex: 0.7, alignItems: 'center'}}>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" color="black" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
