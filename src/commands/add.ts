import path from 'path';
import Conf from 'conf';

interface Add {
  conf: Conf
  workspacePath: string
}

export default async function add({
  conf,
  workspacePath
}: Add) {
  try {
    const resolvedWorkspacePath = path.resolve(workspacePath);
    const existingPaths: string[] = conf.get('workspaces') || [];
    const newPaths = [resolvedWorkspacePath, ...existingPaths];
    conf.set('workspaces', newPaths);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
