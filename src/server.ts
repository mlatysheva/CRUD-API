#! /usr/bin/env node
import http from 'http';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';
import { get } from './controllers/get';
import { post } from './controllers/post';
import { put } from './controllers/put';
import { deleteR } from './controllers/delete';

dotenv.config({
  path: resolve(cwd(), '.env'),
});

const PORT = process.env.PORT || 4000;

const server = http.createServer((request, response) => {
  switch (request.method) {
    case 'GET':
      get(request, response);
      break;

    case 'POST':
      post(request, response);
      break;

    case 'PUT':
      put(request, response);
      break;

    case 'DELETE':
      deleteR(request, response);
      break;

    default:
      response.statusCode = 404;
      response.write('Reponse failed');
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Page not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default server;
// # sourceMappingURL=server.js.map
