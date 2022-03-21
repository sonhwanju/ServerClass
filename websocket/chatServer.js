const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port =  process.env.PORT || 8080;
const server = http.createServer(express);
const wsService = new WebSocket.Server({server});

let socketIdx = 1;

wsService.on("connection", (socket,req) => {
    console.log("소켓 연결");
    socket.id = socketIdx++;

    socket.on("close", () => {
        console.log("소켓 연결 해제");
    });

    const ip = socket._socket.remoteAddress || req.socket.remoteAddress;

    socket.on("message", msg => {
        wsService.clients.forEach(soc => {
            if(soc.id == socket.id) return;
            soc.send(ip + " : " + msg.toString());
        });      
    });
});

server.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
});

