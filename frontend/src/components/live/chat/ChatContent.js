import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from '@rneui/themed';
import React from 'react';

function ChatContent({data, userList}) {
  return data.betray == null ? (
    <View
      style={{
        flex: 1,
        flexDirection: data.userVote == 1 ? 'row' : 'row-reverse',
        marginBottom: '5%',
      }}>
      <View
        style={{
          flex: 0.9,
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginHorizontal: 5,
        }}>
        <TouchableOpacity>
          <Avatar
            size={45}
            rounded
            containerStyle={[
              {
                borderWidth: 2.5,
                backgroundColor: '#FFFFFF',
                marginTop: '1%',
              },
              {
                borderColor: data.userVote == 1 ? '#FF5F5F' : '#49D3CA',
              },
            ]}
            source={{
              uri: userList.find((e) => e.nickname == data.nickname).img,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 4.2}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#000000',
            textAlign: data.userVote == 1 ? 'left' : 'right',
            paddingHorizontal: '1%',
            fontSize: 14,
          }}>
          {data.nickname}
        </Text>
        <Text
          style={{
            color: '#000000',
            textAlign: data.userVote == 1 ? 'left' : 'right',
            backgroundColor: '#EAEAEA',
            borderRadius: 7,
            paddingHorizontal: '4%',
            paddingVertical: '1%',
            fontSize: 14,
          }}>
          {data.msg}
        </Text>
      </View>
      <View style={{flex: 0.9, justifyContent: 'flex-end'}}>
        <Text
          style={{
            color: '#808080',
            textAlign: data.userVote == 1 ? 'left' : 'right',
            fontSize: 9,
            marginHorizontal: '6%',
          }}>
          {data.reg.slice(0, data.reg.length - 3)}
        </Text>
      </View>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '5%',
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          color: data.betray
            ? data.userVote == 1
              ? '#49D3CA'
              : '#FF5F5F'
            : '#000000',
        }}>
        {data.msg}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default React.memo(ChatContent);
