import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone-node';

import * as path from 'path';
import * as fs from 'fs';
import { renderModuleFactory } from '@angular/platform-server';
import { AppServerModuleNgFactory } from './ngfactory/src/server.module.ngfactory';

const indexFilePath: string = path.join(__dirname, '..', 'docs', 'index.html');
const indexFileContents: string = fs.readFileSync(indexFilePath).toString();

renderModuleFactory(AppServerModuleNgFactory, {
  document: indexFileContents,
  url: '/'
}).then(string => {
  fs.writeFileSync(indexFilePath, string);
});