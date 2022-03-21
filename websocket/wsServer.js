const WebSocket = require('ws');

const wsService = new WebSocket.Server({port:process.env.PORT || 8080}, () => {
    console.log("웹 소켓이 8080에서 구동중")
});

wsService.on("connection", socket => {
    socket.id = socketIdx++;
    console.log("소켓 연결");

    socket.on("close", () => {
        console.log("소켓 연결 해제");
    });

    socket.on("message", msg => {
        const data = JSON.parse(msg);
        console.log(data);
        socket.send(JSON.stringify({data}));
    });
});

wsService.on("listening", () => {
    console.log("server listening on port asdf");
});