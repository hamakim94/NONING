import {
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

export default function FlowBlank({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 0.6, justifyContent: 'center'}}>
        <Image
          style={{height: 105, width: 135, alignSelf: 'center'}}
          source={require('../common/header-logo.png')}></Image>
      </View>
      <View styel={{flex: 2}}>
        <Text
          style={{
            textAlign: 'center',
            color: '#000000',
            fontSize: 15,
            fontWeight: 'bold',
            margin: 10,
          }}>
          텅~ 더 이상 투표할 논쟁이 없어요
        </Text>
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF5F5F',
              width: 200,
              padding: 10,
              borderRadius: 10,
              alignSelf: 'center',
            }}
            onPress={() => navigation.navigate('PlusScreen')}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontSize: 15,
                justifyContent: 'center',
              }}>
              새로운 논쟁 만들기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
