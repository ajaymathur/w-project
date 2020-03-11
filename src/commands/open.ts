import 'array-flat-polyfill';
import Conf from 'conf';
import path from 'path';
import chalk from 'chalk';
import { promisify } from 'util';
import { prompt } from 'enquirer';
import { exec } from 'child_process';
import * as fs from '../functions/fs';

const execPromise = promisify(exec);

interface Open {
  conf: Conf
}

async function getWorkspacesAsChoice(workspaces) {
  const formatChoiceMessage = (projectName: string, projectPath: string) => chalk`{bold.green ${projectName}} ➡ ${projectPath}`;
  const formatAsChoice = (projectName: string, projectPath: string) => ({ value: projectPath, message: formatChoiceMessage(projectName, projectPath) });

  return await Promise.all([...workspaces.map(async workspacePath => {
    const projects: string[] = await fs.readDirectory(workspacePath);
    return [
      { message: `${workspacePath.split(path.sep).pop()}:`, role: 'separator' },
      ...projects.map(projectName => formatAsChoice(projectName, path.resolve(projectName, workspacePath))
      )
    ];
  })]);
}

export default async function open({
  conf
}: Open) {
  // Get the preferred editor
  const editor = conf.get('editor') || 'code';
  // Get all the workspaces
  const workspaces = conf.get('workspaces');
  // Format workspaces a choice structure
  const workspacesAsChoice = (await getWorkspacesAsChoice(workspaces)).flat();

  const selectedOption: { projectToOpen: string } = await prompt({
    type: 'autocomplete',
    name: 'projectToOpen',
    // @ts-ignore enquirer is missing the limit in its args type
    limit: 10,
    footer() {
      return chalk.gray`(Use arrow keys to scroll through the workspaces)`;
    },
    message: `Pick the project to open in ${editor}`,
    choices: [...workspacesAsChoice]
  });

  await execPromise(`${editor} ${selectedOption.projectToOpen}`)
}
