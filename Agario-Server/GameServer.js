const players = [];
let gameloopId = null;
const serverFrameRate = 10.0;

const START_COUNT_DOWN_OP_CODE = 101;
const MOVE_PLAYER_OP_CODE = 102;

const SCENE_READY_OP_CODE = 200;

function startGame() {

}

function stopGame() {

}

let msg = {
    opCode : 0
}

const WebSocket = require("ws");
const wsServer = new WebSocket.Server({port:process.env.PORT || 3003}, () => {
    console.log("server started");
});

wsServer.on('connection', (ws) => {
    ws.send("Hello! I am a server");
    console.log("hello new client");

    ws.on('message', data => {
        if(data.sender != 0) {
            msg = JSON.parse(data.toString());

            switch(msg.opCode) {
                case SCENE_READY_OP_CODE:
                    startGame();
                    break;
                default:
                    console.log(`[Warning] Unrecognized opCode in msg`);
                    break;
            }
        }
    });
});

wsServer.on('listening', () => {
    console.log(`listening on ${process.env.PORT}`);
});