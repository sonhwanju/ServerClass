const http = require('http');

const server = http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write('<h1>Node.js로 만든 서버</h1>')
    res.end('<p>공부중!</p>');
}).listen(8080, () => {
    console.log('8080포트에서 서버 열림');
}); 

server.on('listening', () => {
    console.log('8080 포트에서 리스닝');
});

server.on('error',() => {
    console.log(error);
});