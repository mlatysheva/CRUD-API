import * as fs from 'fs/promises';
import { UserSchema } from '../models/userSchema';

export const readDataFromFile = async (
  filePath: string
): Promise<UserSchema[]> => {
  const rawdata = await fs.readFile(filePath, 'utf-8');
  if (!rawdata) {
    return [];
  } else {
    return JSON.parse(rawdata);
  }
};
