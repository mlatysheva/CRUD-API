import { server } from './server';

const PORT = Number(process.env.PORT) || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
