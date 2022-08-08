import http from "http"; 
import WebSocket from "ws";
// import SocketIO from "socket.io";
import express from "express";

const app = express();
 
app.get("/", (_, res) => { 
    console.log("app.get"); 
    // res.send({response: "Please"}).status(200);
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});
// const io = SocketIO(server);

const sockets = [];  

wss.on("connection", (socket) => {
    console.log("Connected to Browser");
});
// io.on("connection", (socket, userData) => {
//     console.log("server connection");
//     console.log(userData);

//     socket.on("send", (msg) => {
//         console.log("send msg: " + msg);
//         io.emit("message", msg);
//     })
// }); 

app.listen(3000, handleListen);