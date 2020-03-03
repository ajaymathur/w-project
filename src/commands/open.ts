import Conf from 'conf';
import { prompt } from 'enquirer';
import path from 'path';
import * as fs from '../functions/fs';

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
    return projects.map(project => `${project} - ${path.resolve(workspacePath, project)}`)
  })])).flat();

  console.log({workspaceStruct});

  // const prompt = new Input({
  //   name: 'username',
  //   message: 'What is your username?'
  // });
  
  // prompt.run()
  //   .then(answer => console.log('Username:', answer))
  //   .catch(console.error);

  const t = await prompt({
    type: 'autocomplete',
    name: 'projectToOpen',
    limit: 10,
    message: 'Pick the project you are going to work on:',
    choices: [...workspaceStruct]
  });

//  const t = await prompt.run();
  console.log({ t });
}
