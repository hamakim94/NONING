import UseAxios from './UseAxios.js';
import express from 'express';
// import { createServer } from "http";
import {Server} from 'socket.io';
import fs from 'fs';
import https from 'https';
import mediasoup from 'mediasoup';
import config from './config.js';

const app = express();
let domain = 'i7a202.p.ssafy.io';
// const sslport = process.env.PORT || 443;
let io;
let httpsServer;
//webRTC-mediasoup global variable
let worker;
let rooms = {};
let peers = {};
let producers = [];
let consumers = [];
let transports = [];
const mediaCodecs = config.mediasoup.router.mediaCodecs;

try {
  const option = {
    // ca: fs.readFileSync('/etc/letsencrypt/live/' + domain + '/fullchain.pem'),
    key: fs.readFileSync('/var/www/' + domain + '/noning/privkey.pem'),
    cert: fs.readFileSync('/var/www/' + domain + '/noning/cert.pem'),
  };

  httpsServer = https.createServer(option, app);

  io = new Server(httpsServer);
  httpsServer.listen(3000, () => {
    console.log('[HTTPS] server started (server listening on port : 3000)');
  });
} catch (error) {
  console.log('[HTTPS] server failed');
  console.log(error);
}
(async () => {
  console.log(1);
  worker = await mediasoup.createWorker({
    logLevel: config.mediasoup.worker.logLevel,
    logTags: config.mediasoup.worker.logTags,
    rtcMinPort: config.mediasoup.worker.rtcMinPort,
    rtcMaxPort: config.mediasoup.worker.rtcMaxPort,
  });
  console.log(2);
  console.log(worker);
  worker.on('died', () => {
    console.log(3);
    console.error(
      'mediasoup worker died, exiting in 2 seconds... [pid:%d]',
      worker.pid,
    );
    setTimeout(async () => {
      console.log('worker died');
      worker = await mediasoup.createWorker({
        logLevel: config.mediasoup.worker.logLevel,
        logTags: config.mediasoup.worker.logTags,
        rtcMinPort: config.mediasoup.worker.rtcMinPort,
        rtcMaxPort: config.mediasoup.worker.rtcMaxPort,
      });
      rooms = {};
      peers = {};
      producers = [];
      consumers = [];
      transports = [];
      io.emit('reconnect', {});
    }, 2000);
  });

  // const mediaCodecs = config.mediasoup.router.mediaCodecs;
  // mediasoupRouter = await worker.createRouter({mediaCodecs});
})();

// const http = createServer(app);
// const io = new Server(http);

// http.listen(3000, () => {
//   console.log('server listening on port : 3000');
// });

let userList = new Map();

