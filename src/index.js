const http = require('http');
const users = require('./mocks/users');

const server = http.createServer((request, response) => {

    console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

    if(request.url === '/users' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type' : 'application/json'});
        response.end('<h1>Hello World1</h1>')
    }

    
});

server .listen(3000, () => console.log('live'));