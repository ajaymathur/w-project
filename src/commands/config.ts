import Conf from 'conf';
import path from 'path';
const { prompt } = require('enquirer');

import setConfig from './set';
import { UnsupportedConfigError } from '../functions/errors';
import { unknown_property } from '../functions/messages';

interface ConfigCommandArgs {
  args: Array<string>;
  conf: Conf;
  flags?: {
    [key: string]: unknown
  };
}

function listConfig(conf) {
  console.log('Editor:');
  console.log(conf.get('editor'));
  console.log('Workspaces:');
  conf.get('workspaces').map(workspace => console.log(workspace));
}

async function listInteractiveConfig(conf) {
  const workspaces = conf.get('workspaces');
  const formatedOptions = workspaces.map(workspacePath => ({
    name: `${workspacePath.split(path.sep).pop()} ➡ ${workspacePath}`,
    value: workspacePath
  }))
  const selectedOption = await prompt({
    type: 'multiselect',
    name: 'workspaces',
    message: 'Please select the workspaces to remove',
    choices: [...formatedOptions],
    result(names) {
      const selectedOptions = this.map(names);
      return Object.values(selectedOptions);
    }
  });

  const workspacesToRemove: Array<string> = selectedOption.workspaces;

  const newWorkspaces = workspaces.filter(workspace => workspacesToRemove.indexOf(workspace) === -1);

  conf.set('workspaces', newWorkspaces)
}

export default async function config({
  args,
  conf,
  flags,
}: ConfigCommandArgs) {
  const [subcommand, ...restArgs] = args;
  switch (subcommand) {
    case 'list':
      if (flags && flags.i) {
        await listInteractiveConfig(conf)
      } else {
        listConfig(conf);
      }
      break;
    case 'set':
      const [property, value] = restArgs;
      await setConfig({
        conf,
        property,
        value
      });
      break;
    default:
      throw new UnsupportedConfigError(unknown_property(subcommand));
  }
}