io.on('connection', (socket) => {
  console.log('connected');

  // 채팅 대기방 입장
  socket.on('wait', (boardId) => {
    let userDataList =
      userList.get(boardId) == undefined
        ? null
        : Array.from(userList.get(boardId), (socket) => socket.userVoteData);
    socket.emit('wait', userDataList);
  });
  const removeItems = (items, socketId, type) => {
    items.forEach((item) => {
      if (item.socketId === socket.id) {
        item[type].close();
      }
    });
    items = items.filter((item) => item.socketId !== socket.id);

    return items;
  };
  socket.on('reenter', async (boardData, userData, done) => {
    if (socket.boardId) {
      const router1 = await createRoom(socket.boardId, socket.id);

      peers[socket.id] = {
        socket,
        roomName: socket.boardId, // Name for the Router this Peer joined
        transports: [],
        producers: [],
        consumers: [],
        peerDetails: {
          name: '',
          isAdmin: false, // Is this Peer the Admin?
        },
      };

      // get Router RTP Capabilities
      const rtpCapabilities = router1.rtpCapabilities;
      done({rtpCapabilities});
    }
  });
  // 실시간 음성채팅방 입장
  socket.on('enter', (boardData, userData, done) => {
    UseAxios.post('/chats/enter', null, {
      params: {
        boardId: boardData.boardId,
        vote: boardData.userVote,
      },
    })
      .then(async (res) => {
        socket.join(boardData.boardId); // 방 들어감

        const userVoteData = {
          userId: userData.userId,
          nickname: userData.nickname,
          img: userData.img,
          userVote: boardData.userVote,
        };

        socket.userVoteData = userVoteData;
        socket.boardId = boardData.boardId;

        if (userList.get(boardData.boardId) == undefined)
          userList.set(boardData.boardId, new Set());

        userList.get(boardData.boardId).add(socket); // back에서 가지고 있을 userList (나중에 새로 들어온 사용자한테 보여줘야함)
        // io.sockets.clients(boardData.boardId);
        let userDataList = Array.from(
          userList.get(boardData.boardId),
          (socket) => socket.userVoteData,
        );

        socket.emit('user_enter', userDataList); // 본인한테만 전달
        socket.to(boardData.boardId).emit('welcome', userVoteData); // 본인 외 다른 참가자한테 전달
        //router 생성
        const router1 = await createRoom(socket.boardId, socket.id);

        peers[socket.id] = {
          socket,
          roomName: socket.boardId, // Name for the Router this Peer joined
          transports: [],
          producers: [],
          consumers: [],
          peerDetails: {
            name: '',
            isAdmin: false, // Is this Peer the Admin?
          },
        };

        // get Router RTP Capabilities
        const rtpCapabilities = router1.rtpCapabilities;
        done({rtpCapabilities});
      })
      .catch((err) => {
        console.log('enter failed');
        done();
      });
  });

  socket.on('send', (msg) => {
    const userVoteData = socket.userVoteData;
    const reg = new Date().toLocaleTimeString('ko-KR', {
      timeZone: 'Asia/Seoul',
    });
    io.to(socket.boardId).emit('send', userVoteData, msg, reg);
  });

  socket.on('betray', (opt1Cnt, opt2Cnt) => {
    // 해당 user의 vote 변경
    const user = socket.userVoteData;
    if (user['userVote'] == 1) user['userVote'] = 2;
    else if (user['userVote'] == 2) user['userVote'] = 1;

    // 본인 포함 방 안의 모든 사람들에게 전달
    io.to(socket.boardId).emit('betray', user, opt1Cnt, opt2Cnt);
  });
  socket.on('mute', () => {
    socket.emit('mute', {});
  });
  socket.on('unmute', () => {
    socket.emit('unmute', {});
  });
  socket.on('disconnecting', () => {
    if (socket.boardId) {
      userList.get(socket.boardId).delete(socket);
      consumers = removeItems(consumers, socket.id, 'consumer');
      producers = removeItems(producers, socket.id, 'producer');
      transports = removeItems(transports, socket.id, 'transport');
      if (peers[socket.id]) {
        const roomName = peers[socket.id].roomName;
        delete peers[socket.id];
        if (roomName) {
          // remove socket from room
          rooms[roomName] = {
            router: rooms[roomName].router,
            peers: rooms[roomName].peers.filter(
              (socketId) => socketId !== socket.id,
            ),
          };
        }
      }
      if (userList.get(socket.boardId).size == 0) {
        UseAxios.post('/chats/delete', null, {
          params: {
            boardId: socket.boardId,
          },
        })
          .then((res) => {
            console.log('Delete Room Success');
            userList.delete(socket.boardId);
          })
          .catch((err) => {
            console.log('Delete Room Failed');
          });
      } else {
        UseAxios.post('/chats/leave', null, {
          params: {
            boardId: socket.boardId,
            vote: socket.userVoteData.userVote,
          },
        })
          .then((res) => {
            console.log('Leave Room Success');
            socket
              .to(socket.boardId)
              .emit(
                'left',
                socket.userVoteData,
                userList.get(socket.boardId).size,
              );
          })
          .catch((err) => {
            console.log('Leave Room Failed');
          });
      }
    }
  });
  //================================
  socket.on('createWebRtcTransport', async ({consumer}, callback) => {
    // get Room Name from Peer's properties
    const roomName = peers[socket.id].roomName;

    // get Router (Room) object this peer is in based on RoomName
    const router = rooms[roomName].router;

    createWebRtcTransport(router, socket).then(
      (transport) => {
        callback({
          params: {
            id: transport.id,
            iceParameters: transport.iceParameters,
            iceCandidates: transport.iceCandidates,
            dtlsParameters: transport.dtlsParameters,
          },
        });

        // add transport to Peer's properties
        addTransport(transport, roomName, consumer);
      },
      (error) => {
        console.log(error);
      },
    );
  });

  const addTransport = (transport, roomName, consumer) => {
    transports = [
      ...transports,
      {socketId: socket.id, transport, roomName, consumer},
    ];

    peers[socket.id] = {
      ...peers[socket.id],
      transports: [...peers[socket.id].transports, transport.id],
    };
  };

  const addProducer = (producer, roomName) => {
    producers = [...producers, {socketId: socket.id, producer, roomName}];

    peers[socket.id] = {
      ...peers[socket.id],
      producers: [...peers[socket.id].producers, producer.id],
    };
  };

  const addConsumer = (consumer, roomName) => {
    // add the consumer to the consumers list
    consumers = [...consumers, {socketId: socket.id, consumer, roomName}];

    // add the consumer id to the peers list
    peers[socket.id] = {
      ...peers[socket.id],
      consumers: [...peers[socket.id].consumers, consumer.id],
    };
  };
  //================================
  socket.on('getProducers', (callback) => {
    //return all producer transports
    const {roomName} = peers[socket.id];

    let producerList = [];
    producers.forEach((producerData) => {
      if (
        producerData.socketId !== socket.id &&
        producerData.roomName === roomName
      ) {
        producerList = [...producerList, producerData.producer.id];
      }
    });

    // return the producer list back to the client
    callback(producerList);
  });

  const informConsumers = (roomName, socketId, id) => {
    console.log(`just joined, id ${id} ${roomName}, ${socketId}`);
    // A new producer just joined
    // let all consumers to consume this producer
    producers.forEach((producerData) => {
      if (
        producerData.socketId !== socketId &&
        producerData.roomName === roomName
      ) {
        const producerSocket = peers[producerData.socketId].socket;
        // use socket to send producer id to producer
        producerSocket.emit('new-producer', {producerId: id});
      }
    });
  };

  const getTransport = (socketId) => {
    const [producerTransport] = transports.filter(
      (transport) => transport.socketId === socketId && !transport.consumer,
    );
    return producerTransport.transport;
  };

  // see client's socket.emit('transport-connect', ...)
  socket.on('transport-connect', ({dtlsParameters}) => {
    console.log('DTLS PARAMS... ', {dtlsParameters});

    getTransport(socket.id).connect({dtlsParameters});
  });

  // see client's socket.emit('transport-produce', ...)
  socket.on(
    'transport-produce',
    async ({kind, rtpParameters, appData}, callback) => {
      // call produce based on the prameters from the client
      const producer = await getTransport(socket.id).produce({
        kind,
        rtpParameters,
      });

      // add producer to the producers array
      const {roomName} = peers[socket.id];

      addProducer(producer, roomName);

      informConsumers(roomName, socket.id, producer.id);

      console.log('Producer ID: ', producer.id, producer.kind);

      producer.on('transportclose', () => {
        console.log('transport for this producer closed ');
        producer.close();
      });

      // Send back to the client the Producer's id
      callback({
        id: producer.id,
        producersExist: producers.length > 1 ? true : false,
      });
    },
  );

  // see client's socket.emit('transport-recv-connect', ...)
  socket.on(
    'transport-recv-connect',
    async ({dtlsParameters, serverConsumerTransportId}) => {
      console.log(`DTLS PARAMS: ${dtlsParameters}`);
      const tmpTransport = transports.find(
        (transportData) =>
          transportData.consumer &&
          transportData.transport.id == serverConsumerTransportId,
      );
      if (tmpTransport) {
        const consumerTransport = tmpTransport.transport;
        await consumerTransport.connect({dtlsParameters});
      }
    },
  );

  socket.on(
    'consume',
    async (
      {rtpCapabilities, remoteProducerId, serverConsumerTransportId},
      callback,
    ) => {
      try {
        const {roomName} = peers[socket.id];
        const router = rooms[roomName].router;
        let consumerTransport = transports.find(
          (transportData) =>
            transportData.consumer &&
            transportData.transport.id == serverConsumerTransportId,
        ).transport;

        // check if the router can consume the specified producer
        if (
          router.canConsume({
            producerId: remoteProducerId,
            rtpCapabilities,
          })
        ) {
          // transport can now consume and return a consumer
          const consumer = await consumerTransport.consume({
            producerId: remoteProducerId,
            rtpCapabilities,
            paused: true,
          });

          consumer.on('transportclose', () => {
            console.log('transport close from consumer');
          });

          consumer.on('producerclose', () => {
            console.log('producer of consumer closed');
            socket.emit('producer-closed', {remoteProducerId});

            consumerTransport.close([]);
            transports = transports.filter(
              (transportData) =>
                transportData.transport.id !== consumerTransport.id,
            );
            consumer.close();
            consumers = consumers.filter(
              (consumerData) => consumerData.consumer.id !== consumer.id,
            );
          });

          addConsumer(consumer, roomName);

          // from the consumer extract the following params
          // to send back to the Client
          const params = {
            id: consumer.id,
            producerId: remoteProducerId,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters,
            serverConsumerId: consumer.id,
          };

          // send the parameters to the client
          callback({params});
        }
      } catch (error) {
        console.log(error.message);
        callback({
          params: {
            error: error,
          },
        });
      }
    },
  );

  socket.on('consumer-resume', async ({serverConsumerId}) => {
    console.log('consumer resume');
    const tmpConsumerData = consumers.find(
      (consumerData) => consumerData.consumer.id === serverConsumerId,
    );
    if (tmpConsumerData) {
      const consumer = tmpConsumerData.consumer;
      await consumer.resume();
    }
  });
  //================================
  // socket.on('getRouterRtpCapabilities', (callback) => {
  //   callback(mediasoupRouter.rtpCapabilities);
  // });
  // socket.on('createProducerTransport', async (data, callback) => {
  //   try {
  //     const {transport, params} = await createWebRtcTransport();
  //     producerTransport = transport;
  //     callback(params);
  //   } catch (err) {
  //     console.error(err);
  //     callback({error: err.message});
  //   }
  // });

  // socket.on('createConsumerTransport', async (data, callback) => {
  //   try {
  //     const {transport, params} = await createWebRtcTransport();
  //     consumerTransport = transport;
  //     callback(params);
  //   } catch (err) {
  //     console.error(err);
  //     callback({error: err.message});
  //   }
  // });

  // socket.on('connectProducerTransport', async (data, callback) => {
  //   await producerTransport.connect({dtlsParameters: data.dtlsParameters});
  //   callback();
  // });

  // socket.on('connectConsumerTransport', async (data, callback) => {
  //   await consumerTransport.connect({dtlsParameters: data.dtlsParameters});
  //   callback();
  // });

  // socket.on('produce', async (data, callback) => {
  //   const {kind, rtpParameters} = data;
  //   producers = await producerTransport.produce({kind, rtpParameters});
  //   callback({id: producers.id});

  //   // inform clients about new producers
  //   socket.to(socket.boardId).emit('newProducer');
  // });

  // socket.on('consume', async (data, callback) => {
  //   callback(await createConsumer(producers, data.rtpCapabilities));
  // });
});

