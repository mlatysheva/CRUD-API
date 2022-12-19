#! /usr/bin/env node
import http from 'http';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';
import { get } from './controllers/get';
import { post } from './controllers/post';
import { put } from './controllers/put';
import { remove } from './controllers/delete';
import cluster from 'cluster';
import { cpus } from 'os';

dotenv.config({
  path: resolve(cwd(), '.env'),
});

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
      remove(request, response);
      break;

    default:
      response.statusCode = 404;
      response.write('Reponse failed');
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Page not found');
  }
});

const PORT = Number(process.env.PORT) || 4000;

if (process.env.NODE_ENV !== 'cluster') {
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
} else if (cluster.isPrimary) {
  // cpus().forEach(() => cluster.fork());
  for (let i = 0; i < cpus().length; i++) {
    let port = 4001 + i;
    cluster.fork({ port });
  }

  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
    console.log(`port is ${process.env.PORT}`);
  });

  cluster.on('exit', function (worker, code, signal) {
    console.log(
      'Worker ' +
        worker.process.pid +
        ' died with code: ' +
        code +
        ', and signal: ' +
        signal
    );
    console.log('Starting a new worker');
    cluster.fork();
  });

  // console.log(`Primary ${process.pid} is running`);
  // cluster.on('exit', (worker) => {
  //   console.log(`worker ${worker.process.pid} died`);
  // });
} else {
  console.log(`Worker ${process.pid} started`);
  server.listen(PORT);
}

export default server;
// # sourceMappingURL=server.js.map
