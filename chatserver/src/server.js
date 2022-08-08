import http from "http"; 
import SocketIO from "socket.io";
import express from "express";

const app = express();

const handleList = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const io = SocketIO(server);

io.on("connection", (socket) => {
    console.log("server connection");
});

app.listen(3000, handleList);