// async function createWebRtcTransport() {
//   const {maxIncomingBitrate, initialAvailableOutgoingBitrate} =
//     config.mediasoup.webRtcTransport;

//   const transport = await mediasoupRouter.createWebRtcTransport({
//     listenIps: config.mediasoup.webRtcTransport.listenIps,
//     enableUdp: true,
//     enableTcp: true,
//     preferUdp: true,
//     initialAvailableOutgoingBitrate,
//   });
//   if (maxIncomingBitrate) {
//     try {
//       await transport.setMaxIncomingBitrate(maxIncomingBitrate);
//     } catch (error) {}
//   }
//   return {
//     transport,
//     params: {
//       id: transport.id,
//       iceParameters: transport.iceParameters,
//       iceCandidates: transport.iceCandidates,
//       dtlsParameters: transport.dtlsParameters,
//     },
//   };
// }
// async function createConsumer(producers, rtpCapabilities) {
//   if (
//     !mediasoupRouter.canConsume({
//       producerId: producers.id,
//       rtpCapabilities,
//     })
//   ) {
//     console.error('can not consume');
//     return;
//   }
//   try {
//     consumers = await consumerTransport.consume({
//       producerId: producers.id,
//       rtpCapabilities,
//       paused: producers.kind === 'video',
//     });
//   } catch (error) {
//     console.error('consume failed', error);
//     return;
//   }

