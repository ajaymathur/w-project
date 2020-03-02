import inquirer from 'inquirer';
import { exec } from 'child_process';
import {promisify} from 'util';
const execPromise = promisify(exec);

const Project_Folders = [
  '/Users/amathur/workspace/open-source',
  'workspace/atlassian-teams/forge'
]

async function main() {
  const {  }
  const answer = await inquirer
  .prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'Which project do you want to open?',
      choices: [
        '/Users/amathur/workspace/open-source',
      ]
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
