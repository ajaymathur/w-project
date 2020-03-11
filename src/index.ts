#!/usr/bin/env node

import meow from 'meow';
import Conf from 'conf';
import chalk from 'chalk';

import add from './commands/add';
import open from './commands/open';
import setConfig from './commands/set';
import * as KnownErrors from './functions/errors';
import { report_issue_url } from './functions/constants';

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

main().catch(err => {
  const knownErrorsArr: Array<string> = Object.keys(KnownErrors)
  const isErrorKnown = knownErrorsArr.some(knownErrorName => err instanceof KnownErrors[knownErrorName]);

  if (isErrorKnown) {
    console.log(err);
    return;
  }

  console.log(chalk`{red An unexpected error occured, please raise a issue at} {red.underline ${report_issue_url}} {red and copy the error stack below.}`)
  throw err;
});
