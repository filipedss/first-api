const http = require('http');
const url = require('url');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true); //true transforma em objeto
  console.log(parsedUrl);
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);
  
  const route = routes.find((routeObj) => (
    routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  ));
  
  if(route) {
    route.handler(request, response);
  } else {
    response.writeHead(404, {'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
  
  
  // if(request.url === '/users' && request.method === 'GET') {
  //   UserController.listUsers(request, response);
  // }else{
  //   response.writeHead(404, {'Content-Type': 'text/html' });
  //   response.end(`Cannot ${request.method} ${request.url}`);
  // }
});

server .listen(3000, () => console.log('live'));
