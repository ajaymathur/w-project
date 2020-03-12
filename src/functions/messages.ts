export const workspace_not_a_directory = (workspacePath: string): string => `Given workspace is not a directory. Workspace path given ${workspacePath}`;
export const workspace_not_exits = (workspacePath: string): string => `Given workspace does not exists. Workspace path given ${workspacePath}`;
export const unknown_editor = (editor: string, supportedEditors: string) => `${editor} is not supported. Supported editors are ${supportedEditors}`
export const unknown_property = (property: string) => `${property} config is not supported.`;
