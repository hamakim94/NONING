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
import {registerGlobals} from 'react-native-webrtc';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const mediasoupClient = require('mediasoup-client');

const users = [];
const messages = [];
const io = require('socket.io/client-dist/socket.io');
let socket;
// webRTC.registerGlobals();
registerGlobals();

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
  const isMute = useRef(true);
  const [onFocus, setOnFocus] = useState(false);
  const [muteBtn, setMuteBtn] = useState(true);
  let device;
  let rtpCapabilities;
  let producerTransport;
  let consumerTransports = [];
  let audioProducer;
  let audioParams;
  let consumingTransports = [];

  useEffect(() => {
    if (isFocused) {
      // socket = io(`http://10.0.2.2:3000`, {
      socket = io(`https://i7a202.p.ssafy.io:3000`, {
        transports: ['websocket'], // you need to explicitly tell it to use websockets
      });

      socket.on('connect', async () => {
        // console.log(userData.nickname + ' connect');
        getLocalStream();
        socket.emit('enter', boardData, userData, (data) => {
          if (data) {
            rtpCapabilities = data.rtpCapabilities;
            createDevice();
          } else {
            socket.disconnect();
            navigation.goBack();
          }
        });

        // const data = await new Promise((resolve) =>
        //   socket.emit('getRouterRtpCapabilities', resolve),
        // );
        // await loadDevice(data);
        // await publish();
        // await subscribe();
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

      // WebRTC - mediasoup
      socket.on('unmute', () => {
        // console.log('unmute');
        audioParams.track.enabled = true;
        setMuteBtn(false);
      });
      socket.on('mute', () => {
        // console.log('mute');
        audioParams.track.enabled = false;
        setMuteBtn(true);
      });

      const streamSuccess = (stream) => {
        audioParams = {track: stream.getAudioTracks()[0], ...audioParams};
        audioParams.track.enabled = false;
      };

      const getLocalStream = () => {
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
          })
          .then(streamSuccess)
          .catch((error) => {
            // console.log(error.message);
          });
      };

      // A device is an endpoint connecting to a Router on the
      // server side to send/recive media
      const createDevice = async () => {
        try {
          device = new mediasoupClient.Device();

          // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
          // Loads the device with RTP capabilities of the Router (server side)
          await device.load({
            // see getRtpCapabilities() below
            routerRtpCapabilities: rtpCapabilities,
          });

          // console.log('Device RTP Capabilities', device.rtpCapabilities);

          // once the device loads, create transport
          createSendTransport();
        } catch (error) {
          // console.log(error);
          if (error.name === 'UnsupportedError')
            console.warn('browser not supported');
        }
      };

      const createSendTransport = () => {
        // see server's socket.on('createWebRtcTransport', sender?, ...)
        // this is a call from Producer, so sender = true
        socket.emit('createWebRtcTransport', {consumer: false}, ({params}) => {
          // The server sends back params needed
          // to create Send Transport on the client side
          if (params.error) {
            // console.log(params.error);
            return;
          }

          // console.log(params);

          // creates a new WebRTC Transport to send media
          // based on the server's producer transport params
          // https://mediasoup.org/documentation/v3/mediasoup-client/api/#TransportOptions
          producerTransport = device.createSendTransport(params);

          // https://mediasoup.org/documentation/v3/communication-between-client-and-server/#producing-media
          // this event is raised when a first call to transport.produce() is made
          // see connectSendTransport() below
          producerTransport.on(
            'connect',
            async ({dtlsParameters}, callback, errback) => {
              try {
                // Signal local DTLS parameters to the server side transport
                // see server's socket.on('transport-connect', ...)
                await socket.emit('transport-connect', {
                  dtlsParameters,
                });

                // Tell the transport that parameters were transmitted.
                callback();
              } catch (error) {
                errback(error);
              }
            },
          );

          producerTransport.on(
            'produce',
            async (parameters, callback, errback) => {
              // console.log(parameters);
              // console.log(8);
              try {
                // tell the server to create a Producer
                // with the following parameters and produce
                // and expect back a server side producer id
                // see server's socket.on('transport-produce', ...)
                await socket.emit(
                  'transport-produce',
                  {
                    kind: parameters.kind,
                    rtpParameters: parameters.rtpParameters,
                    appData: parameters.appData,
                  },
                  ({id, producersExist}) => {
                    // Tell the transport that parameters were transmitted and provide it with the
                    // server side producer's id.
                    callback({id});

                    // if producers exist, then join room
                    if (producersExist) getProducers();
                  },
                );
              } catch (error) {
                errback(error);
              }
            },
          );

          connectSendTransport();
        });
      };

      const connectSendTransport = async () => {
        // we now call produce() to instruct the producer transport
        // to send media to the Router
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
        // this action will trigger the 'connect' and 'produce' events above
        // console.log(9);
        audioProducer = await producerTransport.produce(audioParams);
        // console.log(7);
        audioProducer.on('trackended', () => {
          // console.log('audio track ended');
          // close audio track
        });

        audioProducer.on('transportclose', () => {
          // console.log('audio transport ended');
          // close audio track
        });
      };

      const signalNewConsumerTransport = async (remoteProducerId) => {
        //check if we are already consuming the remoteProducerId
        if (consumingTransports.includes(remoteProducerId)) return;
        consumingTransports.push(remoteProducerId);

        await socket.emit(
          'createWebRtcTransport',
          {consumer: true},
          ({params}) => {
            // The server sends back params needed
            // to create Send Transport on the client side
            if (params.error) {
              // console.log(params.error);
              return;
            }
            // console.log(`PARAMS... ${params}`);

            let consumerTransport;
            try {
              consumerTransport = device.createRecvTransport(params);
            } catch (error) {
              // exceptions:
              // {InvalidStateError} if not loaded
              // {TypeError} if wrong arguments.
              // console.log(error);
              return;
            }

            consumerTransport.on(
              'connect',
              async ({dtlsParameters}, callback, errback) => {
                try {
                  // Signal local DTLS parameters to the server side transport
                  // see server's socket.on('transport-recv-connect', ...)
                  await socket.emit('transport-recv-connect', {
                    dtlsParameters,
                    serverConsumerTransportId: params.id,
                  });

                  // Tell the transport that parameters were transmitted.
                  callback();
                } catch (error) {
                  // Tell the transport that something was wrong
                  errback(error);
                }
              },
            );

            connectRecvTransport(
              consumerTransport,
              remoteProducerId,
              params.id,
            );
          },
        );
      };

      // server informs the client of a new producer just joined
      socket.on('new-producer', ({producerId}) =>
        signalNewConsumerTransport(producerId),
      );

      const getProducers = () => {
        socket.emit('getProducers', (producerIds) => {
          // console.log(producerIds);
          // for each of the producer create a consumer
          // producerIds.forEach(id => signalNewConsumerTransport(id))
          producerIds.forEach(signalNewConsumerTransport);
        });
      };

      const connectRecvTransport = async (
        consumerTransport,
        remoteProducerId,
        serverConsumerTransportId,
      ) => {
        // for consumer, we need to tell the server first
        // to create a consumer based on the rtpCapabilities and consume
        // if the router can consume, it will send back a set of params as below
        await socket.emit(
          'consume',
          {
            rtpCapabilities: device.rtpCapabilities,
            remoteProducerId,
            serverConsumerTransportId,
          },
          async ({params}) => {
            if (params.error) {
              // console.log('Cannot Consume');
              return;
            }

            // console.log(`Consumer Params ${params}`);
            // then consume with the local consumer transport
            // which creates a consumer
            const consumer = await consumerTransport.consume({
              id: params.id,
              producerId: params.producerId,
              kind: params.kind,
              rtpParameters: params.rtpParameters,
            });

            consumerTransports = [
              ...consumerTransports,
              {
                consumerTransport,
                serverConsumerTransportId: params.id,
                producerId: remoteProducerId,
                consumer,
              },
            ];

            socket.emit('consumer-resume', {
              serverConsumerId: params.serverConsumerId,
            });
          },
        );
      };

      socket.on('producer-closed', ({remoteProducerId}) => {
        // server notification is received when a producer is closed
        // we need to close the client-side consumer and associated transport
        const producerToClose = consumerTransports.find(
          (transportData) => transportData.producerId === remoteProducerId,
        );
        producerToClose.consumerTransport.close();
        producerToClose.consumer.close();

        // remove the consumer transport from the list
        consumerTransports = consumerTransports.filter(
          (transportData) => transportData.producerId !== remoteProducerId,
        );
      });
      // async function loadDevice(routerRtpCapabilities) {
      //   try {
      //     device = new mediasoup.Device();
      //   } catch (error) {
      //     if (error.name === 'UnsupportedError') {
      //       console.error('brower not supported');
      //     }
      //   }
      //   console.log(routerRtpCapabilities);
      //   await device.load({routerRtpCapabilities: routerRtpCapabilities});
      // }
      // async function publish() {
      //   const data = await new Promise((resolve) =>
      //     socket.emit(
      //       'createProducerTransport',
      //       {
      //         forceTcp: false,
      //         rtpCapabilities: device.rtpCapabilities,
      //       },
      //       resolve,
      //     ),
      //   );
      //   console.log(data);
      //   if (data.error) {
      //     console.error(data.error);
      //     return;
      //   }
      //   const transport = device.createSendTransport(data);
      //   transport.on('connect', async ({dtlsParameters}, callback, errback) => {
      //     new Promise((resolve) =>
      //       socket.emit('connectProducerTransport', {dtlsParameters}, resolve),
      //     )
      //       .then(callback)
      //       .catch(errback);
      //   });
      //   transport.on(
      //     'produce',
      //     async ({kind, rtpParameters}, callback, errback) => {
      //       try {
      //         const {id} = await new Promise((resolve) =>
      //           socket.emit(
      //             'produce',
      //             {
      //               transportId: transport.id,
      //               kind,
      //               rtpParameters,
      //             },
      //             resolve,
      //           ),
      //         );
      //         callback({id});
      //       } catch (err) {
      //         errback(err);
      //       }
      //     },
      //   );

      //   let stream;
      //   try {
      //     stream = await getUserMedia(transport);

      //     const track = stream.getAudioTracks()[0];
      //     const params = {track};
      //     producer = await transport.produce(params);
      //   } catch (err) {
      //     console.error(err);
      //   }
      // }
    }

    // async function getUserMedia(transport) {
    //   if (!device.canProduce('video')) {
    //     console.error('cannot produce video');
    //     return;
    //   }

    //   let stream;
    //   try {
    //     stream = await navigator.mediaDevices.getUserMedia({audio: true});
    //   } catch (err) {
    //     console.error('getUserMedia() failed:', err.message);
    //     throw err;
    //   }
    //   return stream;
    // }
    // async function subscribe() {
    //   const data = await new Promise((resolve) =>
    //     socket.emit(
    //       'createConsumerTransport',
    //       {
    //         forceTcp: false,
    //       },
    //       resolve,
    //     ),
    //   );
    //   if (data.error) {
    //     console.error(data.error);
    //     return;
    //   }

    //   const transport = device.createRecvTransport(data);
    //   transport.on('connect', ({dtlsParameters}, callback, errback) => {
    //     new Promise((resolve) =>
    //       socket.emit(
    //         'connectConsumerTransport',
    //         {
    //           transportId: transport.id,
    //           dtlsParameters,
    //         },
    //         resolve,
    //       ),
    //     )
    //       .then(callback)
    //       .catch(errback);
    //   });

    //   const stream = consume(transport);
    // }

    // async function consume(transport) {
    //   const {rtpCapabilities} = device;
    //   const data = await new Promise((resolve) =>
    //     socket.emit('consume', {rtpCapabilities}, resolve),
    //   );

    //   const {producerId, id, kind, rtpParameters} = data;

    //   let codecOptions = {};
    //   const consumer = await transport.consume({
    //     id,
    //     producerId,
    //     kind,
    //     rtpParameters,
    //     codecOptions,
    //   });
    //   const stream = new MediaStream();
    //   stream.addTrack(consumer.track);
    //   return stream;
    // }

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
  let mute = () => {
    if (!isMute.current) {
      isMute.current = true;
      socket.emit('mute', {});
    } else {
      isMute.current = false;
      socket.emit('unmute', {});
    }
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
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={mute}>
            {muteBtn ? (
              <FontAwesome
                style={{color: '#FF5F5F', paddingRight: 3}}
                name="microphone-slash"
                size={18}></FontAwesome>
            ) : (
              <FontAwesome
                style={{color: '#49D3CA', paddingRight: 3}}
                name="microphone"
                size={18}></FontAwesome>
            )}
          </TouchableOpacity>
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
