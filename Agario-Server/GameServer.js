const gameloop = require('./GameLoop.js');
const Vector = require('./Modules/Vector.js');
const Player = require('./Entity/Player.js');
const Food = require('./Entity/Food.js');

const players = [];
let sockets = {};
let gameloopId = null;
const serverFrameRate = 10.0;
let lastPlayerId = 1;

const START_COUNT_DOWN_OP_CODE = 101;
const MOVE_PLAYER_OP_CODE = 102;

const SCENE_READY_OP_CODE = 200;
const PING_CHECK_OP_CODE = 205;

function startGame() {
    gameloopId = gameloop.setGameLoop(() => 
    {
        for(let player in players) {
            console.log("gameloop");
        }
    },1000 / serverFrameRate);
}

function stopGame() {
    if(gameloopId != null) {
        gameloop.clearGameLoop(gameloopId);
        gameloopId = null;
    }
}

function getNewPlayerId() {
    return lastPlayerId++;
}

function getRandomPosition() {
    return new Vector(Math.floor(Math.random() * 1920 + 1),
     Math.floor(Math.random() * 1080 + 1));
}

function getRandomColor() {
    let colorRGB = [255,10,Math.random() * 256];

    colorRGB.sort(() => {
        return 0.5-Math.random();
    })

    return {
      r:colorRGB[0],
      g:colorRGB[1],
      b:colorRGB[2]  
    };
}

function spawnPlayer(ws) {
    let ownerId = getNewPlayerId();
    let pos = getRandomPosition();
    let c = getRandomColor();
    let cell = new Player(ownerId,pos,c.r,c.g,c.b);

    players.push(cell);
    ws.send(JSON.stringify(cell));
}

const foodToAdd = 30;
const foods = [];

function addFood() {
    while(foodToAdd--) {
        let pos = getRandomPosition();
        let c = getRandomColor();
    
        let food = new Food(1,pos,c.r,c.g,c.b);
        foods.push(food);
    }
}

function removeFood() {

}


function pingCheck(ws) {
    msg.socketId = ws.clientId;
    msg.opCode = PING_CHECK_OP_CODE;
    ws.send(JSON.stringify(msg));
}

let msg = {
    socketId : -1,
    opCode : 0,
}

const WebSocket = require("ws");
const Food = require('./Entity/Food.js');
const wsServer = new WebSocket.Server({port:process.env.PORT || 3003}, () => {
    console.log("server started");
    startGame();
});

wsServer.on('connection', (ws) => {
    //ws.send("Hello! I am a server");
    console.log("hello new client");
    //players.push(1);

    ws.clientId = msg.socketId = getNewPlayerId();
    msg.opCode = START_COUNT_DOWN_OP_CODE;

    sockets[ws.clientId] = ws;  

    ws.on('message', data => {
        if(data.sender != 0) {
            msg = JSON.parse(data.toString());
            switch(msg.opCode) {
                case SCENE_READY_OP_CODE:
                    spawnPlayer(ws);
                    break;
                case PING_CHECK_OP_CODE:
                    pingCheck(ws);
                    break;
                default:
                    console.log(`[Warning] Unrecognized opCode in msg`);
                    break;
            }
        }
    });

    ws.on('close', () => {
        console.log("connection close");
        stopGame();
    });
});

wsServer.on('listening', () => {
    console.log(`listening on ${process.env.PORT}`);
});