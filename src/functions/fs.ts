import fs from 'fs';
import { promisify } from 'util';

const readDir = promisify(fs.readdir);

export async function readDirectory(dirPath) {
  try {
    return await readDir(dirPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } 
}
