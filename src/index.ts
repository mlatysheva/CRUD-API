import { server } from './server';
import 'dotenv/config';

const PORT = Number(process.env.PORT) || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
