#! /usr/bin/env node
import http from 'node:http';
import { get } from './controllers/get';
import { post } from './controllers/post';
import { put } from './controllers/put';
import { remove } from './controllers/delete';

export const server = http.createServer((request, response) => {
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
      remove(request, response);
      break;

    default:
      response.statusCode = 404;
      response.write('Reponse failed');
      response.writeHead(404, { 
        'Content-Type': 'text/plain' 
      });
      response.end('Page not found');
  }
});
