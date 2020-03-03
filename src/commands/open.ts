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

export default async function open({
  conf
}: Open) {
  try {
    const workspaces = conf.get('workspaces');
    const workspaceStruct: string[] = (await Promise.all([...workspaces.map(async workspacePath => {
      const projects: string[] = await fs.readDirectory(workspacePath);
      return [
        { message: `${workspacePath.split(path.sep).pop()}:`, role: 'separator' },
        ...projects.map(project => ({ value: path.resolve(workspacePath, project), message: chalk`{bold.green ${project}} ➡ ${path.resolve(workspacePath, project)}` }))

      ];
    })])).flat();

    const selectedOption: { projectToOpen: string } = await prompt({
      type: 'autocomplete',
      name: 'projectToOpen',
      // @ts-ignore enquirer is missing the limit in its args type
      limit: 10,
      footer() {
        return chalk.gray`(Use arrow keys to scroll through the workspaces)`;
      },
      message: 'Pick the project you are going to work on:',
      choices: [...workspaceStruct]
    });

    await execPromise(`code ${selectedOption.projectToOpen}`)
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
