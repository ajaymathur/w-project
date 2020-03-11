import path from 'path';
import Conf from 'conf';
import { isDirectory } from '../functions/fs';
import { PathNotDirectory } from '../functions/errors';
import { workspace_not_a_directory } from '../functions/messages';

interface Add {
  conf: Conf
  workspacePath: string
}

export default async function add({
  conf,
  workspacePath
}: Add) {
  const resolvedWorkspacePath = path.resolve(workspacePath);
  const isPathForDirectory = await isDirectory(resolvedWorkspacePath);

  if (!isPathForDirectory) throw new PathNotDirectory(workspace_not_a_directory(resolvedWorkspacePath));

  const existingPaths: string[] = conf.get('workspaces') || [];
  const newPaths = [resolvedWorkspacePath, ...existingPaths];
  conf.set('workspaces', newPaths);
}
