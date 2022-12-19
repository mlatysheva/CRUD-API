import { UserSchema } from './userSchema';
import { v4 as uuidv4 } from 'uuid';

export class UserModel {
  public users: UserSchema[];

  constructor() {
    this.users = [];
  }

  findAllUsers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(this.users);
      } catch (error: any) {
        reject(new Error(error));
      }
    });
  };

  findUserById = (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = this.users.find((user: UserSchema) => user.id === id);
        resolve(user);
      } catch (error: any) {
        reject(new Error(error));
      }
    });
  };

  create = (user: { username: string; age: number; hobbies: string[] }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = { id: uuidv4(), ...user };
        this.users.push(newUser);
        resolve(newUser);
      } catch (error: any) {
        reject(new Error(error));
      }
    });
  };

  update = (
    id: string,
    user: { username: string; age: number; hobbies: string[] }
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const index = this.users.map((person) => person.id).indexOf(id);
        this.users[index] = { id, ...user };
        resolve(this.users[index]);
      } catch (error: any) {
        reject(new Error(error));
      }
    });
  };

  remove = (id: string) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.users = this.users.filter((user) => user.id !== id);
        resolve();
      } catch (error: any) {
        reject(new Error(error));
      }
    });
  };
}
