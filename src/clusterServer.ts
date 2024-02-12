import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { server } from './server';
import { IUser } from './models/IUser';
import UsersDB from './database/UsersDB';

const totalCPUs = cpus().length;

const PORT = Number(process.env.PORT) || 4000;

let currentPort = PORT;

if (cluster.isPrimary) {
  const pidToPort = {};
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < totalCPUs; i++) {
    currentPort = PORT + i;
    const worker = cluster.fork({ port: currentPort });
    pidToPort[worker.process.pid] = currentPort;
    console.log(`Worker ${worker.id} is on port ${pidToPort[worker.process.pid]}`);

    worker.on('message', (message) => {
      for (const id in cluster.workers) {
        cluster.workers[id]?.send(message);
      }
    });
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Let's launch another worker`);
    cluster.fork();
  });
} else {
  const worker = cluster.worker;
  if (worker) {
    server.addListener('request', (req, _) => {
      console.log(`Worker: ${worker.id}, process: ${process.pid}, method: ${req.method}, url: ${req.url}`);
    });
    process.on('message', (message: IUser[]) => {
      UsersDB.users = message;
    }); 
    server.listen(currentPort, () => {
      console.log(`Server is running on port ${currentPort}`);
    });
  }
  console.log(`Worker with pid ${process.pid} and id ${worker?.id} launched`);
}
