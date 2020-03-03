#!/usr/bin/env node

import inquirer from 'inquirer';
import { exec } from 'child_process';
import * as fs from 'fs';
import {promisify} from 'util';
const readDir = promisify(fs.readdir);
const execPromise = promisify(exec);
import Conf from 'conf';
import add from './commands/add';
import open from './commands/open';

import meow from 'meow';

async function main() {
  const { input, flags } = meow(`
    Usage:
      $ w-project [command] [options]
  `);

  const conf = new Conf();

  const command = input[0] || '';
  console.log(input)

  switch(command) {
    case 'add':
      await add({
        conf,
        workspacePath: input[1],
      })
      break;
    case '':
    case 'open':
      await open({
        conf
      });
      break;
    default:
      console.error(`Unsupported command ${command}`);

  }
}



















const Project_Folders = [
  '/Users/amathur/workspace/open-source',
  '/Users/amathur/workspace/atlassian-teams/forge'
]

/**
 * Get all the file in the folder
 * Show a list
 * code the selected project
 */

async function main1() {
  try {

  } catch (err) {

  }
  //const {  }
  const answer = await inquirer
  .prompt([
    {
      type: 'list',
      name: 'project',
      message: 'Which project do you want to open?',
      choices: [
        '/Users/amathur/workspace/open-source1',
        '/Users/amathur/workspace/open-source2',
        '/Users/amathur/workspace/open-source3',
        '/Users/amathur/workspace/open-source4',
        '/Users/amathur/workspace/open-source5'
      ],
      filter() {
        return ['/Users/amathur/workspace/open-source4']
      }
    }
  ])
  
  await exec(`code ${answer.theme}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

main().then(() => { })
