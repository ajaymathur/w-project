import Conf from 'conf';
import { prompt } from 'enquirer';
import path from 'path';
import * as fs from '../functions/fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

interface Open {
  conf: Conf
}

export default async function open({
  conf
}: Open) {
  const workspaces = conf.get('workspaces');
  console.log({ workspaces })
  const workspaceStruct: string[] = (await Promise.all([...workspaces.map(async workspacePath => {
    const projects: string[] = await fs.readDirectory(workspacePath);
    return projects.map(project => `${project}: ${path.resolve(workspacePath, project)}`)
  })])).flat();

  console.log({workspaceStruct});

  // const prompt = new Input({
  //   name: 'username',
  //   message: 'What is your username?'
  // });
  
  // prompt.run()
  //   .then(answer => console.log('Username:', answer))
  //   .catch(console.error);

  const t: { projectToOpen: string } = await prompt({
    type: 'autocomplete',
    name: 'projectToOpen',
    message: 'Pick the project you are going to work on:',
    choices: [...workspaceStruct]
  });

  console.log(t.projectToOpen.split('-')[1].trim())

  await execPromise(`code ${t.projectToOpen.split(':')[1].trim()}`)
}
