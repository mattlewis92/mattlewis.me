require('core-js/es6/reflect');
require('core-js/es7/reflect');
require('zone.js/dist/zone-node');
const path = require('path');
const fs = require('fs');
const { renderModuleFactory } = require('@angular/platform-server');
const { AppServerModuleNgFactory } = require('../../dist/server/main.bundle');

const indexFilePath = path.join(__dirname, '..', '..', 'docs', 'index.html');
const indexFileContents = fs.readFileSync(indexFilePath).toString();

renderModuleFactory(AppServerModuleNgFactory, {
  document: indexFileContents,
  url: '/'
}).then(string => {
  fs.writeFileSync(indexFilePath, string);
});
