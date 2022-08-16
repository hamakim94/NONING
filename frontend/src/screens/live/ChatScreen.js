import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from 'react';
import ChatHeaderUser from '../../components/live/chat/ChatHeaderUser';
import ChatBar from '../../components/live/chat/ChatBar';
import ChatHeader from '../../components/live/chat/ChatHeader';
import ChatContent from '../../components/live/chat/ChatContent';
import UserContext from '../../util/UserContext';
import {useIsFocused} from '@react-navigation/native';

const users = [];
const messages = [];

const io = require('socket.io/client-dist/socket.io');
let socket;

export default function ChatScreen({route, navigation}) {
  const [userList, setUserList] = useState(users);
  const [boardData, setBoardData] = useState(route.params.data);
  const [messageList, setMessageList] = useState(messages);
  const [waitButton, setWaitButton] = useState(false);
  const [msg, setMsg] = useState();
  const {userData} = useContext(UserContext);
  const chatRef = useRef(null);
  const scrollRef = useRef(null);
  const isFocused = useIsFocused();
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    if (isFocused) {
      // socket = io(`http://10.0.2.2:3000`, {
      socket = io(`https://i7a202.p.ssafy.io:3000`, {
        transports: ['websocket'], // you need to explicitly tell it to use websockets
      });

      socket.on('connect', () => {
        // console.log(userData.nickname + ' connect');
        socket.emit('enter', boardData, userData, () => {
          socket.disconnect();
          navigation.goBack();
        });
      });

      socket.on('welcome', (userVoteData) => {
        // user update
        // front단의 userlist update
        // 상단 userlist
        setUserList((userList) => [...userList, userVoteData]);

        // 입장 메세지 보냄
        const msgData = {
          msgId: chatRef.current,
          msg: userVoteData.nickname + ' 님이 입장하셨습니다. ',
          betray: false,
        };
        setMessageList((messageList) => [...messageList, msgData]);
      });

      socket.on('user_enter', (initUsers) => {
        // 본인한테만
        setUserList(initUsers);

        // 입장 메세지 보냄
        const msgData = {
          msgId: chatRef.current,
          msg: userData.nickname + ' 님이 입장하셨습니다. ',
          betray: false,
        };
        setMessageList((messageList) => [...messageList, msgData]);
      });

      socket.on('send', (userVoteData, msg, reg) => {
        const msgData = {
          nickname: userVoteData.nickname,
          userVote: userVoteData.userVote,
          msgId: chatRef.current,
          img: userVoteData.img,
          msg: msg,
          reg: reg,
        };
        setMessageList((messageList) => [...messageList, msgData]);
      });

      socket.on('betray', (userVoteData, opt1Cnt, opt2Cnt) => {
        // 배신 후 opt1, opt2 수 업데이트
        setBoardData((boardData) => ({
          ...boardData,
          opt1Selected: opt1Cnt,
          opt2Selected: opt2Cnt,
        }));

        // 해당 user의 vote 변경
        setUserList((userList) => {
          const index = userList.findIndex(
            (user) => user.userId == userVoteData.userId,
          );
          userList[index].userVote = userVoteData.userVote;
          return [...userList];
        });

        // 배신 메세지 전달
        const msgData = {
          msgId: chatRef.current,
          msg: userVoteData.nickname + ' 님이 배신하셨습니다.',
          betray: true,
          userVote: userVoteData.userVote,
        };

        setMessageList((messageList) => [...messageList, msgData]);
      });

      socket.on('connect_error', (err) => {
        // console.log(err.message);
      });

      socket.on('left', (userVoteData) => {
        const msgData = {
          msgId: chatRef.current,
          msg: userVoteData.nickname + ' 님이 퇴장하셨습니다. ',
          betray: false,
        };
        setMessageList((messageList) => [...messageList, msgData]);
        setUserList((userList) => {
          const index = userList.findIndex(
            (user) => user.userId == userVoteData.userId,
          );
          userList.splice(index, 1);
          return [...userList];
        });
      });
    }

    return () => {
      // console.log('end');
      if (socket) socket.disconnect();
    };
  }, [isFocused]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setOnFocus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setOnFocus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  useEffect(() => {
    chatRef.current =
      messageList.length !== 0
        ? messageList[messageList.length - 1].msgId + 1
        : 1;
  }, [messageList]);

  const userRender = ({item}) => <ChatHeaderUser user={item}></ChatHeaderUser>;

  const userMemoized = useMemo(() => userRender, [userList]);

  const userKey = useCallback((item) => item.userId, []);

  const msgRender = ({item}) => <ChatContent data={item} userList={userList} />;

  const msgMemoized = useMemo(() => msgRender, [messageList]);

  const msgKey = useCallback((item) => item.msgId, []);

  const onChange = (e) => {
    setMsg(e);
  };

  const onSubmit = () => {
    socket.emit('send', msg);
    setMsg('');
    Keyboard.dismiss();
  };

  const betray = () => {
    // 쿨타임 먼저 줘버리기
    setWaitButton(true);
    // 먼저 http 통신 관련 처리
    UseAxios.put(`/chats/${boardData.boardId}/betray`, {
      userId: userData.userId,
      vote: boardData.userVote == 1 ? 2 : 1,
    })
      .then((res) => {
        socket.emit('betray', res.data.opt1, res.data.opt2);

        // 본인 정보 바꾸기
        setBoardData((boardData) => ({
          ...boardData,
          userVote: boardData.userVote == 1 ? 2 : 1,
        }));
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1}}>
        <View style={{flex: 0.4}}>
          <ChatHeader
            title={boardData.title}
            userCnt={userList ? userList.length : 0}
            navigation={navigation}
          />
        </View>
        <View
          style={{
            flex: 0.8,
            borderBottomWidth: 1,
            borderBottomColor: '#A6A6A6',
            paddingHorizontal: '5%',
            paddingBottom: '1%',
            minHeight: 50,
            maxHeight: 70,
          }}>
          <FlatList
            horizontal={true}
            data={userList}
            renderItem={userMemoized}
            keyExtractor={userKey}></FlatList>
        </View>
        <View
          style={{
            flex: 0.9,
            marginVertical: '2.5%',
            minHeight: 60,
            maxHeight: 100,
          }}>
          <ChatBar
            betray={betray}
            boardData={boardData}
            waitButton={waitButton}
            setWaitButton={setWaitButton}
          />
        </View>
        <View
          style={{
            flex: onFocus ? 1.5 : 3.9,
            paddingHorizontal: '5%',
          }}>
          <FlatList
            ref={scrollRef}
            onContentSizeChange={() => {
              scrollRef.current.scrollToEnd();
            }}
            data={messageList}
            renderItem={msgMemoized}
            keyExtractor={msgKey}></FlatList>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          maxHeight: 40,
          borderTopWidth: 0.5,
          borderColor: '#A6A6A6',
          paddingHorizontal: 9,
        }}>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center'}}>버튼</Text>
        </View>
        <View
          style={{
            flex: 4.5,
            justifyContent: 'center',
          }}>
          <TextInput
            onChangeText={(e) => onChange(e)}
            style={{paddingVertical: 5}}
            value={msg}
            onSubmitEditing={onSubmit}
            selectionColor={'#FF5F5F'}
            placeholder={'채팅을 입력해주세요.'}></TextInput>
        </View>
        <View
          style={{
            flex: 0.8,
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={onSubmit}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FF5F5F',
              }}>
              전송
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
