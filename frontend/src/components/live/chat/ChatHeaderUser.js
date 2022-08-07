import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from '@rneui/themed';
import React from 'react';

export default function ChatHeaderUser({user}) {
  return (
    <View>
      <TouchableOpacity>
        <Avatar
          size={40}
          rounded
          containerStyle={[
            {
              backgroundColor: 'white',
              borderWidth: 3,
              marginHorizontal: 5,
              marginTop: 6,
              marginBottom: 2,
            },
            {
              borderColor: user.userVote == 1 ? '#FF5F5F' : '#49D3CA',
            },
          ]}
        />
      </TouchableOpacity>
      <Text style={{textAlign: 'center', fontSize: 10, fontWeight: 'bold'}}>
        {user.nickname}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
