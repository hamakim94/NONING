import UseAxios from './UseAxios.js';
import express from 'express';
// import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
// import path from "path";
import https from 'https';
// const fs = require('fs');
// const path = require('path');
// const HTTPS = require('https');

const app = express();
var domain = 'i7a202.p.ssafy.io';
// const sslport = process.env.PORT || 443; 
var io;

try {
  const option = {
    // ca: fs.readFileSync('/etc/letsencrypt/live/' + domain + '/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/' + domain + '/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/' + domain + '/cert.pem'),
  };

  const httpsServer = https.createServer(option, app);

  io = new Server(httpsServer);
  httpsServer.listen(3000, () => {
      console.log("[HTTPS] server started (server listening on port : 3000)");
  });
} catch (error){
  console.log("[HTTPS] server failed");
  console.log(error);
}

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
    let userDataList = userList.get(boardId) == undefined ? null : Array.from(
      userList.get(boardId),
      (socket) => socket.userVoteData,
    );
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
        socket
          .to(boardData.boardId)
          .emit('welcome', userVoteData); // 본인 외 다른 참가자한테 전달
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
});
