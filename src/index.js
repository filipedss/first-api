const http = require('http');
const { URL } = require('url');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://${request.headers.host}${request.url}`);
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  let id = null;
  //remove divide a partir das barras e remove posicao vazia
  const splitEndpoint = pathname.split('/').filter((routeItem) => Boolean(routeItem));

  if(splitEndpoint.length > 1){
    //define pathname se tiver mais que um parametro no endpoint
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find((routeObj) => (
    //busca no objeto de rotas route uma correspondencia para o endpoint e o metodo
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));
  
  //verifica se a rota é valida e encontrou uma correspondencia dentro do objeto
  if(route) {
    request.params = { id };
    request.query = Object.fromEntries(parsedUrl.searchParams);
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, {'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    } 
    route.handler(request, response);
  } else{
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
