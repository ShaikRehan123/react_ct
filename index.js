#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import fs from "fs";

const createReactComponent = (name) => {
  // create folder inside ./src/components
  fs.mkdirSync(`./src/components/${name}`);
  // create index.js file inside ./src/components/name
  fs.writeFileSync(
    `./src/components/${name}/index.jsx`,
    `import React from 'react';
  import './${name}.css';
    
  const ${name} = () => {
      return (
          <div>
              <h1>This is ${name} component</h1>
          </div>
      );
  }
  export default ${name};`
  );
  // create ${name}.css file inside ./src/components/name
  fs.writeFileSync(`./src/components/${name}/${name}.css`, ``);
};

const createPage = (name) => {
  // create folder inside ./src/pages
  fs.mkdirSync(`./src/pages/${name}`);
  // create index.js file inside ./src/pages/name
  fs.writeFileSync(
    `./src/pages/${name}/index.js`,
    `import React from 'react';
    import './${name}.css';
        
    const ${name} = () => {
        return (
            <div>
                <h1>This is ${name} component</h1>
            </div>
        );
    }
    export default ${name};`
  );
  // create ${name}.css file inside ./src/pages/name
  fs.writeFileSync(`./src/pages/${name}/${name}.css`, ``);
  // Update App.js file to add route to existing routes
  fs.appendFileSync(
    `./src/App.js`,
    `
            import ${name} from './pages/${name}';
            `
  );
  // Add Route component to add Route to last of routes
};

const sleep = (ms = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function whatDoYouWantToDo() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Welcome to React Component Creator CLI"
  );
  await sleep();
  rainbowTitle.stop();
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        {
          name: "Create a new component",
          value: "createComponent",
        },
        {
          name: "Create a new page",
          value: "createPage",
        },
        {
          name: "Exit",
          value: "exit",
        },
      ],
    },
  ]);
  if (answers.action === "createComponent") {
    askForFileName();
  } else if (answers.action === "createPage") {
    askForRouteName();
  } else {
    console.log(chalk.red("Bye!"));
    process.exit();
  }
}

async function askForFileName() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "fileName",
      message: "What is the name of your component?",
      validate: (value) => {
        if (value.length) {
          return true;
        }
        return "Please enter a name";
      },
    },
  ]);
  const fileName = answers.fileName;
  createReactComponent(fileName);
  console.log(chalk.green(`Component ${fileName} created successfully!`));
}

async function askForRouteName() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "routeName",
      message: "What is the name of your page?",
      validate: (value) => {
        if (value.length) {
          return true;
        }
        return "Please enter a name";
      },
    },
  ]);
  const routeName = answers.routeName;
  createPage(routeName);
  console.log(chalk.green(`Page ${routeName} created successfully!`));
}

whatDoYouWantToDo();
