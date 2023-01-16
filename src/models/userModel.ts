import { UserSchema } from './userSchema';
import { v4 as uuidv4 } from 'uuid';

class UserModel {
  public users: UserSchema[];

  constructor() {
    this.users = [];
  }

  findAllUsers = () => {
    return new Promise((resolve, reject) => {
      try {
        const users = this.users;
        process.send?.(users); 
        resolve(this.users);
      } catch (error) {
        reject(new Error(error));
      }
    });
  };

  findUserById = (id: string) => {
    return new Promise((resolve, reject) => {
      try {
        const user = this.users.find((user: UserSchema) => user.id === id);
        const users = this.users;
        process.send?.(users);
        resolve(user);
      } catch (error) {
        reject(new Error(error));
      }
    });
  };

  create = (user: { username: string; age: number; hobbies: string[] }) => {
    return new Promise((resolve, reject) => {
      try {
        const newUser = { id: uuidv4(), ...user };
        this.users.push(newUser);
        const users = this.users;
        process.send?.(users);
        resolve(newUser);
      } catch (error) {
        reject(new Error(error));
      }
    });
  };

  update = (
    id: string,
    user: { username: string; age: number; hobbies: string[] }
  ) => {
    return new Promise((resolve, reject) => {
      try {
        const index = this.users.map((person) => person.id).indexOf(id);
        this.users[index] = { id, ...user };
        const users = this.users;
        process.send?.(users);
        resolve(this.users[index]);
      } catch (error) {
        reject(new Error(error));
      }
    });
  };

  remove = (id: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        this.users = this.users.filter((user) => user.id !== id);
        const users = this.users;
        process.send?.(users);
        resolve();
      } catch (error) {
        reject(new Error(error));
      }
    });
  };
}

export default new UserModel();
