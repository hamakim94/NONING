const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// app.use("/css", express.static("./css"));
// app.use("/js", express.static("./js"));
//
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

http.listen(3000, () => { 
  console.log("server listening on port : 3000");
});

let userList = [];

io.on("connection", (socket) => {
  console.log("연결됐어요");

  socket.on("enter", (boardId, userData) => {
    socket.join(boardId); // 방 들어감 
    userList.push(userData); // back에서 가지고 있을 userList (나중에 새로 들어온 사용자한테 보여줘야함)
    socket.to(boardId).emit("welcome", userData.nickname);
    // io.emit("welcome", userData.nickname); 
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

  socket.on("disconnect", () => {
    // const i = userList.indexOf(socket.name);
    // userList.splice(i, 1);
    socket.broadcast.emit("left", socket.name);
    // socket.broadcast.emit("updateUser", userList);
  });
});
