import fs from 'fs';
import { promisify } from 'util';

import { PathNotExistsError } from './errors';
import { workspace_not_exits } from './messages';

const readDir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export async function readDirectory(dirPath) {
  try {
    return await readDir(dirPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } 
}

export async function isDirectory(dirPath: string) {
  try {
    return (await stat(dirPath)).isDirectory();
  } catch (err) {
    if ( err.code === 'ENOENT') {
      throw new PathNotExistsError(workspace_not_exits(dirPath));
    }
    throw err;
  }
}
