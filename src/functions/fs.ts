import fs from 'fs';
import { promisify } from 'util';
import mkdirp from 'mkdirp';
import path from 'path';

const appendFile = promisify(fs.appendFile);
const readDir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);

export async function readDirectory(dirPath) {
  try {
    return await readDir(dirPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } 
}

export async function makeDirectory(dirPath) {
  try {
    return await mkdirp(dirPath);    
  } catch (err) {
    console.error(err);
    process.exit(1);
    
  }
}

export async function createAndWriteFile(dirPath: string, fileName: string, fileContent: string) {
  try {
    const filePath = path.join(dirPath, fileName);
    return await writeFile(filePath, fileContent)
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export async function appendToFile(dirPath: string, fileName: string, newContent: string) {
  try {
    const filePath = path.join(dirPath, fileName);
    await appendFile(filePath, newContent);
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
}
