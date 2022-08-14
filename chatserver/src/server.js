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
let producer;
let consumer;
let producerTransport;
let consumerTransport;
let mediasoupRouter;

try {
  const option = {
    // ca: fs.readFileSync('/etc/letsencrypt/live/' + domain + '/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/' + domain + '/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/' + domain + '/cert.pem'),
  };

  httpsServer = https.createServer(option, app);

  io = new Server(httpsServer);
  httpsServer.listen(3001, () => {
    console.log('[HTTPS] server started (server listening on port : 3000)');
  });
} catch (error) {
  console.log('[HTTPS] server failed');
  console.log(error);
}
(async () => {
  worker = await mediasoup.createWorker({
    logLevel: config.mediasoup.worker.logLevel,
    logTags: config.mediasoup.worker.logTags,
    rtcMinPort: config.mediasoup.worker.rtcMinPort,
    rtcMaxPort: config.mediasoup.worker.rtcMaxPort,
  });

  worker.on('died', () => {
    console.error(
      'mediasoup worker died, exiting in 2 seconds... [pid:%d]',
      worker.pid,
    );
    setTimeout(() => process.exit(1), 2000);
  });

  const mediaCodecs = config.mediasoup.router.mediaCodecs;
  mediasoupRouter = worker.createRouter({mediaCodecs});
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

  // 실시간 음성채팅방 입장
  socket.on('enter', (boardData, userData, done) => {
    UseAxios.post('/chats/enter', null, {
      params: {
        boardId: boardData.boardId,
        vote: boardData.userVote,
      },
    })
      .then((res) => {
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

        if (producer) {
          socket.emit('newProducer');
        }
      })
      .catch((err) => {
        console.log('enter failed');
        done();
      });
  });

  socket.on('send', (msg) => {
    const userVoteData = socket.userVoteData;
    const reg = new Date().toLocaleTimeString('ko-KR');
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

  socket.on('disconnecting', () => {
    if (socket.boardId) {
      userList.get(socket.boardId).delete(socket);
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

  socket.on('getRouterRtpCapabilities', (callback) => {
    callback(mediasoupRouter.rtpCapabilities);
  });
  socket.on('createProducerTransport', async (data, callback) => {
    try {
      const {transport, params} = await createWebRtcTransport();
      producerTransport = transport;
      callback(params);
    } catch (err) {
      console.error(err);
      callback({error: err.message});
    }
  });

  socket.on('createConsumerTransport', async (data, callback) => {
    try {
      const {transport, params} = await createWebRtcTransport();
      consumerTransport = transport;
      callback(params);
    } catch (err) {
      console.error(err);
      callback({error: err.message});
    }
  });

  socket.on('connectProducerTransport', async (data, callback) => {
    await producerTransport.connect({dtlsParameters: data.dtlsParameters});
    callback();
  });

  socket.on('connectConsumerTransport', async (data, callback) => {
    await consumerTransport.connect({dtlsParameters: data.dtlsParameters});
    callback();
  });

  socket.on('produce', async (data, callback) => {
    const {kind, rtpParameters} = data;
    producer = await producerTransport.produce({kind, rtpParameters});
    callback({id: producer.id});

    // inform clients about new producer
    socket.to(socket.boardId).emit('newProducer');
  });

  socket.on('consume', async (data, callback) => {
    callback(await createConsumer(producer, data.rtpCapabilities));
  });
});

async function createWebRtcTransport() {
  const {maxIncomingBitrate, initialAvailableOutgoingBitrate} =
    config.mediasoup.webRtcTransport;

  const transport = await mediasoupRouter.createWebRtcTransport({
    listenIps: config.mediasoup.webRtcTransport.listenIps,
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    initialAvailableOutgoingBitrate,
  });
  if (maxIncomingBitrate) {
    try {
      await transport.setMaxIncomingBitrate(maxIncomingBitrate);
    } catch (error) {}
  }
  return {
    transport,
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    },
  };
}
async function createConsumer(producer, rtpCapabilities) {
  if (
    !mediasoupRouter.canConsume({
      producerId: producer.id,
      rtpCapabilities,
    })
  ) {
    console.error('can not consume');
    return;
  }
  try {
    consumer = await consumerTransport.consume({
      producerId: producer.id,
      rtpCapabilities,
      paused: producer.kind === 'video',
    });
  } catch (error) {
    console.error('consume failed', error);
    return;
  }

  if (consumer.type === 'simulcast') {
    await consumer.setPreferredLayers({spatialLayer: 2, temporalLayer: 2});
  }

  return {
    producerId: producer.id,
    id: consumer.id,
    kind: consumer.kind,
    rtpParameters: consumer.rtpParameters,
    type: consumer.type,
    producerPaused: consumer.producerPaused,
  };
}
