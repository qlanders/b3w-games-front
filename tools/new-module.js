/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const changeCase = require('change-case');
const colors = require('colors');

// Settings
const TEMPLATES_DIR = path.join(process.cwd(), 'tools/templates');
const MODULES_DIR = path.join(process.cwd(), 'src/components');


// Utils
function showError(title, err) {
  const errTitle = colors.red(`[${title.toUpperCase()}]`);
  return console.error(`${errTitle}:\n ${err}`);
}

function showMessage(title, message) {
  const messageTitle = colors.green(`[${title.toUpperCase()}]`);
  return console.log(`${messageTitle}: ${message}`);
}

function createFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    showMessage('File created', filePath);
  } catch (err) {
    showError('File not created', err);
  }
}


// Read arguments

const blockName = changeCase.pascalCase(process.argv[2]);

if (blockName) {
  const dirPath = path.join(MODULES_DIR, blockName);

  mkdirp(dirPath)
    .then(() => {
      showMessage('CREATE FOLDER', dirPath);

      const templateFilePath = path.join(
          TEMPLATES_DIR,
          'template.txt',
      );
      const templateFileStats = fs.statSync(templateFilePath);

      if (templateFileStats.isFile()) {
        const template = fs.readFileSync(templateFilePath, 'utf8') || '';

        const targetFilePath = path.join(
          MODULES_DIR,
          blockName,
          `${blockName}.tsx`,
        );

        const targetContent = template.replace(
          /#{blockname.dashCase}/g,
          changeCase.pascalCase(blockName),
        );

        if (fs.existsSync(targetFilePath)) {
          showError('File not created', `${targetFilePath} (уже существует)`);
        } else {
          createFile(targetFilePath, targetContent);
        }
      }
    })
    .catch((err) => showError('CANCELED', err));
} else {
  showError('Canceled', 'block name not set');
}
