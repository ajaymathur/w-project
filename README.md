## w-project

> Choose project from select and open it in your favourite editor

![gif showing running the w-project command on terminal to get options of all the project available in local to get started with](./.github/w-project-demo.gif)

### Problem

This is for one who has to work on multiple project/ repositories.
Now switching from one repository requires us to cd into that directory and running `code` ( or similar editor commands ) to open the project in editor and start to work on it. Else, using mouse to navigate to the project folder and then opening it.

### Solution

What if running a single command showed we all the project I own and I get just choose the one I want to work and I get editor open for that project.

### Get Started

```sh
$ npm install -g w-project

# Add a workspace path to w-project
$ w-project add <path-to-workspace>

# Open a project
$ w-project

# View list of the config
$ w-project config list

# View list in interactive mode
$ w-project config list -i

# Set the editor to use to open the project
$ w-project config set editor code|vim|atom

# Setup the editor to use
$ w-project set editor <code|vim|atom>
```

### Commands

**add**: Add the projects in a new workspace to the registry of projects. Usage `w-project add .` to add current directory.

**config**: View or update the config. Usage `w-project config <sub-command> <value>`. Supported sub-commands are - `list` and `set`.

**open**: Show options of the project in the workspaces so that we can choose one open editor for that project. If no commands is passed ***open*** is executed.

**set**: Usage `w-project set <property> <value>` - Set a config for w-project. Currently supported properties are:

- editor: code|atom|vi|vim

Build with ❤️ and ⚖️.
