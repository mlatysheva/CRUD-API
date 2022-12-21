import cluster from 'cluster';
import { cpus } from 'os';
import { UserModel } from './models/userModel';
import { UserSchema } from './models/userSchema';
import { server } from './server';

const totalCPUs = cpus().length;
const PORT = Number(process.env.PORT) || 4000;

const userModel = new UserModel();
process.on('message', (message: UserSchema[]) => {
  userModel.users = message;
});

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);
  // cpus().forEach(() => cluster.fork());
  for (let i = 0; i < totalCPUs; i++) {
    const worker = cluster.fork();

    worker.on('message', (message) => {
      console.log(`worker received message: ${message}`);

      for (let id in cluster.workers) {
        cluster.workers[id]?.send(message);
      }
    });
  }
} else {
  const worker = cluster.worker;
  if (worker) {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
  console.log(`Worker with pid ${process.pid} and id ${worker.id} started`);
}

// if (cluster.isPrimary) {
//   let pidToPort = {};
//   let worker, port: number;

//   console.log(`Number of CPUs is ${totalCPUs}`);
//   console.log(`Primary ${process.pid} is running`);

//   for (let i = 0; i < totalCPUs; i++) {
//     port = 4001 + i;
//     let worker = cluster.fork({ port: port });
//     pidToPort[worker.process.pid] = port;
//   }

//   console.log(`pidToPort is ${pidToPort}`);

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
// console.log("Let's fork another worker");
// cluster.fork();
//   });
// } else {
//   server;
//   const id = cluster.worker?.id;
//   console.log(`Worker id: ${id}, process.pid: ${process.pid}`);
// }
