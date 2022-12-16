/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs/promises';

export const writeDataToFile = async (filePath: string, content: any) => {
  await fs.writeFile(filePath, JSON.stringify(content, null, 2));
};
