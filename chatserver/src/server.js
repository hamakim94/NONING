import useAxios from './UseAxios';
import UseAxios from './UseAxios';
import {logPlugin} from '@babel/preset-env/lib/debug';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(3000, () => {
  console.log('server listening on port : 3000');
});

let userList = new Map();

io.on('connection', (socket) => {
  console.log('connected');

  // 채팅 대기방 입장
  socket.on('wait', (boardId) => {
    socket.emit('wait', userList.get(boardId));
  });

  // 실시간 음성채팅방 입장
  socket.on('enter', (boardData, userData, done) => {
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
    UseAxios.post('/chats/enter', null, {
      params: {
        boardId: socket.boardId,
        vote: socket.userVoteData.userVote,
      },
    })
      .then((res) => {
        // io.sockets.clients(boardData.boardId);
        let userDataList = Array.from(
          userList.get(boardData.boardId),
          (socket) => socket.userVoteData,
        );

        socket.emit('user_enter', userDataList, userVoteData); // 본인한테만 전달
        socket
          .to(boardData.boardId)
          .emit('welcome', userVoteData, userDataList.length); // 본인 외 다른 참가자한테 전달
      })
      .catch((err) => {
        console.log('enter failed');
        done();
      });
  });

  socket.on('send', (msg) => {
    const userVoteData = socket.userVoteData;
    socket.to(socket.boardId).emit('send', userVoteData, msg);
  });
  // socket.on('betray', (boardId, userVoteData, opt1Cnt, opt2Cnt) => {
  socket.on('betray', (opt1Cnt, opt2Cnt) => {
    // 해당 user의 vote 변경
    const user = socket.userData;
    // const user = userList.get(boardId).find((user) => (user.userId = userVoteData.userId));
    console.log('before betray: ' + user);
    if (user['userVote'] == 1) user['userVote'] = 2;
    else if (user['userVote'] == 2) user['userVote'] = 1;
    console.log('after betray: ' + user);

    // 본인 포함 방 안의 모든 사람들에게 전달
    io.to(boardId).emit('betray', user, opt1Cnt, opt2Cnt);
  });

  // // 유저 입장
  // socket.on("join", (data) => {
  //   userList.push(data);
  //   console.log("join" + data);
  //   socket.name = data;
  //   // 유저 정보 갱신
  //   io.emit("updateUser", userList);
  //   // 유저 입장 알리기(입장은 발신자 제외)
  //   socket.broadcast.emit("joinUser", data);
  // });
  //
  // // 메시지 보내기
  // socket.on("msg", (data) => {
  //   console.log("message: " + data);
  //   io.emit("sm", {
  //     name: socket.name,
  //     msg: data,
  //   }); // 발신자를 포함해서 모두 보내는것
  //   // socket.broadcast.emit("sm", data); //발신자 제외
  // });

  socket.on('disconnecting', () => {
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
  });
});
