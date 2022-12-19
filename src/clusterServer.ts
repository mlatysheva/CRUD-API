import cluster from 'cluster';
import { cpus } from 'os';
import server from './server';
import startServer from './server';

const totalCPUs = cpus().length;

if (cluster.isPrimary) {
  let pidToPort = {};
  let worker, port: number;

  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < totalCPUs; i++) {
    port = 4001 + i;
    let worker = cluster.fork({ port: port });
    pidToPort[worker.process.pid] = port;
  }

  console.log(`pidToPort is ${pidToPort}`);

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    // console.log("Let's fork another worker");
    // cluster.fork();
  });
} else {
  server;
  const id = cluster.worker?.id;
  console.log(`Worker id: ${id}, process.pid: ${process.pid}`);
}
