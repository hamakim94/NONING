import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from '@rneui/themed';
import React from 'react';

function ChatHeaderUser({user}) {
  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <TouchableOpacity>
        <Avatar
          size={40}
          rounded
          containerStyle={[
            {
              backgroundColor: '#FFFFFF',
              borderWidth: 2.5,
              marginHorizontal: 5,
              marginBottom: 2,
            },
            {
              borderColor: user.userVote == 1 ? '#FF5F5F' : '#49D3CA',
            },
          ]}
          source={{uri: user.img}}
        />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 10,
          fontWeight: 'bold',
          marginTop: 1,
        }}>
        {user.nickname}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ChatHeaderUser;
