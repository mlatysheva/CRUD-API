import { IncomingMessage } from 'http';
import { UserSchema } from '../models/userSchema';

export const getRequestData = (
  request: IncomingMessage
): Promise<UserSchema> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      request.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      request.on('end', () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};
