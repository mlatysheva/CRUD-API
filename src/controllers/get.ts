import { IncomingMessage, ServerResponse } from 'http';
import { getUserById, getUsers } from './userController';

export const get = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>
) => {
  if (request.url === '/api/users' || request.url === '/api/users/') {
    getUsers(request, response);
  } else if (request.url?.match(/\/api\/users\/[a-zA-Z0-9]{1,}/)) {
    const id = request.url.split('/')[3];
    getUserById(request, response, id);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Page not found');
  }
};
