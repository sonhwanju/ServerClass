const http = require('http');
let count = 0;

const server = http.createServer((req,res) => {
    console.log("Hit");
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    count++;
    res.end(`you are visiter : ${count}`)
});

server.listen(8080, () => {

});