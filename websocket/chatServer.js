const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const crypto = require('crypto');
const util = require('util');
const moment = require('moment');

const port =  process.env.PORT || 8080;
const server = http.createServer(express);
const wsService = new WebSocket.Server({server});

let userList = {};
let data = {
    chat : 1,
    text : "",
    id: "",
    target:"",
    date: moment().format("YYYY-MM-DD HH:mm:ss")
};

async function createUID(length) {
     try {
        const uid = await util.promisify(crypto.randomBytes)(length);
        return uid.toString("hex");
     } catch(e) {
         console.log(e);
     }
}

async function clientJoin(socket) {
    try {
        const uid = await createUID(2);        
        data.id = uid;
        data.chat = 4;
        data.text = `${uid} come in!`;
        data.date = moment().format("YYYY-MM-DD HH:mm:ss");

        userList[uid] = socket;

        for(let key in userList) {
            data.text = `${key} come in!`;
            if(key !== uid) socket.send(JSON.stringify(data));
        }

        for(let key in userList) {
            userList[key].send(JSON.stringify(data));
        }

        return uid;
    }catch(e) {
        console.log(e);
    }
}

wsService.on("connection",async (socket,req) => {
    console.log("소켓 연결");

    socket.uid = await clientJoin(socket);

    socket.on("close", () => {
        console.log("소켓 연결 해제");
    });

    const ip = socket._socket.remoteAddress || req.socket.remoteAddress;

    socket.on("message", msg => {
        msg = JSON.parse(msg);

        data.id = socket.uid;
        data.chat = msg.chat;
        data.text = msg.text;
        data.date = msg.date;

        if(msg.chat == 3) {
            if(userList[msg.target] !== undefined) {
                userList[msg.target].send(JSON.stringify(data));
            }
            return;
        }
        
        
        wsService.clients.forEach(soc => {
            if(soc.uid === socket.uid) return;
            soc.send(JSON.stringify(data));
        });      
    });
});

server.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
});

