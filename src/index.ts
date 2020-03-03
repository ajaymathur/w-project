#!/usr/bin/env node

import meow from 'meow';
import Conf from 'conf';

import add from './commands/add';
import open from './commands/open';

async function main() {
  const { input, flags } = meow(`
    Usage:
    
      $ w-project [command]

    Commands:

    add       Add a workspace to the config
    open      Show options of the projects

    Example:

    Add a new workspace:
    $ w-project add <pathToTheWorkspace>

    Choose a project to work on:
    $ w-project open
  `);

  const conf = new Conf({
    projectName: 'w-project'
  });

  const command = input[0] || '';

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

main();
