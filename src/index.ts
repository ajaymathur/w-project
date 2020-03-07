#!/usr/bin/env node

import meow from 'meow';
import Conf from 'conf';

import add from './commands/add';
import open from './commands/open';
import setConfig from './commands/set';

async function main() {
  const { input } = meow(`
    Usage:
    
      $ w-project [command]

    Commands:

    add       Add a workspace to the config
    open      Show options of the projects
    set       Set config for the tool

    Example:

    Add a new workspace:
    $ w-project add <pathToTheWorkspace>

    Choose a project to work on:
    $ w-project open

    Change editor for the tool:
    $ w-project set editor code
  `);

  const conf = new Conf({
    projectName: 'w-project'
  });

  const [command = 'open', ...args] = input;

  switch(command) {
    case 'add':
      await add({
        conf,
        workspacePath: input[1],
      })
      break;
    case 'open':
      await open({
        conf
      });
      break;
    case 'set':
      const [property, value] = args;
      await setConfig({
        conf,
        property,
        value
      });
      break;
    default:
      console.error(`Unsupported command ${command}`);
  }
}

main();
