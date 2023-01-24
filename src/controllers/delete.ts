import { IncomingMessage, ServerResponse } from 'http';
import { deleteUser } from './userController';

export const remove = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>
) => {
  if (request.url?.match(/\/api\/users\/[a-zA-Z0-9]{1,}/)) {
    const id = request.url.split('/')[3];
    deleteUser(response, id);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Page not found');
  }
};
