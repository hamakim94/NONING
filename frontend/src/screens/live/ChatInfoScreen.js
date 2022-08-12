import {StyleSheet, View, TouchableOpacity, Text, FlatList} from 'react-native';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import UseAxios from '../../util/UseAxios';
import {useIsFocused} from '@react-navigation/native';
import ChatInfoUser from '../../components/live/chatInfo/ChatInfoUser';
import ChatInfoBar from '../../components/live/chatInfo/ChatInfoBar';
import Feather from 'react-native-vector-icons/Feather';

const io = require('socket.io/client-dist/socket.io');
let socket;

export default function ChatInfoScreen({navigation, route}) {
  const isFocused = useIsFocused();
  const [userList, setUserList] = useState();
  const [boardData, setBoardData] = useState({});
  const boardId = route.params.id;
  console.log(userList);
  useEffect(() => {
    if (isFocused) {
      // socket = io(`http://10.0.2.2:3000`, {
      socket = io(`http://i7a202.p.ssafy.io:3000`, {
        transports: ['websocket'], // you need to explicitly tell it to use websockets
      });

      socket.on('connect', () => {
        socket.emit('wait', boardId);
      });

      socket.on('wait', (chatUserData) => {
        setUserList(chatUserData);
      });

      UseAxios.get(`/boards/${boardId}`).then((res) => {
        setBoardData(res.data);
      });
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [isFocused]);

  const userRender = ({item}) => <ChatInfoUser user={item}></ChatInfoUser>;

  const userMemoized = useMemo(() => userRender, [userList]);

  const userKey = useCallback((item) => item.userId, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{marginTop: 15, marginLeft: 10}}
        onPress={() => navigation.pop()}>
        <Feather name="chevron-left" size={30} color="#000000" />
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <View style={styles.topInnerContainer}>
            <ChatInfoBar
              boardData={boardData}
              navigation={navigation}></ChatInfoBar>
          </View>
          <View style={styles.botInnerContainer}>
            {userList ? (
              <>
                <Text style={{color: '#000000', fontWeight: 'bold'}}>
                  ({userList.length})
                </Text>
                <Text style={{color: '#49D3CA', fontWeight: 'bold'}}>
                  {userList.filter((e) => e.userVote === 2).length}{' '}
                </Text>
                <Text style={{color: '#000000', fontWeight: 'bold'}}>vs </Text>
                <Text style={{color: '#FF5F5F', fontWeight: 'bold'}}>
                  {userList.filter((e) => e.userVote === 1).length}{' '}
                </Text>
              </>
            ) : (
              ''
            )}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            data={userList}
            renderItem={userMemoized}
            keyExtractor={userKey}></FlatList>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
    padding: 16,
  },
  topContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
    marginBottom: 10,
  },
  bottomContainer: {
    flex: 1,
  },
  topInnerContainer: {
    flex: 4.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botInnerContainer: {
    flex: 0.5,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
});
