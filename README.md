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

# Setup the editor to use
$ w-project set editor <code|vim|atom>
```

Build with ❤️ and ⚖️.
