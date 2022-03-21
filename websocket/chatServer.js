const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port =  process.env.PORT || 8080;

const server = http.createServer(express);

const wsService = new WebSocket.Server({server});

let socketIdx = 1;

wsService.on("connection", socket => {
    socket.id = socketIdx++;
    console.log("소켓 연결");

    socket.on("close", () => {
        console.log("소켓 연결 해제");
    });

    socket.on("message", msg => {
        wsService.clients.forEach(soc => {
            if(soc.id == socket.id) return;
            soc.send(msg.toString());
        });      
    });
});

wsService.on("listening", () => {
    console.log(`server listening on port ${port}`);
});