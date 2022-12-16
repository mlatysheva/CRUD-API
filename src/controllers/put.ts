import { IncomingMessage, ServerResponse } from 'http';
import { updateUser } from './userController';

export const put = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>
) => {
  if (request.url?.match(/\/api\/users\/[a-zA-Z0-9]{1,}/)) {
    const id = request.url.split('/')[3];
    updateUser(request, response, id);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Page not found');
  }
};