//   if (consumers.type === 'simulcast') {
//     await consumers.setPreferredLayers({spatialLayer: 2, temporalLayer: 2});
//   }

//   return {
//     producerId: producers.id,
//     id: consumers.id,
//     kind: consumers.kind,
//     rtpParameters: consumers.rtpParameters,
//     type: consumers.type,
//     producerPaused: consumers.producerPaused,
//   };
// }
const createWebRtcTransport = async (router, socket) => {
  return new Promise(async (resolve, reject) => {
    try {
      // https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportOptions
      const webRtcTransport_options = {
        listenIps: config.mediasoup.webRtcTransport.listenIps,
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
      };

      // https://mediasoup.org/documentation/v3/mediasoup/api/#router-createWebRtcTransport
      let transport = await router.createWebRtcTransport(
        webRtcTransport_options,
      );
      console.log(`transport id: ${transport.id}`);

      transport.on('dtlsstatechange', (dtlsState) => {
        if (dtlsState === 'closed') {
          transport.close();
        }
      });

      transport.on('close', () => {
        console.log('transport closed');
      });

      resolve(transport);
    } catch (error) {
      //모두 제거하면 안됨
      rooms = {};
      peers = {};
      producers = [];
      consumers = [];
      transports = [];
      socket.to(socket.boardId).broadcast('reconnect', {});
      reject(error);
    }
  });
};
const createRoom = async (roomName, socketId) => {
  // worker.createRouter(options)
  // options = { mediaCodecs, appData }
  // mediaCodecs -> defined above
  // appData -> custom application data - we are not supplying any
  // none of the two are required
  let router1;
  let peers = [];
  if (rooms[roomName]) {
    router1 = rooms[roomName].router;
    peers = rooms[roomName].peers || [];
  } else {
    router1 = await worker.createRouter({mediaCodecs});
  }

  console.log(`Router ID: ${router1.id}`, peers.length);

  rooms[roomName] = {
    router: router1,
    peers: [...peers, socketId],
  };

  return router1;
};
