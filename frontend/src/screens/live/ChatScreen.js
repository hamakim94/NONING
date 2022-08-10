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
// import socketIO from 'socket.io-client';

// const user = [
//   {userId: 1, nickname: '김토마', userVote: 1},
//   {userId: 2, nickname: '토마토', userVote: 2},
//   {userId: 3, nickname: '박토토', userVote: 1},
//   {userId: 4, nickname: '박토마', userVote: 1},
//   {userId: 5, nickname: '적토마', userVote: 1},
//   {userId: 6, nickname: '맛토맛', userVote: 2},
//   {userId: 7, nickname: '심깻잎', userVote: 2},
//   {userId: 8, nickname: 'test08', userVote: 2},
// ];
const users = [];
const messages = [];
//   {
//     msgId: 1,
//     msg: '아무리 그래도 토맛을 먹는건 좀...',
//     nickname: '김토마',
//     userVote: 1,
//     reg: '오후 10:49',
//   },
//   {
//     msgId: 2,
//     msg: '그럴거면 토마토맛토를 먹지',
//     nickname: '적토마',
//     userVote: 1,
//     reg: '오후 10:49',
//   },
//   {
//     msgId: 3,
//     msg: '아무리 그래도 토를 먹는건 좀...',
//     nickname: '토마토',
//     userVote: 2,
//     reg: '오후 10:49',
//   },
//   {
//     msgId: 4,
//     msg: '토 먹으면서 맛있는 척 가능?',
//     nickname: '맛토맛',
//     userVote: 2,
//     reg: '오후 10:49',
//   },
//   {msgId: 5, msg: '김토마님이 배신하였습니다.', betray: true},
//   {
//     msgId: 6,
//     msg: '누가 배신했냐?',
//     nickname: '김토마',
//     userVote: 1,
//     reg: '오후 10:49',
//   },
//   {msgId: 7, msg: '적토마님이 입장하였습니다.', betray: false},
// ];

const io = require('socket.io/client-dist/socket.io');
let socket;

export default function ChatScreen({route, navigation}) {
  const [userList, setUserList] = useState([]);
  const [boardData, setboardData] = useState(route.params.data);
  const [messageList, setMessageList] = useState(messages);
  const [msg, setMsg] = useState();
  const {userData} = useContext(UserContext);
  const chatRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // socket = io(`http://10.0.2.2:3000`, {
      socket = io(`http://i7a202.p.ssafy.io:3000`, {
        transports: ['websocket'], // you need to explicitly tell it to use websockets
      });

      socket.on('connect', () => {
        console.log(userData.nickname + ' connect');
        socket.emit('enter', boardData, userData, () => {
          socket.disconnect();
          navigation.goBack();
        });
      });

      socket.on('welcome', (userVoteData) => {
        // 입장 메세지 보냄
        const msgData = {
          msgId: chatRef.current,
          msg: userVoteData.nickname + ' 님이 입장하셨습니다. ',
          betray: false,
        };
        setMessageList((messageList) => [...messageList, msgData]);

        // user update
        // front단의 userlist update
        // 상단 userlist
        // users.push(userVoteData);
        setUserList((userList) => [...userList, userVoteData]);

        // 인원수 최신화 (userCnt로 update)
      });

      socket.on('user_enter', (initUsers) => {
        // 본인 정보
        // myData = userVoteData;

        // 본인한테만
        setUserList(initUsers);
      });

      socket.on('send', (userVoteData, msg) => {
        const msgData = {
          nickname: userVoteData.nickname,
          userVote: userVoteData.userVote,
          msgId: chatRef.current,
          msg: msg,
        };
        setMessageList((messageList) => [...messageList, msgData]);
      });

      socket.on('betray', (userVoteData, opt1Cnt, opt2Cnt) => {
        // opt1, opt2 수 변경
        setBoard({
          ...board,
          opt1Selected: opt1Cnt,
          opt2Selected: opt2Cnt,
        });
        // 해당 user의 vote 변경
        boardData['userVote'] = userVoteData.userVote;
        // 배신 메세지 전달
        const msgData = {
          msgId: chatRef.current,
          msg: userVoteData.nickname + ' 님이 배신하셨습니다.',
          betray: true,
        };
        setMessageList((messageList) => [...messageList, msgData]);
      });

      // socket.on('connect_error', (err) => {
      //   console.log(err.message);
      // });

      socket.on('left', (userVoteData, userCnt) => {
        const msgData = {
          msgId: chatRef.current,
          msg: userVoteData.nickname + ' 님이 퇴장하셨습니다. ',
          betray: false,
        };
        setMessageList((messageList) => [...messageList, msgData]);
      });
    }

    return () => {
      console.log('end');
      if (socket) socket.disconnect();
    };
  }, [isFocused]);

  useEffect(() => {
    setUserList(users);
    setMessageList(messages);
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

  const msgRender = ({item}) => <ChatContent data={item} />;

  const msgMemoized = useMemo(() => msgRender, [messageList]);

  const msgKey = useCallback((item) => item.msgId, []);

  const onChange = (e) => {
    setMsg(e);
  };

  const onSubmit = () => {
    socket.emit('send', msg);
    const msgData = {
      nickname: userData.nickname,
      userVote: boardData.userVote,
      msgId: chatRef.current,
      msg: msg,
    };
    setMessageList([...messageList, msgData]);
    setMsg('');
    Keyboard.dismiss();
  };

  const betray = () => {
    // 먼저 http 통신 관련 처리
    UseAxios.put(`/chats/${board.boardId}/betray`, {
      userId: myData.userId,
      vote: myData.userVote == 1 ? 2 : 1,
    })
      .then((res) => {
        // 성공하면 실행
        socket.emit(
          'betray',
          boardData.boardId,
          myData,
          res.data.opt1,
          rea.data.opt2,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1}}>
        <View style={{flex: 0.4}}>
          <ChatHeader title={boardData.title} userCnt={userList.length} />
        </View>
        <View
          style={{
            // flex: 0.6,
            flex: 0.7,
            borderBottomWidth: 1,
            paddingHorizontal: '5%',
          }}>
          <FlatList
            horizontal={true}
            data={userList}
            renderItem={userMemoized}
            keyExtractor={userKey}></FlatList>
        </View>
        <View style={{flex: 0.8}}>
          <ChatBar />
        </View>
        <View style={{flex: 4.2, paddingHorizontal: '5%'}}>
          <FlatList
            data={messageList}
            renderItem={msgMemoized}
            keyExtractor={msgKey}></FlatList>
        </View>
      </View>
      <View style={{borderWidth: 1, flexDirection: 'row'}}>
        <View style={{flex: 0.7, justifyContent: 'center', borderWidth: 1}}>
          <Text style={{textAlign: 'center'}}>버튼</Text>
        </View>
        <View style={{flex: 4.5}}>
          <TextInput
            onChangeText={(e) => onChange(e)}
            value={msg}
            onSubmitEditing={onSubmit}></TextInput>
        </View>
        <View style={{flex: 0.8, justifyContent: 'center', borderWidth: 1}}>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={{textAlign: 'center'}}>전송</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
