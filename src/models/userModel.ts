import { UserSchema } from './userSchema';
import { v4 as uuidv4 } from 'uuid';

let users: UserSchema[] = [];

export const findAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(users);
    } catch (error: any) {
      reject(new Error(error));
    }
  });
};

export const findUserById = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = users.find((user: UserSchema) => user.id === id);
      resolve(user);
    } catch (error: any) {
      reject(new Error(error));
    }
  });
};

export const create = (user: {
  username: string;
  age: number;
  hobbies: string[];
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newUser = { id: uuidv4(), ...user };
      users.push(newUser);
      resolve(newUser);
    } catch (error: any) {
      reject(new Error(error));
    }
  });
};

export const update = (
  id: string,
  user: { username: string; age: number; hobbies: string[] }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const index = users.map((person) => person.id).indexOf(id);
      users[index] = { id, ...user };
      resolve(users[index]);
    } catch (error: any) {
      reject(new Error(error));
    }
  });
};

export const remove = (id: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      users = users.filter((user) => user.id !== id);
      resolve();
    } catch (error: any) {
      reject(new Error(error));
    }
  });
};
