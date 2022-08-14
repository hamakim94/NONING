import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from '@rneui/themed';
import React from 'react';

export default function ChatInfoUser(user) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
      }}>
      <TouchableOpacity>
        <Avatar
          size={45}
          rounded
          containerStyle={[
            {
              backgroundColor: '#FFFFFF',
              borderWidth: 2.5,
              marginHorizontal: 10,
            },
            {
              borderColor: user.userVote == 1 ? '#FF5F5F' : '#49D3CA',
            },
          ]}
          source={{uri: user.user.img}}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: 5,
          color: '#000000',
        }}>
        {user.user.nickname}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
