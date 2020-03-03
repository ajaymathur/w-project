#!/usr/bin/env node

import meow from 'meow';
import Conf from 'conf';

import add from './commands/add';
import open from './commands/open';

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

main();
