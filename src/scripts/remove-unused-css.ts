import * as path from 'path';
import * as fs from 'fs';
import * as uncss from 'uncss';

const docsFolder = path.resolve(__dirname, '..', '..', 'docs');
const cssFileName = fs.readdirSync(docsFolder).filter(file => file.endsWith('.css'))[0];

uncss([path.resolve(docsFolder, 'index.html')], {ignore: [/.*has-error.*/]}, (error, output) => {
  fs.writeFileSync(path.resolve(docsFolder, cssFileName), output);
});