import { IncomingMessage, ServerResponse } from 'http';
import { createUser } from './userController';

export const post = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>
) => {
  if (request.url === '/api/users' || request.url === '/api/users/') {
    createUser(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Page not found');
  }
};
