import { UserSchema } from './userSchema';
import { v4 as uuidv4 } from 'uuid';
import { writeDataToFile } from '../utils/writeDataToFile';
import { readDataFromFile } from '../utils/readDataFromFile';
import path from 'path';
import { cwd } from 'process';

const dataFile = path.join(cwd(), 'src', 'db', 'users.json');

export const findAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await readDataFromFile(dataFile);
      resolve(users);
    } catch (error: any) {
      reject(new Error(error));
    }
  });
};

export const findUserById = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await readDataFromFile(dataFile);
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
      const users = await readDataFromFile(dataFile);
      users.push(newUser);
      await writeDataToFile(dataFile, users);
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
      const users = await readDataFromFile(dataFile);
      const index = users.map((person) => person.id).indexOf(id);
      users[index] = { id, ...user };
      await writeDataToFile(dataFile, users);
      resolve(users[index]);
    } catch (error: any) {
      reject(new Error(error));
    }
  });
};

export const remove = (id: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const users = await readDataFromFile(dataFile);
      const updatedUsers = users.filter((user) => user.id !== id);
      await writeDataToFile(dataFile, updatedUsers);
      resolve();
    } catch (error: any) {
      reject(new Error(error));
    }
  });
};
