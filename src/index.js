const http = require('http');

const server = http.createServer((request, response) => {
    
    console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

    response.writeHead(200, { 'Content-Type' : 'text/html'});
    response.end('<h1>Hello World1</h1>')
});

server .listen(3000, () => console.log('live'));